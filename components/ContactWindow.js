import { useContext, useEffect, useRef, useState, createContext } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import request from 'utils/request'
import { mutationSubmitContact } from 'utils/graphql'
import { SnackbarContext } from './Snackbar'

export function ContactWindow() {
  const formRef = useRef()
  const [submit, setSubmit] = useState(false)
  const { contactOpen, setContactOpen } = useContext(ContactContext)
  const { setSnackbarState } = useContext(SnackbarContext)

  useEffect(() => {
    document.body.style.overflow = contactOpen ? 'hidden' : 'auto'
  }, [contactOpen])

  const scrollToTop = () => {
    scroll.scrollTo(0, {
      containerId: 'contact-window',
      duration: 1400,
      smooth: true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmit(true)

    const grecaptcha = await window.grecaptcha

    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY, { action: 'submit' })
      const leadInput = {
        name: formRef.current[0].value,
        email: formRef.current[1].value,
        phone: formRef.current[2].value,
        company: formRef.current[3].value,
        message: formRef.current[4].value,
        token
      }

      try {
        const response = await request(mutationSubmitContact, { leadInput })
        const reply = response.data.data.submitContact
        setSnackbarState({
          open: true,
          message: reply,
        })
        formRef.current.reset()
        setSubmit(false)
        setContactOpen(false)
      } catch (err) {
        setSnackbarState({
          open: true,
          message: err
        })
      }
    })
  }

  return (
    <div
      id="contact-window"
      className={`contact-window ${contactOpen ? 'open' : ''}`}
      onWheel={e => { e.stopPropagation() }}
    >
      <div className="container">
        <div className="contact-window-header">
          <div className="contact-window-title">CONTACT US</div>
          <div
            className="contact-window-close"
            onClick={() => {
              formRef.current.reset()
              setContactOpen(false)
            }}
          >
            <span>CLOSE</span>
            <img src="/svg/inverted-close.svg" alt="close" />
          </div>
        </div>
        <div className="contact-window-content row">
          <div className="col-lg-6">
            <img src="/images/contact-us.png" alt="contact-us" />
            <div className="contact-window-content-title">CONTACT US</div>
            <div className="row contact-window-contacts">
              <div className="col-6">
                <div className="image">
                  <img src="/svg/inverted-phone.svg" alt="phone" />
                </div>
                <div className="type">
                  Phone
                </div>
                <div className="value">
                  (02) 8985 2619 /<br />
                  1300 961 239
                </div>
              </div>
              <div className="col-6">
                <div className="image">
                  <img src="/svg/inverted-email.svg" alt="email" />
                </div>
                <div className="type">
                  Email
                </div>
                <div className="value">
                  INFO@GALLARIA.COM.AU
                </div>
              </div>
              <div className="col-6">
                <div className="image">
                  <img src="/svg/inverted-location.svg" alt="location" />
                </div>
                <div className="type">
                  Head Office
                </div>
                <div className="value" style={{ marginBottom: '28px' }}>
                  27 Helles Avenue,<br />Moorebank,NSW 2170
                </div>
                <div className="type">
                  Sydney Showroom
                </div>
                <div className="value">
                  1F Danks Street,<br />
                  Waterloo NSW 2017<br />
                  +61 02 8985 2666
                </div>
              </div>
              <div className="col-6">
                <div className="image">
                  <img src="/svg/inverted-opening.svg" alt="opening" />
                </div>
                <div className="type">
                  Working Hour
                </div>
                <div className="value">
                  MONDAY TO FRIDAY<br />
                  8:30AM - 4:30PM
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="enquiry-title">
              <span>ENQUIRY FORM</span>
            </div>
            <form ref={formRef} onSubmit={handleSubmit}>
              <input required name="name" placeholder="NAME*" />
              <input required name="email" placeholder="EMAIL ADDRESS*" pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />
              <input required name="phone" placeholder="MOBILE NUMBER*" pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$" />
              <input name="company" placeholder="COMPANY'S NAME" />
              <textarea
                required
                name="message"
                placeholder="LEAVE US A MESSAGE*"
                rows={8}
              />
              <div className="button-container">
                {!submit && (
                  <button type="submit" className="button-contained white">
                    SEND
                  </button>
                )}
                {submit && (
                  <div className="sent">
                    SENT
                  </div>
                )}
              </div>
            </form>
            <div className="arrow-container" onClick={scrollToTop}>
              <img src="/svg/inverted-up.svg" alt="email" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ContactContext = createContext()
