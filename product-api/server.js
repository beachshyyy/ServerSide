const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "User API information",
        },
    },

    servers: [
        {
            url: "http://localhost:3000"
        },
    ],

    apis: ["server.js"],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

const app = express()

app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

let users = [
    {id: 1, name: "A"},
    {id: 2, name: "B"}
]

/***
 * @swagger
 * /users:
 *  get:
 *      description: Get all users
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Error
*/

app.get("/users", (req, res) => {
    res.json(users)
})

app.listen(3000, () => {
    console.log("server running on http://localhost:3000")
})