import { api } from './api'

export function getExperiments() {
  return api('/experiments')
}

export function getExperiment(id) {
  return api(`/experiments/${id}`)
}

export function deleteExperiment(id, password) {
  return api(`/experiments/${id}`, {
    method: 'DELETE',

    body: JSON.stringify({
      password,
    }),
  })
}

export function deleteAllExperiments(password) {
  return api('/experiments', {
    method: 'DELETE',

    body: JSON.stringify({
      password,
    }),
  })
}
