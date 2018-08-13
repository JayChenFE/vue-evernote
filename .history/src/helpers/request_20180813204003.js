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

    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }

    axios(option).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(err => {
      // console.log(err)
      reject({msg: '网络异常' })
    })

    request('/auth/login', 'POST', { username: 'hunger', password: '123456' }).then(data => {
      console.log(data)
    })
  })
}
