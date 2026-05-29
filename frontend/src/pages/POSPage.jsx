import { useEffect, useState } from 'react'

import api from '../api/api'
import ProductCard from '../components/ProductCard'

function POSPage() {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('')

  useEffect(() => {
    fetchProducts()
  }, []) 

  const fetchProducts = async () => {

    try {

      const response = await api.get('products/')

      setProducts(response.data)

    } catch (error) {

      console.error(error)
    }
  }
  const addToCart = (product) => {

  const existingItem = cart.find(
    item => item.id === product.id
  )

  if (existingItem) {

    const updatedCart = cart.map(item =>

      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
    )

    setCart(updatedCart)

  } else {

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ])
  }
}
const subtotal = cart.reduce(
    

  (total, item) =>

    total + (item.price * item.quantity),

  0
)
const vatAmount = subtotal * 0.05

const grandTotal = subtotal + vatAmount
const handleCheckout = async () => {

  const token = localStorage.getItem(
    'access_token'
  )
console.log('TOKEN:', token)
  try {

    const response = await api.post(

      'sales/create/',

      {
        payment_method: paymentMethod,

        items: cart.map(item => ({
          product: item.id,
          quantity: item.quantity,
        }))
      },

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(response.data)

    alert('Sale completed successfully')

  } catch (error) {

  console.error(error)

  console.log(
    'ERROR RESPONSE:',
    error.response?.data
  )

  alert('Checkout failed')
}
}
  return (
    <div>

      <h1>POS Page</h1>

    <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
  }}
>

  {products.map((product) => (

    <ProductCard
      key={product.id}
      product={product}
       onAddToCart={addToCart}
    />

  ))}

</div>
<h2>Cart</h2>

{cart.map(item => (

  <div key={item.id}>

    {item.name} x {item.quantity}

  </div>

))}
<hr />

<h3>
  Subtotal: AED {subtotal.toFixed(2)}
</h3>
<h3>
  VAT (5%): AED {vatAmount.toFixed(2)}
</h3>

<h2>
  Total: AED {grandTotal.toFixed(2)}
</h2>

<h3>Payment Method</h3>

<label>
  <input
    type="radio"
    value="Cash"
    checked={paymentMethod === 'Cash'}
    onChange={(e) =>
      setPaymentMethod(e.target.value)
    }
  />
  Cash
</label>

<br />

<label>
  <input
    type="radio"
    value="Card"
    checked={paymentMethod === 'Card'}
    onChange={(e) =>
      setPaymentMethod(e.target.value)
    }
  />
  Card
</label>
<br />
<br />

<button
  onClick={handleCheckout}
  disabled={
    cart.length === 0 ||
    !paymentMethod
  }
>
  Checkout
</button>
    </div>
  )
}

export default POSPage