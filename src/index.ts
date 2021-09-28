import logger, { requestLogger } from './utils/log'
import formatRes from './utils/formatRes'
import env from './utils/env'
import handleAPI from './router/api'
import * as http2 from 'http2'
import * as path from 'path'
import * as fs from 'fs'
import * as mime from 'mime-types'

const handleRequest = (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse) => {
    const { url = '/' } = req
    requestLogger.info(url)
    logger.error(url)

    switch (url.match(/^\/(api)/)?.[1]) {
        case 'api':
            handleAPI(req, res)
            break
        default:
            res.writeHead(200, {
                'content-type': `${mime.contentType('json')}`
            })
            res.end(formatRes(200, '接口不存在'))
            break
    }
}

const server = http2.createSecureServer(
    {
        key: fs.readFileSync(path.join(__dirname, '../https/localhost-privkey.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '../https/localhost-cert.pem'))
    },
    handleRequest
)

server.on('close', (info) => {
    console.log('close', info)
    logger.info(info)
})

server.on('error', (err) => {
    console.log('err', err)
    logger.error(err)
})

server.on('connect', (info) => {
    console.log('connect', info)
    logger.info(info)
})

server.listen(env.PORT, () => {
    console.log(`server is running at http://localhost:${env.PORT}`)
})
