import { useContext, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { ContactContext } from 'components/ContactWindow'
import { EnquiryNumber, EnquiryContext } from 'utils/enquiryCookie'
import { CartNumber, CartContext } from 'utils/cartCookie'
import Link from 'components/Link'
import EnquiryCart from './EnquiryCart'
import ShoppingCart from './ShoppingCart'

function Header({ setAllowScrolling, landing = false }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [invert, setInvert] = useState(false)
  const headerRef = useRef()
  const router = useRouter()
  const { enquiryAmount, setEnquiryAmount, setEnquiryCart, openEnquiry, setOpenEnquiry } = useContext(EnquiryContext)
  const { cartAmount, setShoppingCart, setCartAmount, openCart, setOpenCart } = useContext(CartContext)
  const { setContactOpen } = useContext(ContactContext)

  useEffect(() => {
    window.removeEventListener('scroll', checkHeader)
    window.addEventListener('scroll', checkHeader)
    // document.body.style.overflow = open ? 'hidden' : 'auto'
    checkHeader()
    if (setAllowScrolling) setAllowScrolling(!open)
  }, [open, openEnquiry, openCart])

  useEffect(() => {
    if (openCart) {
      setOpen(false)
      setOpenEnquiry(false)
    }
  }, [openCart])

  useEffect(() => {
    if (openEnquiry) {
      setOpen(false)
      setOpenCart(false)
    }
  }, [openEnquiry])

  useEffect(() => {
    if (open) {
      setOpenEnquiry(false)
      setOpenCart(false)
    }
  }, [open])

  useEffect(() => {
    window.addEventListener('scroll', checkHeader)
    const cart = Cookies.get('cart')
    if (cart) {
      setShoppingCart(JSON.parse(cart))
      setCartAmount(JSON.parse(cart).length)
    }

    const enquiries = Cookies.get('enquiries')
    if (enquiries) {
      setEnquiryCart(JSON.parse(enquiries))
      setEnquiryAmount(JSON.parse(enquiries).length)
    }

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('scroll', checkHeader)
    }
  }, [])

  const checkHeader = () => {
    const ele = headerRef.current
    const breakpoint = landing ? document.documentElement.clientHeight : 100
    if (document.documentElement.scrollTop > breakpoint) {
      (ele || {}).className = `flex-center${(open || openEnquiry || openCart) ? ' menu-header' : ''} menu-black`
      headerState()
    } else {
      (ele || {}).className = `flex-center${(open || openEnquiry || openCart) ? ' menu-header' : ''}`
      headerState()
    }
  }

  const headerState = () => {
    const classes = headerRef.current?.className
    setInvert(classes?.includes('menu-header') || classes?.includes('menu-black'))
  }

  const searchFunction = () => {
    if (search.length > 2) router.push(`/products?search=${encodeURIComponent(search)}`)
  }

  return (
    <header id="header">
      <div ref={headerRef} id="header-background" className="flex-center">
        <div className="container flex-center">
          <Link href="/">
            <img src={invert ? '/svg/logo-white.svg' : '/svg/logo-black.svg'} alt="Gallaria Logo" className="logo" />
          </Link>
          <div className="navigation">
            <div className="search">
              <div>
                <img className="navigation-image" onClick={searchFunction} src={invert ? '/svg/inverted-search.svg' : '/svg/search.svg'} alt="Search" />
              </div>
              <div>
                <input
                  required
                  value={search}
                  onChange={({ target }) => setSearch(target.value)}
                  onKeyDown={e => (e.key === 'Enter') && searchFunction()}
                  placeholder="SEARCH"
                />
              </div>
            </div>
            <div className="cart-container-1">
              <a
                href="#"
                className="carts"
                style={{ marginRight: '0' }}
                onClick={e => {
                  e.preventDefault()
                  setOpenEnquiry(!openEnquiry)
                }}
              >
                <img className="navigation-image" src={invert ? '/svg/inverted-enquiry.svg' : '/svg/enquiry.svg'} alt="Enquiry" />
                {enquiryAmount > 0 && <EnquiryNumber invert={invert} />}
              </a>
              <EnquiryCart openEnquiry={openEnquiry} setOpenEnquiry={setOpenEnquiry} />
            </div>
            <div className="cart-container-2">
              <a
                href="#"
                className="carts"
                style={{ marginRight: '0' }}
                onClick={e => {
                  e.preventDefault()
                  setOpenCart(!openCart)
                }}
              >
                <img className="navigation-image" src={invert ? '/svg/inverted-shopping.svg' : '/svg/shopping.svg'} alt="Shopping" />
                {cartAmount > 0 && <CartNumber invert={invert} />}
              </a>
              <ShoppingCart openCart={openCart} setOpenCart={setOpenCart} />
            </div>
            <div onClick={() => setOpen(!open)} style={{ paddingLeft: '23.885px', paddingRight: '12px' }}>
              <div className={`kebab${open ? ' opened' : ''}`}>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`menu${open ? ' open' : ''}`}>
        <div className="container">
          <div className="col-12 col-lg-4">
            <Link href="/enquiry">
              <span className="title enquiry-link">
                ENQUIRIES {enquiryAmount > 0 ? ` (${enquiryAmount})` : ''}
              </span>
            </Link>
            <Link href="/cart">
              <span className="title cart-link">
                SHOPPING CART {cartAmount > 0 ? ` (${cartAmount})` : ''}
              </span>
            </Link>
            <span className="title">PRODUCTS</span>
            <div className="button">
              <div>
                <Link href="/products?filterUrl=INTELLIGENT-BATHROOM" style="col-6 col-lg-3">
                  <img src="/svg/bathroom.svg" onClick={() => setOpen(false)} />
                  <span>INTELLIGENT BATHROOM</span>
                </Link>
                <Link href="/products?filterUrl=TOILET" style="col-6 col-lg-3">
                  <img src="/svg/toilet.svg" onClick={() => setOpen(false)} />
                  <span>TOILET</span>
                </Link>
              </div>
              <div>
                <Link href="/products?filterUrl=BATHING" style="col-6 col-lg-3">
                  <img src="/svg/bathing.svg" onClick={() => setOpen(false)} />
                  <span>BATHING</span>
                </Link>
                <Link href="/products?filterUrl=DESIGNplus" style="col-6 col-lg-3">
                  <img src="/svg/design.svg" onClick={() => setOpen(false)} />
                  <span>DESIGN+</span>
                </Link>
              </div>
              <div>
                <Link href="/products?filterUrl=WASHING" style="col-6 col-lg-3">
                  <img src="/svg/washing.svg" onClick={() => setOpen(false)} />
                  <span>WASHING</span>
                </Link>
                <Link href="/products?filterUrl=ACCESORIES" style="col-6 col-lg-3">
                  <img src="/svg/accessories.svg" onClick={() => setOpen(false)} />
                  <span>ACCESORIES</span>
                </Link>
              </div>
            </div>
            <div className="links-container">
              <Link href="/about-us" style="col-6 col-lg-12 links">
                <span>ABOUT GALLARIA</span>
              </Link>
              <Link href="/projects" style="col-6 col-lg-12 links">
                <span>PROJECTS</span>
              </Link>
              <Link href="/showrooms" style="col-6 col-lg-12 links">
                <span>SHOWROOMS</span>
              </Link>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault()
                  setOpen(false)
                  setContactOpen(true)
                }}
                className="col-6 col-lg-12 links"
              >
                <span>CONTACT US</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
