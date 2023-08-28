import { ErrorPage as NotFound } from 'components'

const Error = () => (
  <NotFound />
)

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null
  if (res) {
    ({ statusCode } = res)
  } else if (err) {
    ({ statusCode } = err)
  }
  return { statusCode }
}

Error.defaultProps = {
  statusCode: null,
}

export default Error
