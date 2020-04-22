import React from 'react';
import { connect } from 'react-redux';
import {deleteOrder} from '../../apiCalls';
import {removeOrder} from '../../actions/index';
import './Orders.css';

const Orders = props => {
  const handleDelete = async (id) => {

    let response =await deleteOrder(id)
    if(response!=='Not Found'){
      props.removeOrder(id)
    }
    
  }
  const orderEls = props.orders.map(order => {
    return (
      <div className="order" key = {order.name}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key ={order.name + {ingredient} + Math.random()}>{ingredient}</li>
          })}
        </ul>
        <button onClick = {()=>handleDelete(order.id)}>Delete Order</button>
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
const mapDispatchToProps = (dispatch) => ({
  removeOrder: (id) => dispatch(removeOrder(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Orders);