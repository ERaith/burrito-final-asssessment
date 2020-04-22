export const setOrders = orders => ({
  type: 'SET_ORDERS',
  orders
});

export const addOrder = order => ({
  type: 'ADD_ORDER',
  order
});

export const removeOrder = orderID => ({
  type: 'REMOVE_ORDER',
  orderID
});
