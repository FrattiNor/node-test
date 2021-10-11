import formatApi, { handleFun } from '../../../utils/formatApi'
import formatMethod from '../../../utils/formatMethod'
import sql from '../../../utils/sql'
import formatRes from '../../../utils/formatRes'
import getBody from '../../../utils/getBody'

const handleBook: handleFun = (urlList, req, res) => {
    if (urlList.length === 0) {
        const { method, url = '' } = req

        formatMethod(method, res, {
            PUT: () => {
                getBody(req).then((body) => {
                    const { name, count } = body

                    sql(`insert into book (name,count) value ("${name}","${count}")`)
                        .then(() => {
                            res.end(formatRes(200, { info: '添加成功' }))
                        })
                        .catch(() => {
                            res.end(formatRes(200, { error: '添加失败' }))
                        })
                })
            },
            DELETE: () => {
                const urlParse = new URL(url, `http://anyhost`)
                const { search } = urlParse
                const theDeleteId = new URLSearchParams(search).get('id')
                if (theDeleteId) {
                    sql(`delete from book where id=${theDeleteId}`)
                        .then(() => {
                            res.end(formatRes(200, { info: '删除成功' }))
                        })
                        .catch(() => {
                            res.end(formatRes(200, { error: '删除失败' }))
                        })
                } else {
                    res.end(formatRes(200, { error: '没有ID' }))
                }
            },
            POST: () => {
                getBody(req).then((body) => {
                    const { name, count, id } = body

                    if (id) {
                        sql(`update book set name="${name}",count="${count}" where id="${id}"`)
                            .then(() => {
                                res.writeHead(200, { 'Content-Type': 'application/json' })
                                res.end(formatRes(200, { info: '修改成功' }))
                            })
                            .catch(() => {
                                res.end(formatRes(200, { error: '修改失败' }))
                            })
                    } else {
                        res.end(formatRes(200, { error: '没有ID' }))
                    }
                })
            },
            GET: () => {
                sql('select * from book')
                    .then((val) => {
                        res.writeHead(200, { 'Content-Type': 'application/json' })
                        res.end(formatRes(200, val))
                    })
                    .catch(() => {
                        res.end(formatRes(200, { error: '获取失败' }))
                    })
            }
        })
    } else {
        formatApi(urlList, req, res, {})
    }
}

export default handleBook
