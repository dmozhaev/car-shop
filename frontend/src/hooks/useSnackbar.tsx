import { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export function useSnackbar() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info')

  const showSnackbar = (msg: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setMessage(msg)
    setSeverity(type)
    setOpen(true)
  }

  const SnackbarComponent = (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={severity} onClose={() => setOpen(false)} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )

  return { showSnackbar, SnackbarComponent }
}
