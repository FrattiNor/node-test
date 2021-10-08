import formatRes from './formatRes'
import * as http2 from 'http2'
import * as mime from 'mime-types'

const format404 = (res: http2.Http2ServerResponse): void => {
    res.writeHead(200, {
        'content-type': `${mime.contentType('json')}`
    })
    res.end(formatRes(404, '接口不存在'))
}

export default format404
