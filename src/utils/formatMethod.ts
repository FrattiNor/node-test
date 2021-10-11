import format404 from './format404'
import { resType } from '../index'

type option = {
    [key: string]: () => void
}
type fun = (method: string | undefined, res: resType, option: option) => void

const formatMethod: fun = (method, res, option) => {
    const theHandleFun = option[method || '']
    if (typeof theHandleFun === 'function') {
        theHandleFun()
    } else {
        format404(res)
    }
}

export default formatMethod
