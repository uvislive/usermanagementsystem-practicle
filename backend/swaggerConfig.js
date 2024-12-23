const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Practicle Api',
            version: '1.0.0',
            description: 'A simple API to manage users in the system',
        },
        servers: [
            {
                url: 'http://localhost:9001/api', // Adjust base URL as needed
            },
        ],
    },
    apis: ['./routes/roleRoutes.js','./routes/userRoutes.js'], // Path to your route files where Swagger annotations are written
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
