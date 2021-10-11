type anyObject = {
    [key: string]: string | anyObject
}

const formatRes = (code: number, data: string | anyObject): string => {
    return JSON.stringify({
        code,
        data
    })
}

export default formatRes
