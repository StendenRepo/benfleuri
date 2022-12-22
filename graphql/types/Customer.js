import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus';

export const Customer = objectType({
  name: 'Customer',
  definition(t) {
    t.int('id'),
      t.string('firstName'),
      t.string('lastName'),
      t.string('city'),
      t.string('phone_number'),
      t.string('email'),
      t.string('postcal_code'),
      t.string('streetName'),
      t.string('houseNumber');
  },
});

// All Queries for customer
export const CustomerQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findAllCustomers', {
      type: Customer,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.customer.findMany();
      },
    });
    t.field('findCustomerById', {
      type: Customer,
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, { id }, ctx) {
        return await ctx.prisma.Customer.findUnique({ where: { id } });
      },
    });
  },
});

// All mutations for customer
export const CustomerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createCustomer', {
      type: Customer,
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        city: stringArg(),
        phone_number: nonNull(stringArg()),
        email: stringArg(),
        postal_code: stringArg(),
        streetName: stringArg(),
        houseNumber: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.customer.create({
          data: { ...args },
        });
      },
    });
    t.field('updateCustomer', {
      type: Customer,
      args: {
        id: nonNull(intArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        city: stringArg(),
        phone_number: nonNull(stringArg()),
        email: stringArg(),
        postal_code: stringArg(),
        streetName: stringArg(),
        houseNumber: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.customer.update({
          where: { id: args.id },
          data: { ...args },
        });
      },
    });
    t.field('deleteCustomer', {
      type: Customer,
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, { id }, ctx) {
        return await ctx.prisma.customer.delete({ where: { id } });
      },
    });
  },
});
