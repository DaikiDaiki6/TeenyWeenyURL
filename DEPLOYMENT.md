# 🚀 TeenyWeenyURL Deployment Guide

## Quick Deployment to DigitalOcean Droplet

### Prerequisites

- DigitalOcean Droplet (Ubuntu 22.04 LTS, minimum 512MB RAM)
- Your GitHub repository forked/cloned

### 1-Command Deployment

```bash
# Connect to your droplet
ssh root@your-droplet-ip

# Download and run deployment script
curl -sSL https://raw.githubusercontent.com/DaikiDaiki6/TeenyWeenyURL/main/deploy-droplet.sh | bash
```

### Manual Deployment Steps

If you prefer to deploy manually:

#### 1. Update Configuration

```bash
# Edit deployment script with your details
nano deploy-droplet.sh

# Update these values:
GITHUB_USERNAME="your-username"
DROPLET_IP="your-droplet-ip"
```

#### 2. Run Deployment

```bash
chmod +x deploy-droplet.sh
./deploy-droplet.sh
```

#### 3. Access Your App

Visit `http://your-droplet-ip` in your browser!

## Troubleshooting

### Common Issues

#### 1. Images Not Loading

```bash
# Check if wwwroot files exist
ls -la /var/www/teenyweenyurl-app/wwwroot/

# If missing, copy them:
cp -r /var/www/TeenyWeenyURL/TeenyWeenyFrontend/dist/* /var/www/teenyweenyurl-app/wwwroot/
```

#### 2. 405 Method Not Allowed

```bash
# Check if redirect controller route constraint is correct
grep -n "shortcode:" /var/www/TeenyWeenyURL/TeenyWeenyURL/Controller/RedirectController.cs

# Should show: [HttpGet("{shortcode:length(6,8)}")]
```

#### 3. Database Connection Issues

```bash
# Check PostgreSQL status
systemctl status postgresql

# Test database connection
sudo -u postgres psql -d teenyweenyurl -U teenyweenyuser
```

#### 4. Service Won't Start

```bash
# Check application logs
journalctl -u teenyweenyurl -f

# Check configuration files
cat /var/www/teenyweenyurl-app/appsettings.json
```

#### 5. Frontend Shows Localhost URLs

```bash
# Update frontend components and rebuild
cd /var/www/TeenyWeenyURL/TeenyWeenyFrontend/src/Components/LayoutComponents
sed -i 's|http://localhost:5140|http://YOUR-DROPLET-IP|g' *.jsx

# Rebuild and deploy
cd /var/www/TeenyWeenyURL/TeenyWeenyFrontend
npm run build
cp -r dist/* /var/www/teenyweenyurl-app/wwwroot/

# Restart application
systemctl restart teenyweenyurl
```

## Management Commands

```bash
# Check application status
systemctl status teenyweenyurl

# View real-time logs
journalctl -u teenyweenyurl -f

# Restart application
systemctl restart teenyweenyurl

# Check Nginx status
systemctl status nginx

# Restart Nginx
systemctl restart nginx
```

## Updating Your App

```bash
# Pull latest changes
cd /var/www/TeenyWeenyURL
git pull

# Rebuild frontend
cd TeenyWeenyFrontend
npm run build

# Copy to backend
cd ..
cp -r TeenyWeenyFrontend/dist/* /var/www/teenyweenyurl-app/wwwroot/

# Rebuild backend
cd TeenyWeenyURL
dotnet publish -c Release -o /var/www/teenyweenyurl-app

# Restart service
systemctl restart teenyweenyurl
```

## Cost Optimization

- **Basic Droplet**: $4-6/month (512MB-1GB RAM)
- **Managed Database**: Add $15/month if you want managed PostgreSQL
- **Domain**: $12/year for a custom domain
- **SSL Certificate**: Free with Let's Encrypt

## Security Recommendations

```bash
# Enable firewall
ufw enable
ufw allow OpenSSH
ufw allow 'Nginx Full'

# Set up SSL with Let's Encrypt (if you have a domain)
apt install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com

# Regular updates
apt update && apt upgrade -y
```
