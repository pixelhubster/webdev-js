import express from 'express'

const app = express();
const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, username:"noble", displayName:"noble"},
    {id: 2, username:"james", displayName:"james"},
    {id: 3, username:"eric", displayName:"eric"},
    {id: 4, username:"jason", displayName:"jason"},
    {id: 5, username:"jackson", displayName:"jackson"},
]

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
}
app.use(loggingMiddleware);

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})

app.get("/", (request, response) => {
    response.status(201).send("Get /")
})

app.get("/api/users", (request, response) => {
    response.send(mockUsers)
})

app.get("/api/users/:id", (request, response) => {
    const {params: {id}} = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    console.log(parsedId);
    const user = mockUsers.find((user) => user.id === parsedId);
    if (user === 'undefined') return response.sendStatus(404);
    return response.status(200).send(user);
})