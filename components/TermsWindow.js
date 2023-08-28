import { useContext, useEffect, createContext } from 'react'
import { animateScroll as scroll } from 'react-scroll'

export function TermsWindow() {
  const { termsOpen, setTermsOpen, terms, setTerms } = useContext(TermsContext)

  useEffect(() => {
    document.body.style.overflow = termsOpen ? 'hidden' : 'auto'
  }, [termsOpen])

  const scrollToTop = () => {
    scroll.scrollTo(0, {
      containerId: 'terms-window-content',
      duration: 100,
      smooth: true
    })
  }

  return (
    <div
      className={`terms-window ${termsOpen ? 'open' : ''}`}
      onWheel={e => { e.stopPropagation() }}
    >
      <div className="container">
        <div className="terms-window-header">
          <div
            className="terms-window-close"
            onClick={() => {
              scrollToTop()
              setTermsOpen(false)
            }}
          >
            <span>CLOSE</span>
            <img src="/svg/inverted-close.svg" alt="close" />
          </div>
        </div>
        <div className="terms-window-option">
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              setTerms('policy')
            }}
            className={terms === 'policy' ? 'selected' : ''}
          >
            PRIVACY POLICY
          </a>
          {/* <a
            href="#"
            onClick={e => {
              e.preventDefault()
              setTerms('terms')
            }}
            className={terms === 'terms' ? 'selected' : ''}
          >
            TERMS & CONDITIONS
          </a> */}
        </div>
        <div id="terms-window-content" className="terms-window-content">
          {terms === 'policy' && <Policy />}
          {terms === 'terms' && <Terms />}
        </div>
      </div>
    </div>
  )
}

const Policy = () => (
  <>
    <span className="title">PRIVACY POLICY (AS PER 2021)</span>
    <span className="title">About this policy</span>
    <span className="para">
      1.1 The Company, (‘we’ or ‘us’) handle personal information in accordance with the Privacy Act 1988 (Privacy Act) and the Australian Privacy Principles (APPs) set out in the Privacy Act.
    </span>
    <span className="para">
      1.2 The APPs specify how we must collect, use, disclose, ensure the quality of, and secure personal information. They also set out your rights to access and seek correction of your personal information
    </span>
    <span className="title">1.3 Collection of personal information:</span>
    <span className="para tab">
      We only collect personal information where that information is reasonably necessary for, or directly related to:
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;our business activities including sales and marketing.
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;managing employment and personnel matters, particularly in relation to our members, staff and contractors.
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;managing customer enquiries, complaints and privacy requests.
    </span>
    <span className="para tab">
      When you use our website, we send you a temporary cookie that functions as your identification card. A different identification card is sent each time you use the website. While we use cookies to  track your visit to our website, our web servers automatically log the IP/Internet address of your computer, this information does not identify you personally.
    </span>
    <span className="para tab">
      Most browsers are initially set to accept cookies. You can set your browser to accept all cookies, reject all cookies, or notify you when a cookie is sent. Please refer to your computer browser instructions or help screens to learn more about these functions. If you reject all cookies, you may not be able to use our websites.
    </span>
    <span className="title">1.4 The information we collect might include:</span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Information about your identity
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Your address and contact details (e.g. residential or business address, telephone number, email address or fax number)
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Information about your personal circumstances (e.g. age, marital status, family and personal relationships, or your need for an interpreter and the relevant language)
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Information about your education or employment (e.g. educational or professional qualifications, occupation, work history, referee comments or remuneration)
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;information about your business or financial affairs (e.g. bank account details, business interests and financial circumstances and history).
    </span>
    <span className="para">
      &nbsp;&nbsp;&nbsp;
    </span>
    <span className="para tab">
      We might also collect sensitive information about you, including information about:
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Your membership of a trade or professional association, or a trade union
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Any disability or injury you have.
    </span>
    <span className="title">1.5 We only collect sensitive information:</span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;With your consent
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;When it is required or authorised under Australian law, or
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;When it is otherwise permitted under the Privacy Act.
    </span>
    <span className="title">1.6 Use and disclosure of personal information</span>
    <span className="para tab">
      We use and disclose your personal information for the purpose for which it was collected and will only use or disclose it for another purpose where this is permitted under the Privacy Act. In general, we do not use or disclose your personal information for another purpose unless one of the following applies:
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;You have consented
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;You would reasonably expect us to use or disclose the information for that other purpose and it is either related or, in the case of sensitive information, directly related to the purpose for which it was collected
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;It is required or authorised by or under an Australian law or a court/tribunal order
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;It is necessary to lessen or prevent a serious threat to somebody’s life, health or safety, or to public safety
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;It is reasonably necessary for an enforcement related activity conducted by, or on behalf of, an enforcement body (e.g. the Australian Federal Police or other such Authority), or
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;We have reason to suspect that unlawful activity, or misconduct of a serious nature, which relates to our functions or activities has been, is or may be, engaged in, and we believe that the use or disclosure is necessary in order to take appropriate
    </span>
    <span className="title">1.7 Storage and security of personal information</span>
    <span className="para tab">
      Most personal information is stored by the Company electronically with some information also stored on paper files.
    </span>
    <span className="para" />
    <span className="para tab">
      We take steps to protect your personal information from misuse, interference and loss and from unauthorised access, modification or disclosure.
    </span>
    <span className="para tab">
      These steps include:
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Security measures, including authentication requirements for accessing our electronic systems and keeping audit log of systems access by users.
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Physical security measures, including restricting physical access to our offices and secure storage for information held on site with access to classified material limited to specific the Company personnel who have the required level of clearance.
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Secure storage for information held offsite.
    </span>
    <span className="para tab">
      •&nbsp;&nbsp;&nbsp;&nbsp;Procedures and training for dealing with suspected data breaches.
    </span>
    <span className="title">1.8 Complaints</span>
    <span className="para tab">
      This policy outlines the Company’s personal information handling practices, including how to make a complaint about the way we have handled your information.
    </span>
    <span className="title">1.9 Disclaimer</span>
    <span className="para tab">
      Given  that the data is collected via the internet, the Company will not be held liable for any data obtained as a result of any hacking or security breach.
    </span>
  </>
)

