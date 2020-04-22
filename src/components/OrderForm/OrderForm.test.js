import OrderForm from "./OrderForm";
import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";
import { getOrders, postOrder } from "../../apiCalls";
jest.mock("../../apiCalls");

describe("OrderForm:", () => {
  let store, testWrapper, masterOrderData;
  beforeEach(() => {
    masterOrderData = [
      {
        id: 1,
        name: "Charlie",
        ingredients: [
          "beans",
          "lettuce",
          "carnitas",
          "queso fresco",
          "jalapeno",
        ],
      },
      {
        id: 2,
        name: "Blarg",
        ingredients: ["beans", "queso fresco", "jalapeno"],
      },
      {
        id: 3,
        name: "Fantasma",
        ingredients: ["jalapeno"],
      },
    ];
    getOrders.mockResolvedValue({ orders: masterOrderData });
    postOrder.mockResolvedValue();
    store = createStore(rootReducer);
    testWrapper = (
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
  });

  it("Should render the order form", () => {
    const { getByPlaceholderText, getByText, debug } = render(testWrapper);
    let nameInput = getByPlaceholderText("Name");
    let submit = getByText("Submit Order");
    let beans = getByText("beans");
    let jalapeno = getByText("jalapenos");
    expect(nameInput).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    expect(beans).toBeInTheDocument();
    expect(jalapeno).toBeInTheDocument();
  });

  it("Should create a new order", () => {
    const { getByPlaceholderText, getByText, debug } = render(testWrapper);
    jest.spyOn(global.Date, "now").mockImplementation(() => 42);
    let nameInput = getByPlaceholderText("Name");
    let submit = getByText("Submit Order");
    let beans = getByText("beans");
    let jalapeno = getByText("jalapenos");
    expect(getByText("Order: Nothing selected")).toBeInTheDocument();
    expect(jalapeno).toBeInTheDocument();
    fireEvent.click(beans);
    fireEvent.click(jalapeno);
    fireEvent.change(nameInput, { target: { value: "StarCraftDevTeam" } });
    expect(nameInput.value).toEqual("StarCraftDevTeam");
    expect(getByText(`Order: beans, jalapenos`)).toBeInTheDocument();
    fireEvent.click(submit);
    expect(postOrder).toBeCalledWith({
      id: 42,
      name: "StarCraftDevTeam",
      ingredients: ["beans", "jalapenos"],
    });
    expect(getByText("Order: Nothing selected")).toBeInTheDocument();
  });
  it("Should not create a new order with an empty ingredients list", () => {
    jest.clearAllMocks();
    const { getByPlaceholderText, getByText, debug } = render(testWrapper);
    jest.spyOn(global.Date, "now").mockImplementation(() => 42);
    let nameInput = getByPlaceholderText("Name");
    let submit = getByText("Submit Order");
    expect(getByText("Order: Nothing selected")).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: "StarCraftDevTeam" } });
    expect(nameInput.value).toEqual("StarCraftDevTeam");
    fireEvent.click(submit);
    expect(postOrder).toBeCalledTimes(0);
    expect(getByText("Order: Nothing selected")).toBeInTheDocument();
  });
});
