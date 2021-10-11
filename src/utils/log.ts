import { configure, getLogger } from 'log4js'
import * as path from 'path'

configure({
    appenders: {
        default: { type: 'file', filename: path.join(__dirname, '../../log/default.log') },
        request: { type: 'file', filename: path.join(__dirname, '../../log/request.log') }
    }, // 定义日志文件
    categories: { default: { appenders: ['default'], level: 'trace' }, request: { appenders: ['request'], level: 'trace' } } // 定义日志级别
})

const logger = getLogger('default')
// const logger = getLogger('request')

export default logger
