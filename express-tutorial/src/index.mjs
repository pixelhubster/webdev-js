import express from "express"

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json())

const mockUsers = [
    {id: 1, username: "anson", displayName: "anson"},
    {id: 2, username: "kaleel", displayName: "kaleel"},
    {id: 3, username: "jackson", displayName: "jackson"},
    {id: 4, username: "james", displayName: "james"},
    {id: 5, username: "noble", displayName: "noble"},
    
]

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next()
}

const handleIndexByUserId = (request, response, next) => {
    const { body, params: { id } } = request;
    const parsedId = parseInt(id);
    console.log(request.params) 
    console.log(body)
    if (isNaN(parsedId)) return response.status(201).send({msg: "Bad request. Invalid Id"})
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    request.findUserIndex = findUserIndex;
    next()
}




app.use(loggingMiddleware)

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})

//getting data from /
app.get("/", (request, response) => {
    response.status(201).send({msg: "Hello"});
})

//get user data with filters /api/users 
app.get("/api/users", (request, response) => {
    const { query: {filter, value}} = request;

    if (filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    )
    return response.send(mockUsers)
})

//get product data /api/products
app.get("/api/products", (request, response) => {
    response.send([
        {id: 1, name: "Chicken", price: 12.99}
    ])
})

//post method
app.post("/api/users",(request, response) => {
    const { body } = request;
    const newUser = {
        id: mockUsers[mockUsers.length -1].id + 1,
        ...body
    };
    mockUsers.push(newUser);
    console.log(newUser);
    return response.send(mockUsers);
})

//get user data with id
app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    if (isNaN(parsedId)) 
        return response.status(400).send({msg: "Bad request. Invalid ID."});
    const findUser = mockUsers.find((user) => user.id === parsedId)
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser)
})

app.put("/api/users/:id",handleIndexByUserId,(request, response) => {
    const {body, findUserIndex} = request;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body,}
    return response.sendStatus(200);
})

app.patch("/api/users/:id",handleIndexByUserId, (request, response) => {
    const { body, findUserIndex } = request;
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body }
    return response.sendStatus(200)
})

app.delete("/api/users/:id", handleIndexByUserId, (request, response) => {
    const {findUserIndex} = request;
    mockUsers.splice(findUserIndex,1)
    return response.sendStatus(200)

})

