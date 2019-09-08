const Koa = require('koa');

const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const Router = require('koa-router');
const logger = require('koa-logger');

const config = require('config');

const { version } = require('../package.json');

const errorHandler = require('./middlewares/error-handler')

const fileUploadRouter = require('./routes/file-upload')

const app = new Koa();
app
  .use(cors({
    ...config.get('cors')
  }))
  .use(bodyParser())
  .use(errorHandler)

app.on('error', async (err, ctx) => {
    if (!err.status || err.status === 500) {
        console.error(err);
    }
    if (ctx.state.transaction) {
        await ctx.state.transaction.rollback();
    }
});

app.on('error', (error) => {
  if (error.name !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = { version };
});

router.use(logger());
router.use('/upload-file', fileUploadRouter.routes());

app.use(router.routes());
app.use(router.allowedMethods());
app.router = router;
  
module.exports = app;