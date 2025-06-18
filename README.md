# Angular + Tailwind Playground

This is a simple Angular + Tailwind SPA developed for learning purposes.

## 🚀 Getting Started:

1. Clone the git repository:

   ```bash
   git clone https://github.com/rsca7213/angular-playground

   ```

2. Navigate to the project directory:

   ```bash
   cd angular-playground
   ```

3. Open the project in your favorite IDE (e.g., VS Code, WebStorm).

4. Ensure you have the required dependencies installed:
   - Node.js (v22 or later, LTS recommended)
   - NPM (Should be installed with Node.js)
   - Angular CLI (v20 or later)
5. Install the project dependencies:
   ```bash
    npm install
   ```
6. Start the development server:

   ```bash
   npm run start
   ```

7. The application should now be running at `http://localhost:4200/`. Open this URL in your web browser to view the app.

## 🛫 Features:

- CRUD operations for managing an example list of Products
- Responsive and modern design using Tailwind CSS
- Login/Auth functionality using Angular Guards
- HTTP Interceptors for handling API requests and responses
- Structural Directives for dynamic content rendering based on auth (isAuthenticated and hasRoles)
- Re-usable common components like: Tables, Buttons, Forms, Dialogs, Alerts, Toasts and more
- Environment configurations for different stages (development, production, staging, testing)
- Angular Proxy configuration for API calls on development server
- Angular Routing for navigation, including lazy loading of modules, guard protection and 404 page
- Custom Angular Attribute Directives and Angular Pipes for data transformation

## 🛜 Additional Repositories:

- **Back-End**: [Spring Boot Playground](https://github.com/rsca7213/spring-boot-playground)
  - Developed with Java 21, Spring Boot 3.4 and PostgreSQL 17

## 🧪 Running Tests:

To run the tests for this project, use the following command:

```bash
npm run test
```

## 📦 Building the Project:

To build the project for production, run:

```bash
npm run build:production
```

This will create a `dist/` directory with the production build of your application.

## 🌎 Environment Variables:

To configure variables for the different application environments (like development, production, etc.), you can
modify the following files:

- `src/environments/environment.ts` for development
- `src/environments/environment.production.ts` for production
- `src/environments/environment.staging.ts` for staging
- `src/environments/environment.test.ts` for testing

> Note: This project uses Angular's built-in environment system to manage different configurations for various environments.

## ✅ Linting and Formatting:

To ensure code quality and consistency, this project uses ESLint and Prettier.

You can run the following command to verify the code quality:

```bash
npm run lint
```

## 📦 Project Dependencies:

- **Language**: TypeScript (v5.8 or later)
- **Runtime**: Node.js (v22 or later, LTS recommended)
- **Package Manager**: NPM (should be installed with Node.js)
- **CLI**: Angular CLI v20
- **Main Framework**: Angular v20
- **Styling**: Tailwind CSS v4.1
- **Linting**: ESLint
- **Formatting**: Prettier
- **Additional Libraries**:
  - Ng Icons (Tailwind Heroicons)
  - PostCSS
