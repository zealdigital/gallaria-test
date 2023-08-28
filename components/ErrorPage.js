import HeadMeta from 'components/HeadMeta'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Link from 'components/Link'

function NotFound() {
  return (
    <div className="error-container">
      <HeadMeta
        title="Page Not Found -  Gallaria"
        keywords="page not found, error 404, 404, error"
        robots="noindex, nofollow"
      />

      <Header />

      <div className="error-content">
        <div className="error-title">
          404
        </div>
        <div className="error-subtitle">
          Page not found
        </div>
        <div className="error-text">
          Sorry, the page you requested is unavailable.
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
