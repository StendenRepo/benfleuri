import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../../graphql/schema';
import resolver from '../../../graphql/resolver';
import Cors from 'micro-cors';

const cors = Cors();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(res, req);
});

export const config = {};
