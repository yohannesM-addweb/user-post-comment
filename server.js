const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const mongoose = require('mongoose')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')




async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: app});

    app.use((request, response) => {
        response.send('Hello from express apollo server.')
    })

    await mongoose.connect('mongodb://localhost:27017/user_post_comment_db', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    
    console.log('Mongoose connected....')

    app.listen(3333, ()=> console.log('Server is running on port 3333'));
}

startServer();