import { useEffect, useState } from 'react'
import api from '../api/api'

function HistoryPage() {

  const [sales, setSales] = useState([])

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = async () => {

    const token = localStorage.getItem(
      'access_token'
    )

    try {

      const response = await api.get(
        'sales/',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setSales(response.data)

    } catch (error) {

      console.error(error)
    }
  }

  return (
  <div>

    <h1>Sale History</h1>

    {sales.map((sale) => (

      <div
        key={sale.id}
        style={{
          border: '1px solid #ddd',
          padding: '10px',
          marginBottom: '10px'
        }}
      >

        <p>
          Sale ID:
          {' '}
          {sale.formatted_sale_id}
        </p>

        <p>
          Payment:
          {' '}
          {sale.payment_method}
        </p>

        <p>
          Total:
          {' '}
          AED {sale.total}
        </p>

      </div>

    ))}

  </div>
)
}

export default HistoryPage