import { useContext, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { EnquiryContext } from 'utils/enquiryCookie'
import { SnackbarContext } from 'components/Snackbar'
import request from 'utils/request'
import { mutationSubmitEnquiry } from 'utils/graphql'
import styles from 'styles/modules/Enquiries.module.scss'
import DropdownUnderline from './DropdownUnderline'

const profileOption = [
  'ARCHITECT',
  'BUILDER',
  'INTERIOR DESIGNER',
  'FABRICATOR',
  'DEVELOPER',
  'KITCHEN & BATH STUDIO / RETAIL',
  'PLUMBER',
  'SERVICE PROVIDER',
  'MEDIA',
  'STUDENT',
  'OTHERS'
]

const subjectOption = [
  'GALLARIA GENERAL INFORMATION REQUEST',
  'PRICE ENQUIRY',
  'CUSTOMER CARE',
  'PRODUCT KNOWLEDGE REQUEST',
  'SAMPLE REQUEST',
  'MAKE AN APPOINTMENT',
  'VISIT TO SHOWROOM',
  'OTHERS'
]

function List() {
  const router = useRouter()
  const { enquiryCart, setEnquiryCart, setEnquiryAmount } = useContext(EnquiryContext)
  const formRef = useRef()
  const [profile, setProfile] = useState('')
  const [subject, setSubject] = useState(false)
  const [submit, setSubmit] = useState(false)
  const { setSnackbarState } = useContext(SnackbarContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!profile) {
      setSnackbarState({ open: true, message: 'Please select your profile' })
      return
    }
    if (!subject) {
      setSnackbarState({ open: true, message: 'Please select your subject' })
      return
    }
    setSubmit(true)

    const grecaptcha = await window.grecaptcha

    grecaptcha.ready(async () => {
      const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY, { action: 'submit' })

      const enquiryInput = {
        name: formRef.current[0].value,
        email: formRef.current[1].value,
        phone: formRef.current[2].value,
        company: formRef.current[3].value,
        message: formRef.current[4].value,
        profile,
        subject,
        products: enquiryCart.map(item => ({
          info: item.id,
          quantity: item.quantity,
          variant: item.variant
        })),
        token
      }

      try {
        const response = await request(mutationSubmitEnquiry, { enquiryInput })
        const reply = response.data.data.submitEnquiry
        setSnackbarState({
          open: true,
          message: reply,
        })
        formRef.current.reset()
        setSubmit(false)
        Cookies.remove('enquiries')
        setEnquiryCart([])
        setEnquiryAmount(0)
        router.push('/')
      } catch (err) {
        setSnackbarState({
          open: true,
          message: err
        })
      }
    })
  }

  return (
    <section className={styles['section-form']}>
      <div className="container">
        <div className={styles['form-title']}>
          ENQUIRY FORM
        </div>
      </div>
      <div className="container">
        <form ref={formRef} onSubmit={handleSubmit} className={styles['form']}>
          <div className="row">
            <div className="col-lg-6">
              <input className={styles['input']} required name="name" placeholder="NAME*" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <input className={styles['input']} required name="email" placeholder="EMAIL ADDRESS*" pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />
            </div>
            <div className="col-lg-6">
              <input className={styles['input']} required name="phone" placeholder="MOBILE NUMBER*" pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <DropdownUnderline
                value={profile}
                items={profileOption}
                label="PROFILE*"
                setValue={setProfile}
              />
            </div>
            <div className="col-lg-6">
              <input className={styles['input']} name="company" placeholder="COMPANY'S NAME" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <DropdownUnderline
                value={subject}
                label="SUBJECT*"
                items={subjectOption}
                setValue={setSubject}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <textarea
                required
                name="message"
                className={styles['textarea']}
                placeholder="LEAVE US A MESSAGE*"
                rows={10}
              />
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
                ENQUIRE NOW
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default List
