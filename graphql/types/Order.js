import { Prisma } from '@prisma/client';
import {
  booleanArg,
  floatArg,
  arg,
  idArg,
  nonNull,
  objectType,
  extendType,
  stringArg,
  intArg,
} from 'nexus';
import { CardType, OrderState, PaymentMethod } from './enumTypes';

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.int('id'),
      t.float('price'),
      t.int('customerId'),
      t.int('employeeId'),
      t.int('recieverId'),
      t.int('orderTreatingEmployeeId')
      t.string('message'),
      t.string('extraInfo'),
      t.string('productInfo'),
      t.string('dateOfDelivery'),
      t.boolean('orderDate'),
      t.boolean('includeDelivery'),
      t.field('cardType', { type: CardType }),
      t.field('orderState', { type: OrderState }),
      t.field('paymentMethod', { type: PaymentMethod });
  },
});

// All Queries for customer
export const OrderQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('findAllOrders', {
      type: Order,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.Order.findMany({
          include: {
            customer: true,
            employee: true,
          },
        });
      },
    });
    t.field('findOrderById', {
      type: Order,
      args: {
        id: nonNull(idArg()),
      },
      async resolve(_parent, { id }, ctx) {
        return await ctx.prisma.Order.findUnique({ where: { id } });
      },
    });
  },
});

// All mutations for Order
export const OrderMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOrder', {
      type: Order,
      args: {
        customerId: nonNull(intArg()),
        employeeId: nonNull(intArg()),
        recieverId: nonNull(intArg()),
        orderTreatingEmployeeId: intArg(),
        productInfo: stringArg(),
        message: stringArg(),
        extraInfo: stringArg(),
        cardType: arg({ type: CardType, default: 'NONE' }),
        includeDelivery: booleanArg(),
        price: floatArg(),
        dateOfDelivery: stringArg(),
        orderState: arg({ type: OrderState, default: 'OPEN' }),
        paymentMethod: arg({ type: PaymentMethod }),
      },
      async resolve(_parent, args, ctx) {
        let [day, month, year] = args.dateOfDelivery.split('-');

        return await ctx.prisma.Order.create({
          data: {
            dateOfDelivery: new Date(year, month, day),
            customer: {
              connect: {
                id: args.customerId,
              },
            },
            employee: {
              connect: {
                id: args.employeeId,
              },
            },
            reciever: {
              connect: {
                id: args.recieverId,
              },
            },
            orderTreatingEmployee: {
              connect: {
                id: args.orderTreatingEmployeeId,
              }
            },
            productInfo: args.productInfo,
            message: args.message,
            extraInfo: args.extraInfo,
            cardType: args.cardType,
            includeDelivery: args.includeDelivery,
            price: new Prisma.Decimal(args.price),
            orderState: args.orderState,
            paymentMethod: args.paymentMethod,
          },
          include: {
            customer: true,
            employee: true,
          },
        });
      },
    });
    t.field('updateOrder', {
      type: Order,
      args: {
        id: intArg(),
        customerId: idArg(),
        employeeId: idArg(),
        orderTreatingEmployeeId: idArg(),
        productInfo: stringArg(),
        message: stringArg(),
        extraInfo: stringArg(),
        cardType: arg({ type: CardType }),
        includeDelivery: booleanArg(),
        price: floatArg(),
        dateOfDelivery: stringArg(),
        orderState: arg({ type: OrderState }),
        paymentMethod: arg({ type: PaymentMethod }),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.Order.update({
          where: { id: args.id },
          data: { ...args },
        });
      },
    });
    t.field('deleteOrder', {
      type: Order,
      args: {
        id: nonNull(idArg()),
      },
      async resolve(_parent, { id }, ctx) {
        return await ctx.prisma.Order.delete({ where: { id } });
      },
    });
  },
});
