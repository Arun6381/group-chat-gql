const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const mongoose = require("mongoose");
require("dotenv").config();

// Import the Mongoose model
const { MessageModel } = require("./schema");

const pubSub = new PubSub();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your schema using GraphQL schema language
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    postMessage(userId: String!, user: String!, content: String!): Boolean
  }

  type Subscription {
    messages: [Message!]!
  }
`;

const resolvers = {
  Query: {
    messages: async () => {
      return await MessageModel.find();
    },
  },
  Mutation: {
    postMessage: async (parent, { userId, user, content }) => {
      const newMessage = new MessageModel({ userId, user, content });
      await newMessage.save();

      const messages = await MessageModel.find();
      pubSub.publish("MESSAGE_ADDED", { messages });

      return true; // Indicate success
    },
  },
  Subscription: {
    messages: {
      subscribe: () => pubSub.asyncIterator(["MESSAGE_ADDED"]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: { pubSub },
  subscriptions: {
    path: "/graphql",
  },
});

const httpServer = createServer(server);

SubscriptionServer.create(
  {
    execute,
    subscribe,
    schema,
  },
  {
    server: httpServer,
    path: "/graphql",
  }
);

httpServer.listen(4000, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
