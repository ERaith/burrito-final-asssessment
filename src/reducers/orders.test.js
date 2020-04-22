import {orders} from './orders';



describe("Reducer Tests", () => {
  let mockOrders,mockOrder;
  beforeEach(()=>{
    mockOrders = [
      { id: 1, name: "Jill", ingredients: [] },
      { id: 2, name: "Hill", ingredients: [] },
    ];

    mockOrder = { id: 1, name: "Jill", ingredients: [] };
  })

  
  it("Should set the correct state using the SET_ORDERS action", () => {
    let mockOrdersAction = {
      type:"SET_ORDERS",
      orders:mockOrders
    }
    
    let result = orders([],mockOrdersAction)

    expect(result).toEqual(mockOrders)
  })

  it("Should set the correct state using the ADD_ORDER action", () => {
    let mockOrderAction = {
      type:"ADD_ORDER",
      order:mockOrder
    }
    let mockExpectedState = [{ id: 1, name: "Jill", ingredients: [] }];

    let result = orders([],mockOrderAction)

    expect(result).toEqual(mockExpectedState)
  })
  it("Should set the correct state using the REMOVE_ORDER action", () => {
    let mockOrderAction = {
      type:"REMOVE_ORDER",
      orderID:2
    }
    let mockExpectedState = [{ id: 1, name: "Jill", ingredients: [] }];

    let result = orders(mockOrders,mockOrderAction)

    expect(result).toEqual(mockExpectedState)
  })

})


