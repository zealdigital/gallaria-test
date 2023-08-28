import { useEffect, useContext, createContext } from 'react'

export function SnackbarComponent() {
  const { snackbarState, setSnackbarState } = useContext(SnackbarContext)

  useEffect(() => {
    if (snackbarState.open) {
      setTimeout(() => {
        setSnackbarState({
          open: false,
          message: '',
        })
      }, 3000)
    }
  }, [snackbarState])

  return (
    <div id="snackbar" className={snackbarState.open ? 'open' : ''}>
      {snackbarState.message}
    </div>
  )
}

export const SnackbarContext = createContext()
