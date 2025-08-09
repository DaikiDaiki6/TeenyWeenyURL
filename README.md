# 🔗 TeenyWeenyURL

A modern, full-stack URL shortening service built with ASP.NET Core and React. Create, manage, and track your shortened URLs with a beautiful, responsive interface.

## ✨ Features

### Core Functionality

- 🔗 **URL Shortening** - Convert long URLs into short, memorable links
- 📊 **Click Tracking** - Monitor how many times your links are accessed
- 📝 **Custom Notes** - Add optional notes to remember what each URL is for
- 🔍 **Search URLs** - Quickly find your shortened URLs
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

### User Management

- 🔐 **User Authentication** - Secure JWT-based authentication
- 👤 **User Profiles** - Manage your account and view all your URLs
- ✏️ **Profile Editing** - Update username and password
- 🗂️ **Personal Dashboard** - View and manage all your shortened URLs

### Technical Features

- 🚀 **Fast Performance** - Optimized for speed and efficiency
- 🛡️ **Secure** - BCrypt password hashing and JWT tokens
- 📄 **Pagination** - Handle large numbers of URLs efficiently
- 🎨 **Modern UI** - Beautiful interface built with Tailwind CSS
- 📖 **API Documentation** - Complete Swagger/OpenAPI documentation

## 🏗️ Architecture

### Backend (.NET 8)

- **Framework**: ASP.NET Core Web API
- **Database**: PostgreSQL with Entity Framework Core
- **Authentication**: JWT Bearer tokens
- **Password Security**: BCrypt hashing
- **Logging**: Serilog with file and console output
- **Documentation**: Swagger/OpenAPI

### Frontend (React)

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Routing**: TanStack Router
- **State Management**: TanStack Query
- **HTTP Client**: Axios with interceptors
- **Build Tool**: Vite

## 📁 Project Structure

```
TeenyWeenyURL/
├── TeenyWeenyURL/              # Backend (.NET API)
│   ├── Controller/             # API Controllers
│   │   ├── AuthController.cs   # Authentication endpoints
│   │   ├── ShortUrlsController.cs # URL management
│   │   ├── UserController.cs   # User management
│   │   └── RedirectController.cs # URL redirection
│   ├── Data/                   # Database context
│   ├── Model/                  # Data models and DTOs
│   │   ├── Entity/            # Database entities
│   │   ├── DTO/               # Data transfer objects
│   │   └── JwtConfiguration/   # JWT settings
│   ├── Services/              # Business logic services
│   ├── Migrations/            # EF Core migrations
│   └── Program.cs             # Application entry point
├── TeenyWeenyFrontend/        # Frontend (React)
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Auth/          # Authentication components
│   │   │   ├── LayoutComponents/ # Main app pages
│   │   │   ├── MainComponents/   # Shared components
│   │   │   ├── Api/           # API service layer
│   │   │   ├── Hooks/         # Custom React hooks
│   │   │   └── Router/        # Route configuration
│   │   └── main.jsx           # Application entry point
│   ├── public/                # Static assets
│   └── package.json           # Dependencies and scripts
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL 12+](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/TeenyWeenyURL.git
cd TeenyWeenyURL
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd TeenyWeenyURL
dotnet restore
```

#### Configure Database

1. Create a PostgreSQL database named `TeenyWeenyURL`
2. Update the connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=TeenyWeenyURL;Username=your_username;Password=your_password"
  }
}
```

#### Run Database Migrations

```bash
dotnet ef database update
```

#### Start the Backend

```bash
dotnet run
```

The API will be available at `http://localhost:5140`

- Swagger documentation: `http://localhost:5140/swagger`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd TeenyWeenyFrontend
npm install
```

#### Start the Frontend

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔧 Configuration

### Backend Configuration

#### Environment Variables

Create `appsettings.Development.json` for local development:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=TeenyWeenyURL;Username=postgres;Password=your_password"
  },
  "JwtSettings": {
    "Issuer": "TeenyWeenyURL",
    "Audience": "TeenyWeenyFrontend",
    "SecretKey": "your-super-secret-key-here-make-it-long-and-secure",
    "ExpiryMinutes": 60
  }
}
```

#### Key Settings

- **JWT Secret**: Change the `JwtSettings.SecretKey` for production
- **Database**: Update connection string for your PostgreSQL instance
- **CORS**: Configure allowed origins in `Program.cs`

### Frontend Configuration

#### Environment Variables

Create `.env.local` for local development:

```bash
VITE_API_URL=http://localhost:5140
VITE_APP_URL=http://localhost:5173
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/Auth/register` - Register new user
- `POST /api/Auth/login` - User login
- `GET /api/Auth/check` - Verify authentication

### URL Management Endpoints

- `POST /api/ShortUrls/create-twurl` - Create shortened URL
- `GET /api/ShortUrls/all-urls` - Get user's URLs (paginated)
- `GET /api/ShortUrls/{id}` - Get specific URL details
- `PATCH /api/ShortUrls/{id}` - Update URL note
- `DELETE /api/ShortUrls/{id}` - Delete URL

