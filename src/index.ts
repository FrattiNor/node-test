import logger from './utils/log'
import * as http from 'http'
import env from './utils/env'

const server = http.createServer((req, res) => {
    logger.info(req)
    res.end('666')
})

server.listen(env.PORT, () => {
    console.log(`server listening at ${env.PORT}`)
})
