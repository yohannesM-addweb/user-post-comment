const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const mongoose = require('mongoose');
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')




async function startServer() {
    const app = express();
    
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

    apolloServer.applyMiddleware({ app: app});

    app.use((request, response) => {
        response.send('Hello from express apollo server.')
    })

    await mongoose.connect('mongodb://localhost:27017/db_graphql_demo_4', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    
    console.log('Mongoose connected....')

    app.listen(3333, ()=> console.log('Server is running on port 3333'));
}

startServer();