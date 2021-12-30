import CurrencyFormat from 'react-currency-format'
import React from 'react'
import './Subtotal.css'
import { useStateValue } from 'contexts/StateProvidder'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getBasketTotal } from 'contexts/Reducer'

const Subtotal = () => {
  const history = useHistory()
  const [{ basket }] = useStateValue()
  const subTotal = getBasketTotal(basket)

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={value => (
          <>
            <p>
              subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        fixedDecimalScale={true}
        value={subTotal}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <button onClick={() => history.push('/payment')}>
        Proceed to checkout
      </button>
    </div>
  )
}

export default Subtotal
