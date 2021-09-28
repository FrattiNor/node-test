const formatRes = (code: number, data: string | JSON): string => {
    return JSON.stringify({
        code,
        data
    })
}

export default formatRes
