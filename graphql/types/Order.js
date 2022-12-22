import { objectType } from 'nexus';
import { CardType, OrderState, PaymentMethod } from './enumTypes';

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.int('id'),
      t.int('price'),
      t.int('customerId'),
      t.int('employeeId'),
      t.int('recieverId'),
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
