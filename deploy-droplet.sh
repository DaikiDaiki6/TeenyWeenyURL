#!/bin/bash
# TeenyWeenyURL - DigitalOcean Droplet Deployment Script
# Based on successful deployment experience

set -e  # Exit on any error

echo "🚀 Starting TeenyWeenyURL deployment to DigitalOcean Droplet..."

# Configuration - UPDATE THESE VALUES
GITHUB_USERNAME="DaikiDaiki6"  # Change this to your GitHub username
DROPLET_IP="YOUR-DROPLET-IP"   # Change this to your droplet IP
DB_PASSWORD="TeenyWeeny2024SecurePass"
JWT_SECRET="TeenyWeeny2024-SuperSecretJWTKey-MakeItVeryLongAndSecure-ForProduction"

echo "📝 Configuration:"
echo "   GitHub: https://github.com/$GITHUB_USERNAME/TeenyWeenyURL"
echo "   Domain: http://$DROPLET_IP"
echo ""

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install .NET 8
echo "🔧 Installing .NET 8 SDK..."
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb
apt update
apt install -y dotnet-sdk-8.0

# Install Node.js 18
echo "🔧 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PostgreSQL
echo "🗄️ Installing PostgreSQL..."
apt install -y postgresql postgresql-contrib

# Install Nginx
echo "🌐 Installing Nginx..."
apt install -y nginx

# Install Git and other tools
apt install -y git

# Create swap space (important for 512MB droplets)
echo "💾 Creating swap space..."
if [ ! -f /swapfile ]; then
    fallocate -l 1G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# Setup PostgreSQL
echo "🗄️ Setting up PostgreSQL database..."
systemctl start postgresql
systemctl enable postgresql
sudo -u postgres psql -c "CREATE DATABASE teenyweenyurl;" 2>/dev/null || echo "Database already exists"
sudo -u postgres psql -c "CREATE USER teenyweenyuser WITH ENCRYPTED PASSWORD '$DB_PASSWORD';" 2>/dev/null || echo "User already exists"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE teenyweenyurl TO teenyweenyuser;"
sudo -u postgres psql -c "ALTER USER teenyweenyuser CREATEDB;"

# Clone repository
echo "📥 Cloning repository..."
cd /var/www
if [ -d "TeenyWeenyURL" ]; then
    cd TeenyWeenyURL
    git pull
else
    git clone https://github.com/$GITHUB_USERNAME/TeenyWeenyURL.git
    cd TeenyWeenyURL
fi
chown -R root:root /var/www/TeenyWeenyURL

# Build React frontend
echo "🔨 Building React frontend..."
cd TeenyWeenyFrontend

# Update frontend URLs to use droplet IP instead of localhost
echo "🔧 Updating frontend URLs..."
sed -i "s|http://localhost:5140|http://$DROPLET_IP|g" src/Components/LayoutComponents/*.jsx

npm install
npm run build

# Copy to backend wwwroot
cd ..
mkdir -p TeenyWeenyURL/wwwroot
cp -r TeenyWeenyFrontend/dist/* TeenyWeenyURL/wwwroot/

# Build .NET application
echo "🔨 Building .NET application..."
cd TeenyWeenyURL
dotnet publish -c Release -o /var/www/teenyweenyurl-app

# Create production configuration
echo "⚙️ Creating production configuration..."
tee /var/www/teenyweenyurl-app/appsettings.json > /dev/null <<EOF
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=teenyweenyurl;Username=teenyweenyuser;Password=$DB_PASSWORD"
  },
  "JwtSettings": {
    "Issuer": "TeenyWeenyURL",
    "Audience": "TeenyWeenyFrontend",
    "SecretKey": "$JWT_SECRET",
    "ExpiryMinutes": 60
  },
  "AllowedHosts": "*"
}
EOF

# Install EF Core tools and run migrations
echo "🗄️ Running database migrations..."
export PATH="$PATH:/root/.dotnet/tools"
dotnet tool install --global dotnet-ef --version 8.* 2>/dev/null || echo "EF tools already installed"
dotnet ef database update --connection "Host=localhost;Port=5432;Database=teenyweenyurl;Username=teenyweenyuser;Password=$DB_PASSWORD"

# Create systemd service
echo "⚙️ Creating systemd service..."
tee /etc/systemd/system/teenyweenyurl.service > /dev/null <<EOF
[Unit]
Description=TeenyWeenyURL ASP.NET Core App
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/dotnet /var/www/teenyweenyurl-app/TeenyWeenyURL.dll
Restart=always
RestartSec=10
User=root
WorkingDirectory=/var/www/teenyweenyurl-app
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://0.0.0.0:5000

[Install]
WantedBy=multi-user.target
EOF

# Configure Nginx
echo "🌐 Configuring Nginx..."
tee /etc/nginx/sites-available/teenyweenyurl > /dev/null <<EOF
server {
    listen 80;
    server_name $DROPLET_IP;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable Nginx site
ln -sf /etc/nginx/sites-available/teenyweenyurl /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Start and enable services
echo "🚀 Starting services..."
systemctl daemon-reload
systemctl enable teenyweenyurl
systemctl start teenyweenyurl
systemctl restart nginx
systemctl enable nginx

# Setup firewall
echo "🔒 Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your TeenyWeenyURL app is available at: http://$DROPLET_IP"
echo "📊 Check status with: systemctl status teenyweenyurl"
echo "📝 View logs with: journalctl -u teenyweenyurl -f"
echo ""
echo "🎉 Enjoy your deployed TeenyWeenyURL application!"
