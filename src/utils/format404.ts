import formatRes from './formatRes'
import * as mime from 'mime-types'
import { resType } from '../index'

const format404 = (res: resType): void => {
    res.writeHead(200, {
        'content-type': `${mime.contentType('json')}`
    })
    res.end(formatRes(404, '接口不存在'))
}

export default format404
