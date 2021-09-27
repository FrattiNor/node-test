import { configure, getLogger } from 'log4js'
import * as path from 'path'

configure({
    appenders: { cheese: { type: 'file', filename: path.join(__dirname, '../../log/cheese') } },
    categories: { default: { appenders: ['cheese'], level: 'trace' } }
})

const logger = getLogger()

export default logger
