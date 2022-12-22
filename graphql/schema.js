import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './types';

const CWD = process.cwd();

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(CWD, 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(CWD, 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(CWD, 'graphql', 'context.js'),
  },
});
