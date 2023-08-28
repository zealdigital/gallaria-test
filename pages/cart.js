import { useContext, useEffect } from 'react'
import { Footer, Header, HeadMeta } from 'components'
import { CartContext } from 'utils/cartCookie'
import { List, NoItem } from 'sections/Cart'
import styles from 'styles/modules/Cart.module.scss'

function Projects() {
  const { cartAmount, setOpenCart } = useContext(CartContext)

  useEffect(() => {
    setOpenCart(false)
  }, [])

  return (
    <div className={styles['container']}>
      <HeadMeta
        title="Shopping Cart - Gallaria"
        desc="INTELLIGENT BATHROOMS BY GALLARIA"
        keywords=""
        robots="index, follow"
        url="https://www.gallaria.com.au/cart"
        metaOG="/logo.png"
        metaTwitter="/logo.png"
      >
        <script src="https://js.stripe.com/v3/" />
      </HeadMeta>

      <Header />
      <section className={styles['section-title']}>
        <div className="container">
          <div className={styles['title']}>
            CART {cartAmount > 0 && `(${cartAmount})`}
          </div>
        </div>
      </section>

      {cartAmount < 1 && <NoItem />}
      {cartAmount > 0 && <List />}
      <Footer />
    </div>
  )
}

export default Projects
