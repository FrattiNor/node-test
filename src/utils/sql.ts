import * as mysql from 'mysql2'
import logger from './log'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'testOKK',
    port: 3306
})

const query = (sql: string, callback: any): void => {
    pool.getConnection((err, connection) => {
        if (err) {
            logger.error(err)
            callback(err)
        } else {
            connection.query(sql, (err, val, fields) => {
                //释放连接
                connection.release()
                //事件驱动回调
                callback(err, val, fields)
            })
        }
    })
}

export default query
