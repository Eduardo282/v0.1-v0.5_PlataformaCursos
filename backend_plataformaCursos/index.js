const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const http = require('http');
const queryResolvers = require('./src/resolvers/query');
const mutationResolvers = require('./src/resolvers/mutation');
const { execute, subscribe } = require('graphql');

dotenv.config();

const app = express();
const cors = require('cors');
app.use(cors());


const port = process.env.PORT;
const schemaPath = path.join(__dirname, 'schema.graphql');
const schema = fs.readFileSync(schemaPath, 'utf-8');


const server = http.createServer(app);


const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers
};

const subscriptionServer = SubscriptionServer.create(
    {
        execute,
        subscribe,
        schema: makeExecutableSchema({
            typeDefs: schema,
            resolvers,
        })

    },
    {
        server,
        path: '/subscriptions',
    }
);

app.use(
    '/graphql',
    graphqlHTTP({
        schema: makeExecutableSchema({
            typeDefs: schema,
            resolvers,
        }),
        graphiql: {
            headerEditorEnabled: true,
            subscriptionsEndPoint: `ws:localhost:${process.env.PORT}/subscriptions`
        },
    }),

)

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}/graphql`);
    console.log(`Subscriptions corriendo en http://localhost:${process.env.PORT}/subscriptions`);
})







