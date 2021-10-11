import * as mysql from 'mysql2'
import logger from './log'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'testOKK',
    port: 3306
})

const query = (sql: string): Promise<any> => {
    return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
            if (err) {
                logger.error(err)
                rej(err)
            } else {
                connection.query(sql, (err, val) => {
                    //释放连接
                    connection.release()

                    if (err) {
                        logger.error(err)
                        rej(err)
                    } else {
                        res(val)
                    }
                })
            }
        })
    })
}

export { pool }
export default query
