const Koa = require('koa')

const router = require("koa-router")() // require("koa-router")返回的是函数

const bodyParser = require("koa-bodyparser")

const app = new Koa()

app.use(bodyParser()) // bodyParser必须在router之前被注册到app对象上

app.use(async (ctx, next) =>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
})

router.get('/hello/:name', async (ctx, next) =>{ // 使用router.get('/path', async fn)来注册一个GET请求
    var name = ctx.params.name; // 可以在请求路径中使用带变量的/hello/:name，变量可以通过ctx.params.name访问
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
})

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index<h1>'
})

router.get('/', async (ctx, next) =>{
    ctx.response.body =`<h1>Index</h1>
    <form action="signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`
})

router.post('/signin', async (ctx, next) =>{
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name ${name}, password: ${password}`);
    if(name === 'koa' && password === '12345'){
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`
    }else{
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
})

app.use(router.routes())

// app.use的顺序就是middleware的执行顺序，如果middleware中没有await next，那么后续的middleware将都不会执行
app.listen(3000);
console.log('app started at port 3000...')