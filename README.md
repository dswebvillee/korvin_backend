# Korvin Project Setup

This guide will help you set up and run  project locally on your machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (includes npm, Node.js package manager)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/dswebvillee/korvin_backend.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```
3. **Create and Copy the env.sample in .env file:**


4. **Start the development server:**

    ```bash
    npm start
    ```

## Project Structure
  This structure separates different concerns in your project:

    #   config: Configuration files for database connection or other settings.

    #   controllers: Logic for handling different HTTP requests and responses.We have basically two     controllers.For users we have UserController and for product management we have ProductController.
        
    #   middleware: Custom middleware functions, such as authentication.

    #   models: Database models, representing different entities in your application.Currently  I am not using the Models in this application, as I have planned to use sequelize for my application.But due to some issues with version and time boundation i have currently used mysql package for db.

    #   routes: Route definitions for different API endpoints.
       
    #   .env: Environment variables file for sensitive data and configuration.

    #   .env.sample: It has sample configuration of .env file variables

    #   .gitignore: Specifies intentionally untracked files to ignore in version control.

    #    package.json: Metadata about the project, including dependencies and scripts.
     
    #    server.js: Entry point for the Node.js application, where the server is initialized and started.

## Sql Database

    #    The database sql file is also provided in the root of the project directory named korvin.sql.Import this file into your database.

## Postman Collection
    #    The postman collections are also provided in the root of the project directory(Korvin.postman_collection).

## Logging errors
    # winston package used for logging errors bases on timestamp
    error logging file (error.log on root directory)

## Swagger url
    In swagger only login api implemented for testing purposes all api collections are available in postman collection file
    http://localhost:3000/api-docs
