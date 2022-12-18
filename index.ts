const http = require('http')
const app = require('./src/app')

const port = process.env.port
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

module.exports = server