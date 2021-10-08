import { requestLogger } from './utils/log'
import formatApi from './utils/formatApi'
import env from './utils/env'
import handleAPI from './router/api'
import * as http2 from 'http2'
import * as path from 'path'
import * as fs from 'fs'

const handleRequest = (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse) => {
    const { url } = req
    requestLogger.info(url)

    formatApi(url, req, res, {
        api: handleAPI
    })
}

const server = http2.createSecureServer(
    {
        key: fs.readFileSync(path.join(__dirname, '../https/localhost-privkey.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '../https/localhost-cert.pem'))
    },
    handleRequest
)

server.listen(env.PORT, () => {
    console.log(`server is running at http://localhost:${env.PORT}`)
})
