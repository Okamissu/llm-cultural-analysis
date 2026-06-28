import { api } from './api'

export function comparePrompts(data) {
  return api('/compare', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
