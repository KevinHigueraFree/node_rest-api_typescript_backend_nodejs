

import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

// Para agregarle tipado a options
const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2', // Cambia 'opneapi' a 'openapi'
        tags: [{
            name: 'Products',
            description: 'API operations related to products'
        }],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts'] // Asegúrate de que la ruta sea correcta
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link{
            content: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAxIiBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDY0IDY0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojNGZiZTlmO30uY2xzLTJ7ZmlsbDojMDk4MTZjO308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQ4LjgsNDQuNTRsLTExLTE0LjY2YTEuMjIsMS4yMiwwLDAsMSwxLjk0LTEuNDlsMSwxLjJhLjMzLjMzLDAsMCwwLC41MSwwbDcuNTctMTAuMDdhNy4yLDcuMiwwLDAsMC0xLTkuOTEsNyw3LDAsMCwwLTEwLDEuMjVMMjguMTQsMjMuNjNhLjI3LjI3LDAsMCwxLS40OC0uMTZWMTUuMzZhNy4xOSw3LjE5LDAsMCwwLTYuNzktNy4yOSw3LDcsMCwwLDAtNy4yMiw3VjQ4LjY0YTcuMTksNy4xOSwwLDAsMCw2Ljc5LDcuMjksNyw3LDAsMCwwLDcuMjItN1YzOS43M0wzNy43NSw1My4xNWE3LDcsMCwwLDAsMTAuMTIsMS4xM0E3LjE1LDcuMTUsMCwwLDAsNDguOCw0NC41NFoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xMy42NSw0NC40NnY0LjE4YTcuMTksNy4xOSwwLDAsMCw2Ljc5LDcuMjksNyw3LDAsMCwwLDcuMjItN1YzOS43NmgwQTcuNzksNy43OSwwLDAsMCwxMy42NSw0NC40NloiLz48L3N2Zz4=);
            height: 8rem;
            width: auto;
        }
        .swagger-ui .topbar{
            background-color: #2b3b45; 
        }
        `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
}

export default swaggerSpec;
export {
    swaggerUiOptions
}