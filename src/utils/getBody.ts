import { reqType } from '../index'

type anyObject = {
    [key: string]: string | anyObject
}

const returnObj = (s: string): anyObject => {
    try {
        return JSON.parse(s)
    } catch (e) {
        return {}
    }
}

const getBody = (req: reqType): Promise<anyObject> => {
    return new Promise((res) => {
        let data = ''
        req.on('data', (chunk) => {
            console.log('data:', chunk)
            data += chunk
        })
        req.on('end', () => {
            res(returnObj(data))
        })
    })
}

export default getBody
