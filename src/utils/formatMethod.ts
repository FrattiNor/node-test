import * as http2 from 'http2'
import format404 from './format404'

type option = {
    [key: string]: () => void
}
type fun = (method: string, res: http2.Http2ServerResponse, option: option) => void

const formatMethod: fun = (method, res, option) => {
    const theHandleFun = option[method]
    if (typeof theHandleFun === 'function') {
        theHandleFun()
    } else {
        format404(res)
    }
}

export default formatMethod