### User Management Endpoints

- `PATCH /api/User/profile` - Update user profile
- `DELETE /api/User/profile` - Delete user account

### Redirection

- `GET /{shortCode}` - Redirect to original URL

## 🛠️ Development

### Backend Development

#### Run with Hot Reload

```bash
dotnet watch run
```

#### Create New Migration

```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

#### Run Tests

```bash
dotnet test
```

### Frontend Development

#### Development Server

```bash
npm run dev
```

#### Build for Production

```bash
npm run build
```

#### Preview Production Build

```bash
npm run preview
```

## 🚀 Deployment

### Option 1: DigitalOcean Droplet (Recommended - $4-6/month)

**Complete deployment to a DigitalOcean Droplet with integrated frontend + backend:**

#### Prerequisites

- DigitalOcean Droplet (Ubuntu 22.04 LTS, minimum 512MB RAM)
- Your GitHub repository

#### Deployment Steps

1. **Create and connect to your Droplet:**

   ```bash
   ssh root@your-droplet-ip
   ```

2. **Run the automated deployment script:**

   ```bash
   # Create deployment script
   wget https://raw.githubusercontent.com/your-username/TeenyWeenyURL/main/deploy-droplet.sh
   chmod +x deploy-droplet.sh

   # Edit the script to update your GitHub username
   nano deploy-droplet.sh

   # Run deployment
   ./deploy-droplet.sh
   ```

3. **Update frontend URLs for your domain:**

   ```bash
   # Replace localhost with your domain in frontend components
   cd /var/www/TeenyWeenyURL/TeenyWeenyFrontend/src/Components/LayoutComponents
   sed -i 's|http://localhost:5140|http://YOUR-DROPLET-IP|g' *.jsx

   # Rebuild and deploy
   cd /var/www/TeenyWeenyURL/TeenyWeenyFrontend
   npm run build
   cp -r dist/* /var/www/teenyweenyurl-app/wwwroot/

   # Restart application
   systemctl restart teenyweenyurl
   ```

4. **Your app will be available at:** `http://your-droplet-ip`

#### What the Deployment Includes

- ✅ **Integrated deployment** - Frontend served by .NET backend
- ✅ **PostgreSQL database** - Fully configured with migrations
- ✅ **Nginx reverse proxy** - Professional web server setup
- ✅ **Systemd service** - Auto-restart and background running
- ✅ **Firewall configuration** - Secure server setup
- ✅ **Swap memory** - Handles build processes on small droplets

#### Cost: ~$4-6/month (much cheaper than App Platform)

### Option 2: DigitalOcean App Platform (~$20/month)

For a more managed solution with auto-scaling:

1. Create `app.yaml` in root directory (see file in repository)
2. Connect your GitHub repository to DigitalOcean App Platform
3. Configure environment variables
4. Deploy

### Option 3: Railway

1. Connect GitHub repository to Railway
2. Add PostgreSQL database service
3. Configure environment variables
4. Deploy both frontend and backend services

#### Backend (Linux Server)

```bash
# Publish the application
dotnet publish -c Release -o ./publish

# Copy to server and run
sudo systemctl enable teenyweenyurl
sudo systemctl start teenyweenyurl
```

#### Frontend (Static Hosting)

```bash
# Build for production
npm run build

# Deploy dist/ folder to static hosting service
# (Vercel, Netlify, AWS S3, etc.)
```

## 🧪 Testing

### Backend Tests

```bash
cd TeenyWeenyURL
dotnet test
```

### Frontend Tests

```bash
cd TeenyWeenyFrontend
npm test
```

## 📈 Performance Optimization

### Backend

- Entity Framework query optimization
- Response caching for static data
- Database indexing on frequently queried fields
- Pagination for large datasets

### Frontend

- Code splitting with React.lazy()
- Image optimization
- Bundle size optimization with Vite
- Caching strategies with TanStack Query

## 🔒 Security Features

- **Password Hashing**: BCrypt with salt
- **JWT Authentication**: Secure token-based auth
- **CORS Configuration**: Restricted origins
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Entity Framework parameterized queries
- **XSS Protection**: React's built-in XSS protection

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify connection string in appsettings.json
# Ensure database exists and user has permissions
```

#### CORS Issues

```bash
# Check CORS policy in Program.cs
# Verify frontend URL is in allowed origins
```

#### JWT Token Issues

```bash
# Check JWT secret key configuration
# Verify token expiry settings
# Clear browser localStorage if needed
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow C# coding conventions for backend
- Use ESLint and Prettier for frontend code formatting
- Write unit tests for new features
- Update documentation for API changes
- Ensure responsive design for UI changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - _Initial work_ - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Built with [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/)
- Frontend powered by [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database management with [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)

## 📞 Support

If you have any questions or need help with deployment, please open an issue on GitHub or contact [your-email@example.com](mailto:your-email@example.com).

---

⭐ **Star this repository if you found it helpful!**
