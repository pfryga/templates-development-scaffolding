let koa = require('koa');
let statics = require('koa-static');
let app = koa();

app.use(statics(__dirname + '/disc'));

app.listen(3000);
