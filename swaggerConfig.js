const swaggerJSDoc = require('swagger-jsdoc');
const options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'eCommerce API',
            versions: '1.0.0',
            description: 'API for an ecom'
        },
        servers:[
            {
            
                url: 'http://localhost:3000/api/v1/',
                description: 'ecommerce description'
                    }
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {bearerAuth: []}
        ]
    },
    apis: ['./routes/*.js']
}

module.exports = swaggerJSDoc(options)