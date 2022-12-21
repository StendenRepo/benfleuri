import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../../graphql/schema';
import resolver from '../../../graphql/resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: [resolver],
});

const startServer = apolloServer.start();

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (req.method === 'OPTIONS') {
    res.end();

    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};

// Turn of Next.js default bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};
