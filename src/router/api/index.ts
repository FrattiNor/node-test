import formatApi, { handleFun } from '../../utils/formatApi'
import handleBook from './book'
import handleUser from './user'

const handleAPI: handleFun = (urlList, req, res) => {
    formatApi(urlList, req, res, {
        book: handleBook,
        user: handleUser
    })
}

export default handleAPI
