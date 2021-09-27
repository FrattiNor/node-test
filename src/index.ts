import logger from './utils/log'
import * as http from 'http'
import * as path from 'path'
import * as fs from 'fs'
import * as mime from 'mime-types'
import env from './utils/env'

const server = http.createServer((req, res) => {
    const { url = '/' } = req
    const filePath = path.join(path.join(__dirname, '../'), url)

    logger.info(filePath)

    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf-8'
            })
            res.end('文件不存在！')
        } else {
            res.writeHead(200, {
                'content-type': mime.contentType(path.extname(url)) as string
            })
            fs.createReadStream(filePath).pipe(res)
        }
    })
})

server.listen(env.PORT, () => {
    console.log(`server is running at http://localhost:${env.PORT}`)
})
