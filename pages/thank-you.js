import { useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import { CartContext } from 'utils/cartCookie'
import HeadMeta from 'components/HeadMeta'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Link from 'components/Link'

function NotFound() {
  const { setCartAmount, setShoppingCart } = useContext(CartContext)

  useEffect(() => {
    Cookies.remove('cart')
    setShoppingCart([])
    setCartAmount(0)
  }, [])

  return (
    <div className="error-container">
      <HeadMeta
        title="THANK YOU -  Gallaria"
        keywords="page not found, error 404, 404, error"
        robots="noindex, nofollow"
      />

      <Header />

      <div className="error-content">
        <div className="error-subtitle">
          Thank you for the purchase!
        </div>
        <div className="error-text">
          Receipt will be send to you soon
        </div>
        <Link href="/">
          Back to homepage
        </Link>
      </div>

      <Footer />
    </div>
  )
}

export default NotFound
