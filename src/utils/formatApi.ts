import format404 from './format404'
import { resType, reqType } from '../index'
import logger from './log'

export type handleFun = (otherUrlList: string[], req: reqType, res: resType) => void

type option = {
    [key: string]: handleFun
}

type fun = (url: string | string[] | undefined, req: reqType, res: resType, option: option) => void

type innerUrl = string | string[] | undefined
type backRes = { firstStr: string; otherUrlList: string[] }

const getUrlList = (url: string): string[] => {
    const parseUrl = new URL(url, `http://anyhost`)
    const { pathname } = parseUrl

    if (pathname.slice(0, 1) === '/') {
        return pathname.split('/').slice(1)
    } else {
        return pathname.split('/')
    }
}

export const formatUrl = (url: innerUrl): backRes => {
    const urlList = typeof url === 'string' ? getUrlList(url) : [...(url || [])]
    const firstStr = urlList.shift() || ''
    return { firstStr, otherUrlList: urlList }
}

const formatApi: fun = (url, req, res, option) => {
    try {
        const { firstStr, otherUrlList } = formatUrl(url)

        const theHandleFun = option[firstStr]

        if (typeof theHandleFun === 'function') {
            theHandleFun(otherUrlList, req, res)
        } else {
            format404(res)
        }
    } catch (e) {
        logger.error(e)
    }
}

export default formatApi
