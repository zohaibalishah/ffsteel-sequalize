const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodejs seqalize',
      version: '1.0.0',
    },
    servers: [
        { url: 'http://localhost:3000', name: 'development' },
  
      ],
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

module.exports=openapiSpecification
