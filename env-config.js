const prod = process.env.NODE_ENV === 'production'
const local = process.env.NODE_ENV === 'local'

module.exports = {
  'process.env.BACKEND_URL': prod ? 'http://localhost:8081' : 'http://localhost:8081'
}