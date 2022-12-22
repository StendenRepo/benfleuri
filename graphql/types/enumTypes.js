import { enumType } from 'nexus';

export const CardType = enumType({
  name: 'CardType',
  members: ['NONE', 'BASIC_CARD', 'RIBBON', 'SPECIAL_CARD'],
});

export const OrderState = enumType({
  name: 'OrderState',
  members: ['OPEN', 'CLOSED', 'IN_PROGRESS', 'DELIVERED'],
});

export const PaymentMethod = enumType({
  name: 'PaymentMethod',
  members: ['CASH', 'PIN', 'BY_INVOICE'],
});
