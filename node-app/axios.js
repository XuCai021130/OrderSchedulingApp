const axios = require('axios')

const service = axios.create({
  // baseURL: '/api',
  baseURL: 'http://localhost:3000',
  
  timeout:30000
  
})

export default service
