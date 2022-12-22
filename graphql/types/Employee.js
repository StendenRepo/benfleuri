import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  booleanArg,
  idArg,
} from 'nexus';
/**
 * @TODO
 * createEmployee: fix creation of double user names
 * password field private if that is possible
 * hash password
 */
export const Employee = objectType({
  name: 'Employee',
  definition(t) {
    t.int('id'), t.string('name'), t.boolean('isAdmin'), t.string('password');
  },
});

// All Queries for customer
export const EmployeeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findAllEmployees', {
      type: Employee,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.Employee.findMany();
      },
    });
    t.field('findEmployeeById', {
      type: Employee,
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, { id }, ctx) {
        return await ctx.prisma.Employee.findUnique({ where: { id } });
      },
    });
  },
});

// All mutations for Employee
export const EmployeeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createEmployee', {
      type: Employee,
      args: {
        name: nonNull(stringArg()),
        isAdmin: booleanArg({ default: false }),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.Employee.create({
          data: { ...args },
        });
      },
    });
    t.field('updateEmployee', {
      type: Employee,
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        isAdmin: booleanArg(),
        password: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.Employee.update({
          where: { id: args.id },
          data: { ...args },
        });
      },
    });
    t.field('deleteEmployee', {
      type: Employee,
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, { id }, ctx) {
        return await ctx.prisma.Employee.delete({ where: { id } });
      },
    });
  },
});
