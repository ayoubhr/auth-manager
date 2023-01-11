import http from 'http'
import { App } from './src/app.js'

const port = process.env.PORT
export const server = http.createServer(App)

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
})