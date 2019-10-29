const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
   swaggerDefinition: {
      info: {
         title: "tik-tak API",
         description: "tik-tak API information",
         contact: {
            name: "Heba, John, Yoan"
         },
         servers: [`http://localhost:${process.env.PORT || 3001}`]
      }
   },
   apis: ["server.js"]
};

module.exports = swaggerJsDoc(swaggerOptions);
