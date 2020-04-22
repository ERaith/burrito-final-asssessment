
import App from "./App";
import React from "react";
import { fireEvent, render, waitFor, getByLabelText } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getOrders, postOrder,deleteOrder } from "../../apiCalls";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";
jest.mock("../../apiCalls");

describe("App:", () => {
  let store, testWrapper;
  beforeEach(() => {
    let masterOrderData = [
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
        <App />
      </Provider>
    );
  });
  it("should render the initial app", async () => {
    const { getByPlaceholderText, getByText, debug } = render(testWrapper);
    let charlie,blarg,fantasma;
    await waitFor(() => (charlie = getByText("Charlie")));
    await waitFor(() => (blarg = getByText("Blarg")));
    await waitFor(() => (fantasma = getByText("Fantasma")));
    expect(charlie).toBeInTheDocument();
    expect(blarg).toBeInTheDocument();
    expect(fantasma).toBeInTheDocument();
  });
  it("should be able to delete orders", async () => {
    const { getByLabelText, getByText, debug } = render(testWrapper);
    let charlie
    await waitFor(() => (charlie = getByText("Charlie")));
    let deleteCharlieOrder = getByLabelText('Delete Charlie');
    expect(charlie).toBeInTheDocument();
    deleteOrder.mockResolvedValue();
    expect(charlie).toBeInTheDocument();
    fireEvent.click(deleteCharlieOrder);
    expect(deleteOrder).toBeCalledWith(1)
    await waitFor(()=>expect(charlie).not.toBeInTheDocument())
  });

  it("should create an order and render", async () => {
    const { getByPlaceholderText, getByText, debug } = render(testWrapper);
    let nameInput = getByPlaceholderText("Name");
    let submit = getByText("Submit Order");
    let beans = getByText("beans");
    let jalapeno = getByText("jalapenos");
    jest.spyOn(global.Date, "now").mockImplementation(() => 42);
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
    let scDevs;
    await waitFor(() => (scDevs = getByText("StarCraftDevTeam")));
    expect(scDevs).toBeInTheDocument()
  });

});
