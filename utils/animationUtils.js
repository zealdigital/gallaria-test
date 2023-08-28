const page = () => window.innerHeight - 100

export const showOpacity = (id, classes = '') => {
  const ele = document.getElementById(id)

  if (ele) {
    if (ele.getBoundingClientRect().top < page()) {
      ele.className = classes + ' show-opacity'
    } else {
      ele.className = classes
    }
  }
}

export const showFromY = (id, classes = '') => {
  const ele = document.getElementById(id)

  if (ele) {
    if (ele.getBoundingClientRect().top < page()) {
      ele.className = classes + ' show-from-y'
    } else {
      ele.className = classes
    }
  }
}
