function NumberInput({ input, setValue }) {
  const onChange = e => {
    const { value } = e.target

    const re = /^[1-9\b]+$/
    if (value === '') {
      setValue(1)
      return
    }

    if (re.test(value) || value > 0) {
      setValue(Math.floor(value))
    }
  }

  const deduct = () => {
    if (input > 1) setValue(input - 1)
  }

  return (
    <div className="number-input">
      <div className="minus" onClick={deduct}>-</div>
      <input value={input} onChange={onChange} />
      <div className="plus" onClick={() => setValue(input + 1)}>+</div>
    </div>
  )
}

export default NumberInput
