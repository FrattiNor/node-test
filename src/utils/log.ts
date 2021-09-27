import { configure, getLogger } from 'log4js'
import * as path from 'path'

configure({
    appenders: { cheese: { type: 'file', filename: path.join(__dirname, '../../log/cheese.log') } }, // 定义日志文件
    categories: { default: { appenders: ['cheese'], level: 'trace' } } // 定义日志级别
})

const logger = getLogger()

export default logger
