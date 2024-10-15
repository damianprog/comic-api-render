const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('express-jwt');
const cors = require('cors');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const cookieParser = require('cookie-parser');
const JWT_SECRET = require('./config.js');
const path = require('path');
const PORT = process.env.PORT || 4000;
const corsUrl = process.env.CORS_URL;

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

const auth = jwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: false,
});
app.use(auth);
app.use(
  cors({
    credentials: true,
    origin: corsUrl,
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
  },
  context: ({ req, res }) => {
    const user = req.user ? req.user : null;

    return { user, res };
  },
  introspection: true,
});

server.applyMiddleware({ app, cors: false });

app.listen(PORT, () => {
  console.log(`The server started on port ${PORT}`);
});
