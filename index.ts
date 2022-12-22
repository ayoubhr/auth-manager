import http from 'http'
import app from './src/app'

const port = process.env.port
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

export default server