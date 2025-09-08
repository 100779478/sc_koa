const {
    FileUploadError,
    FileTypeError,
    createGoodsFailed,
    updateGoodsFailed,
    removeGoodsFailed, canNotFoundGoods, canNotFindGoodList
} = require('../constant/error.type')
const {createGoods, updateGoods, removeGoods, restoreGoods, findAllGoods} = require('../service/goods')

class GoodsController {
    /**
     * 上传图片
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async upload(ctx, next) {
        const {file} = ctx.request.files
        const fileTypes = ['image/webp', 'image/jpg', 'image/jpeg', 'image/png', 'jpg', 'png']
        if (!fileTypes.includes(file.mimetype)) {
            console.error('不支持的文件格式')
            ctx.app.emit('error', FileTypeError, ctx)
            return
        }
        if (file) {
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    filename: file.newFilename,
                    mimetype: file.mimetype,
                    size: file.size
                }
            };
        } else {
            console.error('商品图片上传失败')
            ctx.app.emit('error', FileUploadError, ctx)
            return
        }
        await next()
    }

    /**
     * 创建商品
     * @param ctx
     * @param next
     * @returns {Promise<boolean>}
     */
    async create(ctx, next) {
        try {
            const {updatedAt, createdAt, ...res} = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '添加商品成功',
                result: res
            }
        } catch (err) {
            console.error('商品添加失败', err)
            return ctx.app.emit('error', createGoodsFailed, ctx)
        }
    }

    /**
     * 编辑更新商品信息
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async update(ctx, next) {
        try {
            if (await updateGoods(ctx.params.id, ctx.request.body)) {
                ctx.body = {
                    code: 0,
                    message: '更新商品信息成功',
                    result: {}
                }
            } else {
                console.error('更新商品信息失败')
                ctx.app.emit('error', updateGoodsFailed, ctx)
            }
        } catch (e) {
            console.error('更新商品异常', e)
        }
        await next()
    }

    /**
     * 删除商品
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async remove(ctx, next) {
        try {
            if (await removeGoods(ctx.params.id)) {
                ctx.body = {
                    code: 0,
                    message: '商品删除成功',
                    result: {}
                }
            } else {
                console.error('商品不存在或已删除')
                ctx.app.emit('error', canNotFoundGoods, ctx)
            }
        } catch (e) {
            console.error('删除商品失败')
            ctx.app.emit('error', removeGoodsFailed, ctx)
        }

        await next()
    }

    /**
     * 上架商品
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async restore(ctx, next) {
        const res = await restoreGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '商品上架成功',
                result: {}
            }
        } else {
            ctx.app.emit('error', canNotFoundGoods, ctx)
        }

        await next()
    }

    /**
     * 获取商品列表
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async findAll(ctx, next) {
        const {pageNumber = 1, pageSize = 10} = ctx.request.query
        try {
            const res = await findAllGoods(pageNumber, pageSize)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '商品列表返回成功',
                    result: res
                }
            }
        } catch (err) {
            console.error('获取商品列表失败', err)
            ctx.app.emit('error', canNotFindGoodList, ctx)
        }

        await next()
    }
}

module.exports = new GoodsController()