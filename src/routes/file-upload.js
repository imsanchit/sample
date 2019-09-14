const Router = require('koa-router')
const postmark = require("postmark");

const router = new Router()

router
    .post('/', async (ctx, next) => {
        const {
            name,
            email,
            details
        } = ctx.request.body;

        try {
            const client = new postmark.Client("15a1e11a-68fe-40a1-94da-4919a7bd9a78");

            await client.sendEmail({
                "From": "sanchit.mittal@hotcocoasoftware.com",
                "To": email,
                "Subject": `Hello ${name}`,
                "TextBody": details
            });
        } catch (err) {
            ctx.throw(err.statusCode, {
                message: err.message
            });
        }
        ctx.status = 200;
        ctx.body = {
            "response": "mail sent"
        }
    })
    .post('/test', async (ctx, next) => {
        const {
            name
        } = ctx.request.body;
        ctx.status = 200;
        ctx.body = {
            "response": name
        }
    })
    .get('/test', async (ctx, next) => {
        ctx.status = 200;
        ctx.body = {
            "response": "name"
        }
    })
module.exports = router;