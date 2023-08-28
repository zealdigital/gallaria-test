import { useContext } from 'react'
import Cookies from 'js-cookie'
import { EnquiryContext } from 'utils/enquiryCookie'
import { commaInNumbers } from 'utils/validation'
import Link from 'components/Link'
import styles from 'styles/modules/Enquiries.module.scss'

function List() {
  const { setEnquiryAmount, enquiryCart, setEnquiryCart } = useContext(EnquiryContext)

  const removeItem = (e, i) => {
    e.preventDefault()
    const enquiries = JSON.parse(Cookies.get('enquiries'))
    enquiries.splice(i, 1)
    Cookies.set('enquiries', enquiries)

    setEnquiryCart(JSON.parse(Cookies.get('enquiries')))
    setEnquiryAmount(JSON.parse(Cookies.get('enquiries')).length)
  }

  const addQuantity = (i) => {
    const enquiries = JSON.parse(Cookies.get('enquiries'))
    enquiries[i].quantity += 1
    Cookies.set('enquiries', enquiries)

    setEnquiryCart(JSON.parse(Cookies.get('enquiries')))
    setEnquiryAmount(JSON.parse(Cookies.get('enquiries')).length)
  }

  const removeQuantity = (i) => {
    const enquiries = JSON.parse(Cookies.get('enquiries'))
    if (enquiries[i].quantity - 1 > 0) enquiries[i].quantity -= 1
    Cookies.set('enquiries', enquiries)

    setEnquiryCart(JSON.parse(Cookies.get('enquiries')))
    setEnquiryAmount(JSON.parse(Cookies.get('enquiries')).length)
  }

  const handleChange = (e, i) => {
    const enquiries = JSON.parse(Cookies.get('enquiries'))
    enquiries[i].quantity = parseInt(e.target.value, 10)
    if (!e.target.value) enquiries[i].quantity = 1
    Cookies.set('enquiries', enquiries)

    setEnquiryCart(JSON.parse(Cookies.get('enquiries')))
    setEnquiryAmount(JSON.parse(Cookies.get('enquiries')).length)
  }

  return (
    <section className={styles['section-list']}>
      <div className="container">
        <div className={styles['list-title']}>
          <div>
            PRODUCTS
          </div>
          <div>
            QTY.
          </div>
        </div>
        <div className={`${styles['divider']} ${styles['divider-1']}`} />
        <div className={styles['item-container']}>
          <div className="row">
            {enquiryCart.map((item, i) => (
              <div key={item.code} className={`col-lg-6 ${styles['item']}`}>
                <div className={styles['image-container']}>
                  <Link href={`/product/${item.code}`}>
                    <img src={`${process.env.NEXT_PUBLIC_MEDIA_FOLDER}${encodeURIComponent(item.image).replace('(', '%28').replace(')', '%29')}`} />
                  </Link>
                </div>
                <div className={styles['text-container']}>
                  <div className={styles['title']}>
                    <Link href={`/product/${item.code}`}>
                      {item.name}
                    </Link>
                    <span className={styles['mobile-quantity']}>{item.quantity}</span>
                  </div>
                  <div className={styles['info']}>
                    VARIANT: {item.variant || 'N/A'}
                    <br />
                    AUD: {commaInNumbers(item.price)}
                    <br />
                    <span className={styles['quantity']}>
                      QTY:&nbsp;
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
                      />
                      <span
                        onClick={() => addQuantity(i)}
                        className={styles['add']}
                      >
                        +
                      </span>
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
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles['divider']} ${styles['divider-2']}`} />
      </div>
    </section>
  )
}

export default List
