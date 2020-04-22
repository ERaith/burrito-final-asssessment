const BASE_URL = 'http://localhost:3001/api/v1/orders'

export const getOrders = () => {
  return fetch(BASE_URL)
      .then(response => response.json())
}


export const postOrder = (order) => {
  let data = order
  return fetch(BASE_URL,{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
      "Content-Type":"application/json"
    }
  }).then((response) => {
    if(response.ok){
      return response
    } else {
      return response.statusText
    }
  })
}