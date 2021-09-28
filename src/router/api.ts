import * as http2 from 'http2'

const handleAPI = (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse): void => {
    const { url } = req
    console.log(url)
    res.end('66')
}

export default handleAPI