const Terms = () => (
  <>
    <span className="title">TERMS & CONDITIONS (AS PER 2021)</span>
    <span className="title">1. Definitions and Interpretations</span>
    <span className="para">
      [Business Name] means [Registered Name] Pty Ltd ACN [11-digit code] and any related bodies corporate, as defined in the Corporations Act 2001 (Cth), including, but not limited to, [list related bodies corporate] and any of their subsidiaries.
    </span>
    <span className="para">
      [Business Name’s Premises] means any location from which [Business Name] conducts business.
    </span>
    <span className="para">
      Goods means the items identified in the Purchase Order and/or Quote and finalized and confirmed in the Order Confirmation issued by [Business Name].
    </span>
    <span className="para">
      GST has the meaning set out in A New Tax System (Goods and Services Tax) Act 1999 (Cth).
    </span>
    <span className="para">
      Order Confirmation means the confirmation of the good ordered issued by [Business Name] to the Purchaser, ordinarily following the placing of a Purchase Order.
    </span>
    <span className="para">
      PPSA means the Personal Property Securities Act 2009 (Cth). Terms used in this document with reference to the PPSA has the same meaning set out in Part 1.3 of the PPSA.
    </span>
    <span className="para">
      PPSR means the Personal Property Securities Register established under the PPSA.
    </span>
    <span className="para">
      Purchaser means the person or entity that placed the Purchase Order and, if placed for and on behalf of a corporation, any director of that corporation as personal guarantor.
    </span>
    <span className="para">
      Purchase Order means the order for goods placed with [Business Name] by or on behalf of the Purchaser, usually following receipt of the Quote and acceptance in any of the other ways set out in clause 2 is also deemed to constitute the placing of a Purchase Order
    </span>
    <span className="para">
      Quote means the written or electronic quote for goods provided to the Purchaser by [Business Name].
    </span>
    <span className="title">2. Offer and Acceptance</span>
    <span className="para">
      The Purchaser accepts the Quote and/or the Order Confirmation by returning to [Business Name]:
    </span>
    <span className="para tab">
      a. a signed copy of the Quote, or
    </span>
    <span className="para tab">
      b. a copy of the Purchase Order after receipt of the Quote, or
    </span>
    <span className="para tab">
      c. a signed copy of the Order Confirmation, or
    </span>
    <span className="para tab">
      d. by other written or electronic acceptance, or
    </span>
    <span className="para tab">
      e. by paying the required [xx%] deposit following receipt from [Business Name] of the Order Confirmation.
    </span>
    <span className="title">3. Acceptance of Terms and Conditions</span>
    <span className="para">
      The Purchaser agrees that these terms and conditions apply to the contract for the sale and the purchase of the Goods, and form part of the contract by accepting the Quote and/or the Order Confirmation in accordance with the clause 2 or by submitting a [Business Name] Credit Application in the prescribed form for the Goods.
    </span>
    <span className="title">4. Quotations and Pricing</span>
    <span className="para tab">
      a. The Quote, Purchase Order or Order Confirmation are [exclusive/inclusive] of GST and [exclusive/inclusive] of any delivery charges, unless specified to the contrary by [Business Name] in writing.
    </span>
    <span className="para tab">
      b. All quotations may be subject to withdrawal or variation [xx days/any time] prior to acceptance by the Purchaser in accordance with clause 2.
    </span>
    <span className="para tab">
      c. All quotations will remain valid for a period of thirty [xx] days unless stated otherwise by [Business Name] in writing. All quotations shall lapse after the period of thirty (xx) days unless otherwise stated by [Business Name] in writing.
    </span>
    <span className="para tab">
      d. Notwithstanding clause 4c, [Business Name] reserves the right to alter prices without prior notice to the Purchaser [xx days/at any time] prior to acceptance of a Quote.
    </span>
    <span className="title">3. Acceptance of Terms and Conditions</span>
    <span className="para">
      The Purchaser agrees that these terms and conditions apply to the contract for the sale and the purchase of the Goods, and form part of the contract by accepting the Quote and/or the Order Confirmation in accordance with the clause 2 or by submitting a [Business Name] Credit Application in the prescribed form for the Goods.
    </span>
    <span className="title">5. Payment</span>
    <span className="para tab">
      a. Subject to clauses 5b, 5c, 5d and 5e, the Purchaser shall pay [Business Name] a [xx]% deposit for the Goods upon placing the Purchase Order and the balance immediately prior to delivery.
    </span>
    <span className="para tab">
      b. If the Purchase Order is for $[xxxx] or less, payment for the Goods is to be made in full upon placing the Purchase Order. [Business Name] is not obliged to place any order with its suppliers until the deposit is received in full but may choose to do so.
    </span>
    <span className="para tab">
      c. All deposits, or payments made prior to the delivery of the Goods [are/are not] refundable, unless [Business Name] has explicitly agreed to [refund/not refund] in writing.
    </span>
    <span className="para tab">
      d. If the Goods need to be ordered from overseas, payment of the balance owing is due upon arrival of the Goods into the [Business Name] warehouse.
    </span>
    <span className="para tab">
      e. [Business Name] shall be entitled to part payment in respect of each delivery if delivery of the Goods is effected by part deliveries.
    </span>
    <span className="para tab">
      f. If [Business Name] provides credit to the Purchaser, payment terms are strictly [xx] days from the earlier of the date of delivery, the date of installation, or the date on any progress claim submitted by [Business Name].
    </span>
    <span className="para tab">
      g. If payment is not made strictly in accordance with the agreed terms, interest at the rate of [xx]% per annum above the overdraft rate of [Business Name]’s principal bank, calculated on a daily basis, will be charged on any amount outstanding from the date of the invoice to the date of payment.
    </span>
    <span className="para tab">
      h. The Purchaser acknowledges and agrees that the interest charged in clause 5g above is a genuine pre-estimate of [Business Name] loss due to untimely payments or non-payment and shall not be in anyway construed as a penalty.
    </span>
    <span className="para tab">
      i. If delivery, installation or any payment due is delayed through fault of the Purchaser, [Business Name] reserves the right to charge to the account of the Purchaser, in addition to Interest, for any extra costs incurred including storage and associated costs on a full indemnity basis.
    </span>
    <span className="para tab">
      j. If Goods are not collected by the Purchaser [xx] days after arrival into the [Business Name] warehouse if ordered in from overseas, or [xx] days after the date of placing the Purchase Order in all other cases, then the Purchaser agrees to pay a storage fee of $[xx] per calendar week per pallet, case or bundle, unless otherwise agreed in writing by [Business Name] prior to or on issue of the Order Confirmation.
    </span>
    <span className="para tab">
      k. Delivery dates given to the Purchaser are estimates and no liability is accepted for delay from any cause on the part of [Business Name].
    </span>
    <span className="title">6. Delivery and Risk</span>
    <span className="para tab">
      a. [Business Name] shall not be liable to the Purchaser or any third party for any loss arising from any delay in deliveries. The Purchaser hereby expressly releases [Business Name] from any claim, action or liability whatsoever arising from any delay in the delivery of Goods including but not limited to delay in manufacture, shipping delays, strikes and machinery breakdown.
    </span>
    <span className="para tab">
      b. Any quotation for the provision of goods &quot;ex-stock&quot; is subject to [Business Name] fulfilling orders held by [Business Name] from other purchasers predating the Purchaser placing the Purchase Order.
    </span>
    <span className="para tab">
      c. The Seller reserves the right to over-supply or under-supply any order within reasonable limits.  The Buyer will pay for any such over-supply at the unit price for the delivered goods.
    </span>
    <span className="para tab">
      d. Delivery shall be deemed to occur at the time the Goods leave [Business Name]&apos; premises, from which time the Goods shall be at the Purchaser&apos;s risk and the Purchaser herby releases [Business Name] from any liability relating to loss, deterioration or damage during transit.
    </span>
    <span className="para tab">
      e. The Purchaser is deemed to have accepted the Goods at the time of dispatch from [Business Name] premises.
    </span>
    <span className="para tab">
      f. The Purchaser shall be liable for all cartage costs unless otherwise agreed by [Business Name] in writing.
    </span>
    <span className="title">7. Force Majeure</span>
    <span className="para">
      If delivery or any other term of the agreement regarding the Goods is unable to be fulfilled by [Business Name] due to causes beyond [Business Name]’s control, including but not limited to any acts of God, strike, natural disaster, lock out, industrial dispute, fire, delay in obtaining licences, transport, or accidents, [Business Name] is entitled to extend the period of delivery or to terminate the contract. The purchaser shall not have any claim for damages in the event of force majeure and shall be responsible for paying for the deliveries made.
    </span>
    <span className="title">8. Retention of Title</span>
    <span className="para tab">
      a. Ownership in any Goods ordered or delivered shall not pass to the Purchaser until the balance of the Purchase Order is paid, including the discharge of all debts to [Business Name] on any account whatsoever.
    </span>
    <span className="para tab">
      b. Receipt by [Business Name] of any bill of exchange, promissory note or cheque shall not be deemed to be payment until the same has been honoured and/or cleared.
    </span>
    <span className="para tab">
      c. In the event that Goods delivered by [Business Name] have not been paid for in full then the Purchaser agrees to keep the Goods as trustee for [Business Name] and to store or otherwise hold the Goods in a safe place, in their original condition, and in a manner that clearly shows ownership by [Business Name] until payment in full is received by [Business Name].
    </span>
    <span className="para tab">
      d. If the Purchaser has not paid for the Goods in full but sells or otherwise disposes of them, or any part of them, the monies received in respect of the disposal of the Goods will be held on trust by the Purchaser for [Business Name] and will be payable immediately by the Purchaser to [Business Name]. The delivery of Goods by [Business Name] which have not been paid for by the Purchaser shall not constitute a waiver or any rights of [Business Name] contained in these terms and conditions.
    </span>
    <span className="para tab">
      e.The Purchaser hereby grants to [Business Name] its servants and agents the irrevocable right and license to enter premises where the Goods are located and remove any Goods that are the property of [Business Name] and have not been paid for, without prior notice and also without incurring any liability to the Purchaser. [Business Name] shall have the right to sell or dispose of any such Goods removed and shall not be responsible for any loss occasioned thereby.
    </span>
    <span className="para tab">
      f. To the extent permitted by law, the parties agree that:
    </span>
    <span className="para tabDouble">
      i. these terms and conditions create a Security Interest in favour of [Business Name] for the purpose of the PPSA; and
    </span>
    <span className="para tabDouble">
      ii. [Business Name] may in its absolute discretion register its Security Interest in the Goods as a Purchase Money Security Interest or on an &quot;indefinite basis&quot; on the PPSR.
    </span>
    <span className="para tab">
      g. The Purchaser agrees at its own cost, and within 48 hours of being requested by [Business Name], to execute all documents required by [Business Name] to protect its Security Interest and ensure that it has the priority required by it including but not limited to [Business Name]:
    </span>
    <span className="para tabDouble">
      i. registering, maintaining or updating its Security Interest on the PPSR;
    </span>
    <span className="para tabDouble">
      ii. giving written notification in connection with its Security Interest; and/or
    </span>
    <span className="para tabDouble">
      iii. exercising its rights in connection with its Security Interest.
    </span>
    <span className="para tab">
      h. In the event that the Purchaser fails to comply with clause 7f, the Purchaser appoints [Business Name] its irrevocable attorney to execute all such documents as contemplated herein to give full effect to this clause.
    </span>
    <span className="para tab">
      i. The Purchaser agrees that, to the extent the law permits, [Business Name] need not comply with: sections 95, 118, 121(4), 125, 130, 132(3)(d), 132(4) and137(3) of the PPSA and sections 142 and 143 of the PPSA are excluded, and in this regard the Purchaser expressly waives its rights to receive from [Business Name] any notice required under those or any other provisions of the PPSA.
    </span>
    <span className="para tab">
      j. Where [Business Name] has rights in addition to or existing separately from those contained in Chapter 4 of the PPSA, those rights will continue to apply and are not limited or adversely affected by any right provided by this clause or by law.
    </span>
    <span className="para tab">
      k. The Purchaser agrees to indemnify and keep [Business Name] indemnified in relation to all costs, expenses (including legal costs and expenses on a full indemnity basis), damages, losses, claims and actions that [Business Name] may incur or sustain as a result of the Purchaser&apos;s direct or indirect breach of this clause 7.
    </span>
    <span className="para tab">
      l. If [Business Name] receives any notice in relation to the Purchaser under section 164 of the PPSA, all outstanding amounts may, at the discretion of [Business Name], become immediately due and payable.
    </span>
    <span className="title">9. Damage, Claims or Shortfall </span>
    <span className="para">
      The Purchaser shall examine the Goods upon delivery and give notice in writing to [Business Name] of any short deliveries, damage, errors or any other matter of concern which may entitle the Purchaser to reject the Goods within [xx] business days of delivery, which the parties agree to be a reasonable period given the nature of the Goods. To the extent permitted by law, in the event that the Purchaser fails to give such notice to [Business Name] and in any event upon installation, the Goods delivered shall be deemed to have been accepted by the Purchaser in good order and condition. Nothing in this clause 8 entitles the Purchaser for any reason to reject Goods comprising natural stone or ceramic slabs and such Goods are sold and purchased strictly on a no return basis.
    </span>
    <span className="title">10. Return of Goods</span>
    <span className="para">
      [Business Name] will not accept the return of Goods unless clause 9 applies, or it has agreed to do so in writing, and provided that:
    </span>
    <span className="para tab">
      a. the Goods are returned in their original packing and in the same condition as at the date of delivery;
    </span>
    <span className="para tab">
      b. any freight for Goods returned is pre-paid by the Purchaser; and
    </span>
    <span className="para tab">
      c. unless clause 9 applies, pre-payment by the Purchaser is made of a restocking fee of [xx]% of the purchase price of any Goods returned.
    </span>
    <span className="title">11. Advice</span>
    <span className="para tab">
      a. Any advice, recommendation, information, assistance or service provided by [Business Name] in relation to Goods sold or their use or application is provided in good faith but [Business Name] does not warrant the accuracy or veracity of such advice. The Purchaser acknowledges that it has not relied on any representation, advice, recommendation or information provided by [Business Name] in relation to the Goods and has satisfied itself with respect to all matters of and incidental to the Goods and, subject to clause 11b below, shall not hold [Business Name] liable for any representation made with respect to the Goods supplied.
    </span>
    <span className="para tab">
      b. The Purchaser acknowledges that prior to accepting the Quote and/or the Order Confirmation (as applicable) in the manner set out in clause 2 above, it has had the opportunity to obtain independent legal advice with respect to these terms and conditions and otherwise fully understands these terms and conditions
    </span>
    <span className="title">12. Limitation and Exclusion of Liability/Warranty</span>
    <span className="para tab">
      a. Goods supplied by [Business Name] are guaranteed to be free from defects in materials and workmanship in accordance with the manufacturers warranty.
    </span>
    <span className="para tab">
      b. Except as prescribed by legislation or separately warranted in writing by [Business Name] in respect of any particular product and for the purpose of reliance by the Purchaser, [Business Name] shall not be liable to the Purchaser for any loss of any nature in relation to the supply by [Business Name] of any goods or services.
    </span>
    <span className="para tab">
      c. In any event, any liability by [Business Name] is limited to a refund of the purchase price. The Purchaser is not entitled to a replacement of the Goods from [Business Name] under this warranty.
    </span>
    <span className="para tab">
      d. All implied conditions and warranties are expressly excluded to the extent that they may be lawfully excluded.
    </span>
    <span className="para tab">
      e. [Business Name] retains ownership of any rejected or defective parts in the Goods and shall dispose of it as they see fit.
    </span>
    <span className="para tab">
      f. [Business Name] shall not be liable for variations in quality in the Goods such as texture or tonality due to the natural quality of the Goods and/or manufacturing processes or for visual defects which cannot be easily seen with the naked eye from a distance of one metre.
    </span>
    <span className="para tab">
      g. [Business Name] shall not be liable for changes in the Goods over time including colour due to its natural quality.
    </span>
    <span className="para tab">
      h. Any warranty applying to the Goods shall only apply within the Commonwealth of Australia and to the original Purchaser to whom the Goods were first sold and excludes second hand and used goods.
    </span>
    <span className="title">13. General</span>
    <span className="para tab">
      a. All prior negotiations, understandings, representations, warranties or commitments in relation to the subject matter of these terms and conditions are superseded by them. To the extent of any inconsistency between these terms and conditions and the terms in any Purchase Order or other documentation between the Parties, these terms and conditions prevail, subject to any express waiver by [Business Name].
    </span>
    <span className="para tab">
      b. These terms and conditions may only be varied, modified or amended by another document in writing executed by all parties. The amendments shall apply to all future dealings between [Business Name] and the Purchaser.
    </span>
    <span className="para tab">
      c. A waiver by [Business Name] of any of these terms and conditions must be in writing and signed by [Business Name].
    </span>
    <span className="para tab">
      d. None of these terms and conditions will merge on acceptance of the Quote or the Order Confirmation or signature of any other document or any other act, matter or thing and will continue to remain in full force and effect for so long as is necessary to give effect to them.
    </span>
    <span className="para tab">
      e. Any term which is wholly or partially void or unenforceable may be severed to the extent it is void or unenforceable. The validity or enforceability of the remainder of the terms and conditions is not affected.
    </span>
    <span className="para tab">
      f. These terms and conditions are governed by, and construed in accordance with, the laws of New South Wales and the parties hereby irrevocably and unconditionally submit to the non-exclusive jurisdiction of the Courts of New South Wales and any courts which have jurisdiction to hear appeals from any of these courts.
    </span>
    <span className="para tab">
      g. If the Purchaser breaches or fails to comply with any of these terms and conditions, and [Business Name] incurs any cost as a consequence of or in seeking to remedy the same, the Purchaser must reimburse [Business Name] for that cost including, but not limited to, any actual legal costs incurred on a full indemnity basis.
    </span>
  </>
)

export const TermsContext = createContext()
