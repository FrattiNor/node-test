import { requestLogger } from './utils/log'
import { pool } from './utils/sql'
import formatApi from './utils/formatApi'
import logger from './utils/log'
import env from './utils/env'
import handleAPI from './router/api'
import * as http from 'http'
// import * as path from 'path'
// import * as fs from 'fs'

export type reqType = http.IncomingMessage
export type resType = http.ServerResponse

const handleRequest = (req: reqType, res: resType) => {
    const { url } = req
    requestLogger.info(url)

    formatApi(url, req, res, {
        api: handleAPI
    })
}

// const server = http2.createSecureServer(
//     {
//         key: fs.readFileSync(path.join(__dirname, '../https/localhost-privkey.pem')),
//         cert: fs.readFileSync(path.resolve(__dirname, '../https/localhost-cert.pem'))
//     },
//     handleRequest
// )

const server = http.createServer(handleRequest)

server.listen(env.PORT, () => {
    console.log(`server is running at http://localhost:${env.PORT}`)
})

process.on('exit', async () => {
    try {
        await pool.end()
    } catch (e) {
        await logger.error(e)
    }
})
