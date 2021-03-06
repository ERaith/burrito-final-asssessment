import React, { Component } from "react";
import { getOrders, postOrder } from "../../apiCalls";
import { setOrders,addOrder } from "../../actions";
import { connect } from "react-redux";

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: "",
      ingredients: [],
    };
  }

  componentDidMount = () => {
    getOrders()
      .then((data) => this.props.setOrders(data.orders))
      .catch((err) => console.error("Error fetching:", err));
  };

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleIngredientChange = (e) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, e.target.name] });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.ingredients.length > 0) {
      this.clearInputs();
      let order = this.state;
      order['id'] = Date.now();
      this.placeOrder(order)
    }
  };

  placeOrder = async (order) => {
    console.log(order);
    
    let response = await postOrder(order);
    console.log(response);
    this.props.addOrder(response);
  }

  clearInputs = () => {
    this.setState({ name: "", ingredients: [] });
  };

  render() {
    const possibleIngredients = [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ];
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button
          key={ingredient}
          name={ingredient}
          onClick={(e) => this.handleIngredientChange(e)}
        >
          {ingredient}
        </button>
      );
    });

    return (
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.handleNameChange(e)}
        />

        {ingredientButtons}

        <p>Order: {this.state.ingredients.join(", ") || "Nothing selected"}</p>

        <button onClick={(e) => this.handleSubmit(e)}>Submit Order</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setOrders: (orders) => dispatch(setOrders(orders)),
  addOrder: (order) => dispatch(addOrder(order)),
});

export default connect(undefined, mapDispatchToProps)(OrderForm);
