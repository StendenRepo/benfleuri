import prisma from '../../src/libs/prisma';

export const CustomerResolver = {
  // Query ALL customers
  Query: {
    customers: async (_parent, _args, ctx) =>
      await ctx.prisma.customer.findMany(),
  },
};
