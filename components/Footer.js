import { useContext } from 'react'
import { ContactContext } from 'components/ContactWindow'
import { TermsContext } from 'components/TermsWindow'
import Link from './Link'

function Footer() {
  const { setContactOpen } = useContext(ContactContext)
  const { setTermsOpen, setTerms } = useContext(TermsContext)

  return (
    <footer>
      <div className="container">
        <div className="footer-left">
          <div className="navigation">
            <Link href="/about-us">
              ABOUT GALLARIA
            </Link>
            <Link href="/products">
              PRODUCTS
            </Link>
            <Link href="/projects">
              PROJECTS
            </Link>
            <Link href="/showrooms">
              SHOWROOMS
            </Link>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setContactOpen(true)
              }}
            >
              <span>CONTACT</span>
            </a>
          </div>
        </div>
        <div className="footer-right">
          <div className="social-container">
            <a target="_blank" href="https://www.instagram.com/gallariaaustralia/" rel="noopener noreferrer">
              <img src="/svg/insta.svg" alt="Instagram" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/company/gallaria-bathware/" rel="noopener noreferrer">
              <img src="/svg/linkedIn.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      <div className="container mobile-break">
        <div className="footer-left">
          <div className="phone-container">
            <p className="contact-text">(02) 8985 2619 / 1300 961 239</p>
          </div>
          <div className="email-container">
            <p className="contact-text">INFO@GALLARIA.COM.AU</p>
          </div>
          <div className="address-container">
            <div className="address-half">
              <div className="address">
                <p>HEAD OFFICE:</p>
                <p>27 HELLES AVENUE,</p>
                <p>MOOREBANK, NSW 2170</p>
              </div>
            </div>
            <div className="address-half">
              <div className="address">
                <p>SYDNEY SHOWROOM:</p>
                <p>1F DANKS STREET,</p>
                <p>WATERLOO, NSW 2017</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <img src="/svg/logo-black.svg" alt="Logo" className="footer-logo" />
          <div className="company">
            <p>©2021 GALLARIA PTY LTD</p>
            <p>ALL COPYRIGHTS RESERVED.</p>
          </div>
          <div className="terms-links">
            <a
              href="/Gallaria_Retail_Warranty_Policy_Ver_2.pdf"
              download="Gallaria_Retail_Warranty_Policy_Ver_2.pdf"
            >
              WARRANTY POLICY
            </a>
            <span>/</span>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setTermsOpen(true)
                setTerms('policy')
              }}
            >
              PRIVACY POLICY
            </a>
            {/* <span>/</span>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setTermsOpen(true)
                setTerms('terms')
              }}
            >
              TERMS & CONDITIONS
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
