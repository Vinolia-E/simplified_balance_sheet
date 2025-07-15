# Simplified Balance Sheet

A practical Laravel + React + Inertia.js application for managing personal or business balance sheets. This project demonstrates modern full-stack development with real-time balance calculations and user authentication.

## Project Overview

This application allows users to:
- Create and manage personal balance sheets
- Add Assets and Liabilities with real-time calculations
- View Net Worth (Assets - Liabilities) instantly
- Edit and delete entries
- Generate printable balance sheet summaries
- User-specific data isolation with authentication

## Tech Stack

- **Backend**: Laravel 11.x
- **Frontend**: React 18+ with Inertia.js
- **Database**: SQLite
- **Authentication**: Laravel Breeze with Inertia
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Features

### Core Functionality
- **User Authentication**: Registration, login, and logout
- **Asset Management**: Add, edit, delete asset entries
- **Liability Management**: Add, edit, delete liability entries
- **Real-time Calculations**: Live balance sheet updates
- **Printable Reports**: Clean, formatted balance sheet summaries
- **Data Isolation**: User-specific entries and calculations

### Balance Sheet Display
- Total Assets calculation
- Total Liabilities calculation
- Net Worth calculation (Assets - Liabilities)
- Currency formatting (KES)
- Clean, professional layout

## Installation and Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- NPM or Yarn
- Git

### Step 1: Install PHP and Composer (if not already installed)

If you don't have PHP installed, run the following commands:

```bash
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
source $HOME/.bashrc
```

Verify PHP installation:
```bash
php --version
composer --version
```

### Step 2: Clone the Project

```bash
git clone https://github.com/Vinolia-E/simplified_balance_sheet.git
cd simplified_balance_sheet/balance-sheet-app
```

### Step 3: Install Dependencies

Install PHP dependencies:
```bash
composer install
```

Install Node.js dependencies:
```bash
npm install
```

### Step 4: Environment Configuration

Copy the environment file and generate application key:
```bash
cp .env.example .env
php artisan key:generate
```

Edit the `.env` file to configure your database (SQLite is default):
```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

### Step 5: Database Setup

Create the SQLite database file:
```bash
touch database/database.sqlite
```

Run database migrations:
```bash
php artisan migrate
```

Optional - Seed the database with sample data:
```bash
php artisan db:seed
```

### Step 6: Install Laravel Breeze for Authentication

```bash
composer require laravel/breeze --dev
php artisan breeze:install react
```

### Step 7: Build Frontend Assets

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
```

### Step 8: Start the Development Server

In your first terminal, start the Laravel development server:
```bash
php artisan serve
```

In a second terminal, start the Vite development server (if using npm run dev):
```bash
npm run dev
```

### Step 9: Access the Application

Open your browser and visit:
```
http://localhost:8000
```

You should see the login/registration page. Create an account to start using the balance sheet application.

## Running the Project

### Development Mode

1. Start the Laravel server:
```bash
php artisan serve
```

2. Start the Vite development server (in a separate terminal):
```bash
npm run dev
```

3. Access the application at `http://localhost:8000`

### Production Mode

1. Build the assets:
```bash
npm run build
```

2. Start the server:
```bash
php artisan serve
```

3. Access the application at `http://localhost:8000`

## Common Commands

### Clear Application Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### Reset Database
```bash
php artisan migrate:fresh
php artisan migrate:fresh --seed
```

### View Routes
```bash
php artisan route:list
```

### Run Tests
```bash
php artisan test
```

## Troubleshooting

### Common Issues

1. **Port 8000 already in use**
   ```bash
   php artisan serve --port=8001
   ```

2. **Permission errors with SQLite**
   ```bash
   chmod 664 database/database.sqlite
   chmod 775 database/
   ```

3. **Node modules issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

4. **Composer issues**
   ```bash
   composer clear-cache
   composer install
   ```

### Error Logs
- Laravel logs: `storage/logs/laravel.log`
- Check browser console for frontend errors
- Use `php artisan tinker` for debugging

## Database Schema

### Users Table
```sql
- id (Primary Key)
- name
- email (Unique)
- password
- timestamps
```

### Assets Table
```sql
- id (Primary Key)
- user_id (Foreign Key)
- name
- amount (Decimal)
- timestamps
```

