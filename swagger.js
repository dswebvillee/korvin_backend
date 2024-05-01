// swagger.js

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Korvin Project',
            version: '1.0.0',
            description: 'This is korvin rest api documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Change this to your server URL
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the files containing OpenAPI annotations
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    // Serve Swagger documentation
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
