const path = require('path')
const {FileUploadError, FileTypeError} = require('../constant/error.type')

class GoodsController {
    /**
     * 上传图片
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     */
    async upload(ctx, next) {
        const {file} = ctx.request.files
        const fileTypes = ['image/webp', 'image/jpg','image/jpeg', 'image/png', 'jpg', 'png']
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
}

module.exports = new GoodsController()