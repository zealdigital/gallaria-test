import { useState } from 'react'

const useForm = initialValue => {
  const [values, setValues] = useState(initialValue)

  return {
    values,
    setText: e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      })
    },
    setCheckbox: e => {
      const { checked, name, value } = e.target
      const data = values[name]

      if (checked && !(data.includes(value))) {
        data.push(value)
      } else if (!checked && data.includes(value)) {
        data.splice(data.indexOf(value), 1)
      }
      setValues({
        ...values,
        [name]: data
      })
    },
    setDate: (value, name) => {
      setValues({
        ...values,
        [name]: value
      })
    },
    addToArray: (value, name) => {
      setValues({
        ...values,
        [name]: value
      })
    },
    setAll: v => {
      setValues({
        ...v
      })
    },
    emptyState: emptyState => {
      setValues(emptyState)
    }
  }
}

const useFormError = initialValue => {
  const [errors, setErrors] = useState(initialValue)

  return {
    errors,
    setError: (name, value) => {
      setErrors({
        ...errors,
        [name]: value
      })
    },
    setErrors: v => {
      setErrors({
        ...v
      })
    },
    emptyState: emptyState => {
      setErrors(emptyState)
    }
  }
}

export {
  useForm,
  useFormError
}