### Liabilities Table
```sql
- id (Primary Key)
- user_id (Foreign Key)
- name
- amount (Decimal)
- timestamps
```

## Project Structure

```
├── app/
│   ├── Http/Controllers/
│   │   ├── AssetController.php
│   │   ├── LiabilityController.php
│   │   └── BalanceSheetController.php
│   ├── Models/
│   │   ├── Asset.php
│   │   ├── Liability.php
│   │   └── User.php
│   └── Policies/
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── js/
│   │   ├── Components/
│   │   ├── Pages/
│   │   └── Layouts/
│   └── views/
├── routes/
│   └── web.php
└── tests/
```

## API Endpoints

### Authentication
- `GET /register` - Registration page
- `POST /register` - User registration
- `GET /login` - Login page
- `POST /login` - User login
- `POST /logout` - User logout

### Balance Sheet
- `GET /dashboard` - Main balance sheet view
- `GET /balance-sheet/print` - Printable balance sheet

### Assets
- `GET /assets` - List user assets
- `POST /assets` - Create new asset
- `GET /assets/{id}/edit` - Edit asset form
- `PUT /assets/{id}` - Update asset
- `DELETE /assets/{id}` - Delete asset

### Liabilities
- `GET /liabilities` - List user liabilities
- `POST /liabilities` - Create new liability
- `GET /liabilities/{id}/edit` - Edit liability form
- `PUT /liabilities/{id}` - Update liability
- `DELETE /liabilities/{id}` - Delete liability

## UI Components

### Key React Components
- **BalanceSheet**: Main dashboard component
- **AssetForm**: Add/edit asset entries
- **LiabilityForm**: Add/edit liability entries
- **BalanceSummary**: Real-time calculations display
- **PrintableReport**: Formatted balance sheet for printing

### Styling Guidelines
- Clean, professional appearance
- Responsive design
- Clear typography and spacing
- Intuitive form layouts
- Real-time feedback for user actions

## Usage Examples

### Adding an Asset
```javascript
// Example asset entry
{
  name: "Bank Account",
  amount: 120000.00
}
```

### Adding a Liability
```javascript
// Example liability entry
{
  name: "Business Loan",
  amount: 75000.00
}
```

### Balance Sheet Output
```
Assets:
- Bank Account: 120,000 KES
- Inventory: 80,000 KES
Total Assets: 200,000 KES

Liabilities:
- Business Loan: 75,000 KES
- Accounts Payable: 25,000 KES
Total Liabilities: 100,000 KES

Net Worth: 100,000 KES
```

## Testing

### Running Tests
```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature

# Run with coverage
php artisan test --coverage
```

### Test Coverage
- User authentication flows
- Asset CRUD operations
- Liability CRUD operations
- Balance calculations
- Data isolation between users

## Performance Considerations

- **Database Indexing**: Foreign keys and user-specific queries
- **Eager Loading**: Prevent N+1 queries for user relationships
- **Caching**: Consider Redis for frequently accessed calculations
- **Asset Optimization**: Minified CSS/JS for production

## Security Features

- **Authentication**: Laravel Breeze with session management
- **Authorization**: Policy-based access control
- **CSRF Protection**: Built-in Laravel CSRF tokens
- **Input Validation**: Form requests with validation rules
- **SQL Injection Prevention**: Eloquent ORM protection

## Deployment

### Production Setup
1. **Environment Configuration**
```bash
cp .env.example .env.production
# Configure production database and app settings
```

2. **Optimize for Production**
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm run build
```

3. **Database Migration**
```bash
php artisan migrate --force
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow PSR-12 coding standards
- Use meaningful variable and function names
- Write comprehensive tests for new features
- Document complex business logic

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the [Laravel Documentation](https://laravel.com/docs)
- Review [Inertia.js Documentation](https://inertiajs.com/)
- Consult [React Documentation](https://reactjs.org/docs)

## Version History

- **v1.0.0**: Initial release with core balance sheet functionality
- **v1.1.0**: Added print functionality and improved UI
- **v1.2.0**: Enhanced validation and error handling

## Future Enhancements

- **Multi-currency support**
- **Category-based asset/liability grouping**
- **Historical balance tracking**
- **Export to PDF/Excel**
- **Mobile app development**
- **Advanced reporting and analytics**

---

*Built with Laravel, React, and Inertia.js*