import formatApi, { handleFun } from '../../../utils/formatApi'
import formatMethod from '../../../utils/formatMethod'
import sql from '../../../utils/sql'
import logger from '../../../utils/log'
import formatRes from '../../../utils/formatRes'

const handleUser: handleFun = (urlList, req, res) => {
    if (urlList.length === 0) {
        const { method } = req
        formatMethod(method, res, {
            GET: () => {
                sql('select * from user', (err: any, val: any) => {
                    logger.info(err)
                    logger.info(val)
                    res.end(formatRes(200, val))
                })
            }
        })
    } else {
        formatApi(urlList, req, res, {})
    }
}

export default handleUser
