import React from 'react';
import { connect } from 'react-redux';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div className="order" key = {order.name}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key ={order.name + {ingredient} + Math.random()}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

const mapStateToProps = ({ orders }) => ({
  orders
});


export default connect(mapStateToProps, undefined)(Orders);