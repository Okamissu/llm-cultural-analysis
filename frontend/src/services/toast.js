import toast from 'react-hot-toast'

export function showSuccess(message) {
  toast.success(message)
}

export function showError(message) {
  toast.error(message)
}

export function showApiError(error, t) {
  const key = `errors.${error?.code ?? 'INTERNAL_SERVER_ERROR'}`

  toast.error(t(key))
}
