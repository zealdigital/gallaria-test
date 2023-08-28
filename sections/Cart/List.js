import { useContext, useEffect, useRef, useState } from 'react'
import { sumBy, groupBy } from 'lodash'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { CartContext } from 'utils/cartCookie'
import { commaInNumbers } from 'utils/validation'
import APIRequest from 'utils/APIRequest'
import Link from 'components/Link'
import styles from 'styles/modules/Cart.module.scss'

function List() {
  const formRef = useRef()
  const [submit, setSubmit] = useState(false)
  const [shippingFees, setShippingFees] = useState(0)
  const router = useRouter()
  const { setCartAmount, shoppingCart, setShoppingCart } = useContext(CartContext)

  useEffect(() => {
    getShipping()
  }, [shoppingCart])

  const getShipping = () => {
    const groups = groupBy(shoppingCart, 'category')
    let ship = 0
    for (const key of Object.keys(groups)) {
      const base = groups[key][0].baseShipping
      const following = groups[key][0].shipping
      const quantity = sumBy(groups[key], 'quantity') - 1
      ship += base + (following * quantity)
    }
    setShippingFees(ship)
  }

  const settingCookie = () => {
    setShoppingCart(JSON.parse(Cookies.get('cart')))
    setCartAmount(JSON.parse(Cookies.get('cart')).length)
  }

  const removeItem = (e, i) => {
    e.preventDefault()
    const cart = JSON.parse(Cookies.get('cart'))
    cart.splice(i, 1)
    Cookies.set('cart', cart)

    settingCookie()
  }

  const addQuantity = (i) => {
    const cart = JSON.parse(Cookies.get('cart'))
    cart[i].quantity += 1
    Cookies.set('cart', cart)

    settingCookie()
  }

  const removeQuantity = (i) => {
    const cart = JSON.parse(Cookies.get('cart'))
    if (cart[i].quantity - 1 > 0) cart[i].quantity -= 1
    Cookies.set('cart', cart)

    settingCookie()
  }

  const handleChange = (e, i) => {
    const cart = JSON.parse(Cookies.get('cart'))
    cart[i].quantity = parseInt(e.target.value, 10)
    if (!e.target.value) cart[i].quantity = 1
    Cookies.set('cart', cart)

    settingCookie()
  }

  const checkout = e => {
    e.preventDefault()
    setSubmit(true)
    const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    const line_items = shoppingCart.map(product => ({
      description: `${product.variant} / ${product.code}`,
      price_data: {
        currency: 'aud',
        product_data: {
          name: product.name,
          images: [`https://www.gallaria.com.au/${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(product.image).replace('(', '%28').replace(')', '%29')}`],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity
    }))
    line_items.push({
      price_data: {
        currency: 'aud',
        product_data: {
          name: 'Shipping Fees'
        },
        unit_amount: shippingFees * 100,
      },
      quantity: 1
    })

    APIRequest('POST', '/api/checkout', {
      phone: formRef.current[0].value,
      email: formRef.current[1].value,
      line_items
    })
      .then((response) => response.data)
      .then((session) => stripe.redirectToCheckout({ sessionId: session.id }))
      .then((result) => {
        if (result.error) {
          alert(result.error.message)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })

    setSubmit(false)
  }

  return (
    <section className={styles['section-list']}>
      <div className="container">
        <div className={`${styles['list-title']} row`}>
          <div className="col-6">
            PRODUCTS
          </div>
          <div className={`${styles['hide-mobile']} ${styles['title-label']} col-lg-2`}>
            PRODUCTS
          </div>
          <div className={`${styles['title-label']} col-6 col-lg-2`}>
            QTY.
          </div>
          <div className={`${styles['hide-mobile']} col-lg-2`}>
            QTY.
          </div>
        </div>
        <div className={`${styles['divider']} ${styles['divider-1']}`} />
        <div className={styles['item-container']}>
          {shoppingCart.map((item, i) => (
            <div key={item.code} className={`row ${styles['item']}`}>
              <div className={`${styles['image-container']} col-4 col-lg-3`}>
                <Link href={`/product/${item.code}`}>
                  <img src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(item.image).replace('(', '%28').replace(')', '%29')}`} />
                </Link>
              </div>
              <div className={`${styles['text-container']} col-8 col-lg-3`}>
                <div className={styles['title']}>
                  <Link href={`/product/${item.code}`}>
                    {item.name}
                  </Link>
                  <span className={styles['mobile-quantity']}>{item.quantity}</span>
                </div>
                <div className={`${styles['info']} col-12 col-lg-4`}>
                  VARIANT: {item.variant || 'N/A'}
                  <br />
                  <span className={styles['mobile-price']}>
                    AUD: {commaInNumbers(item.price)}
                    <br />
                  </span>
                </div>
                <div className={styles['remove']}>
                  <a href="#" onClick={(e) => removeItem(e, i)}>
                    REMOVE
                  </a>
                  <a href="#" onClick={(e) => removeItem(e, i)}>
                    <img src="/svg/bin.svg" alt="remove" />
                  </a>
                </div>
              </div>
              <div className={`${styles['text-container']} ${styles['hide-mobile']} col-lg-2`}>
                <div className={`${styles['info']}`} style={{ textAlign: 'center' }}>
                  AUD: {commaInNumbers(item.price)}
                </div>
              </div>
              <div className={`${styles['text-container']} ${styles['hide-mobile']} col-lg-2`}>
                <div className={`${styles['info']}`}>
                  <span className={styles['quantity']}>
                    <span
                      onClick={() => removeQuantity(i)}
                      className={styles['minus']}
                    >
                      -
                    </span>
                    <input
                      value={item.quantity}
                      onChange={e => handleChange(e, i)}
                      type="number"
                      style={{ marginBottom: 0 }}
                    />
                    <span
                      onClick={() => addQuantity(i)}
                      className={styles['add']}
                    >
                      +
                    </span>
                  </span>
                </div>
              </div>
              <div className={`${styles['text-container']} ${styles['hide-mobile']} col-lg-2`}>
                <div className={`${styles['info']}`} style={{ textAlign: 'right' }}>
                  AUD: {commaInNumbers(item.price * item.quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles['divider']} ${styles['divider-2']}`} />
        <div className={`row ${styles['total-container']}`}>
          <div className="col-5 col-lg-8" />
          <div className={`col-2 ${styles['label']}`}>
            SHIPPING FEES:
          </div>
          <div className={`col-5 col-lg-2 ${styles['value']}`}>
            AUD {commaInNumbers(shippingFees)}
          </div>
        </div>
        <div className={`row ${styles['total-container']}`}>
          <div className="col-5 col-lg-8" />
          <div className={`col-1 ${styles['label']}`}>
            SUBTOTAL:
          </div>
          <div className={`col-6 col-lg-3 ${styles['value']}`}>
            AUD {commaInNumbers(sumBy(shoppingCart, item => item.price * item.quantity))}
          </div>
        </div>
        <div className={`${styles['divider']} ${styles['divider-3']}`} />
        <form ref={formRef} onSubmit={checkout} className={styles['form']}>
          <div className="row">
            <div className="col-lg-4" />
            <div className="col-lg-4">
              <input className={styles['input']} required name="phone" placeholder="PHONE NUMBER*" pattern="^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$" />
            </div>
            <div className="col-lg-4">
              <input className={styles['input']} required name="email" placeholder="EMAIL ADDRESS*" pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />
            </div>
          </div>
          <div className={`${styles['button-container']} row`}>
            <div className="col-lg-3">
              <button
                type="button"
                disabled={submit}
                onClick={() => router.back()}
                className="button-outlined"
              >
                BACK TO BROWSING
              </button>
            </div>
            <div className="col-lg-3" style={{ marginLeft: 'auto' }}>
              <button type="submit" disabled={submit} className="button-contained">
                CHECKOUT
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default List
