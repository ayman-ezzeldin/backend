import swaggerJsdoc from "swagger-jsdoc";

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Project API",
      version: "1.0.0",
      description: "📘 API Documentation for Courses & Users APIs",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
        description: "Local Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // ممكن تسيبها فاضية بس دي بتوضح إنها JWT
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
          required: ["name", "email", "password"],
        },
        Course: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
          },
          required: ["title", "description", "price"],
        },
      },
    },
     // 👇 دي مهمة لو عايز كل الـ endpoints يكون عليها auth بشكل افتراضي
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
apis: ["./routes/*.js"]
};

export const swaggerSpec = swaggerJsdoc(options);
