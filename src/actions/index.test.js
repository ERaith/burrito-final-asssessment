import {setOrders,addOrder,removeOrder} from './index';

describe('Action Tests', () => {
  it('SET_ORDERS:', () => {
    //setup
    let mockOrders = [{id:1,name:'Jill',ingredients:[]},{id:2,name:'Hill',ingredients:[]}]
    let expected = {
      type: 'SET_ORDERS',
      orders:mockOrders
    }
    //execution
    let result = setOrders(mockOrders)

    //assertion
    expect(result).toEqual(expected)
  });
  it('ADD_ORDER:', () => {
    //setup
    let mockOrder = {id:1,name:'Jill',ingredients:[]}
    let expected = {
      type: 'ADD_ORDER',
      order:mockOrder
    }
    //execution
    let result = addOrder(mockOrder)

    //assertion
    expect(result).toEqual(expected)
  });

  it('REMOVE_ORDER:', () => {
    //setup
    let expected = {
      type: 'REMOVE_ORDER',
      orderID: 1
    }
    //execution
    let result = removeOrder(1)

    //assertion
    expect(result).toEqual(expected)
  });
  
})