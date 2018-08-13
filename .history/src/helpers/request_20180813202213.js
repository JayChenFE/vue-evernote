import axios from 'axios'

axios.defaults.heraders.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://note-server.hunger-valley.com'

function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    const option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
  })
}
