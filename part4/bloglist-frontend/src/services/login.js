import axios from 'axios'
const baseUrl = 'api/login'

const login = async credencials => {
  const response = await axios.post(baseUrl, credencials)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }
