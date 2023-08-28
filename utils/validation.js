export const validationRequired = (value) => !value

export const validationSame = (value, compare) => value !== compare

export const validationEmail = (email) => {
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return !re.test(String(email).toLowerCase())
}

export const validationPassword = (pass) => {
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  return !re.test(String(pass))
}

export const filterURLRegex = (match, item) => {
  const format = match.replace('+', '\\+')
  const re = new RegExp(decodeURIComponent(format), 'i')
  return re.test(item)
}

export const filterRegex = (match, item) => {
  const re = new RegExp(match, 'i')
  return re.test(item)
}

export const removeSpace = (str) => {
  return str?.replace(/ /g, '-').replace(/\+/g, 'plus').toLowerCase();
}

export const commaInNumbers = (price) => {
  const internationalNumberFormat = new Intl.NumberFormat('en-au', { style: 'currency', currency: 'AUD' })
  return internationalNumberFormat.format(price)
}
