const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const cors = require('cors');
const bodyParser = require('body-parser');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const { Article, User,Comment } = require('./data');

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

  app.listen(3000, () => {
    console.log('you first graphQL application is running!');
  })
};

startServer();