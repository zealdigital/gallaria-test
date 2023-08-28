import axios from 'axios'

axios.defaults.baseURL = '/api'

function request(gql = null, params) {
  const promise = new Promise((resolve, reject) => {
    const perms = {
      url: process.env.NEXT_PUBLIC_SITE_API,
      method: 'post',
      responseType: 'json',
      data: {
        query: gql,
        variables: params
      }
    }

    axios(perms)
      .then(successHandler(resolve, reject))
      .catch(errorHandler(resolve, reject))
  })
  return promise
}

function successHandler(resolve) {
  return (response) => {
    resolve(response)
  }
}

function errorHandler(resolve, reject) {
  return (error) => {
    reject(error.response.data)
  }
}

export default request
