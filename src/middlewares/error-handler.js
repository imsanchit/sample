const Sequelize = require('sequelize');

module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof Sequelize.Error) {
            ctx.status = 500;
            ctx.body = {
              message: 'An Unexpected Error Occurred',
              code: err.status
            };
        } else {
            ctx.status = Number.isInteger(err.status) ? err.status : 500;
            ctx.body = {
              message: err.message,
              details: err.details,
              code: err.code
            };
        }
        // ctx.app.emit('error', err, ctx)
    }
}