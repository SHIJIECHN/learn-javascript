const Koa = require('koa')

const app = new Koa()
// 每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数，
//ctx是由koa传入的封装了request和response的变量，可以通过它访问request和response
//next是koa传入的将要处理的下一个异步函数

// app.use(async (ctx, next) => {
//     console.log(`${ctx.request.method} ${ctx.request.url}`)
//     await next()
// })

app.use(async (ctx, next) =>{
    console.log('第一次调用')
    const start = new Date().getTime()
    await next()
    const ms = new Date().getTime() - start
    console.log(`${ctx.request.method} ${ctx.request.url}`) //ctx.request.url相当于ctx.url
    console.log(`Time: ${ms}ms`)
    console.log('第一次调用结束')
})

app.use(async (ctx, next) => { 
    console.log('第二次调用')
    await next(); // 需要next，原因是koa把很多async函数组成一个处理链，每个async函数可以做自己的事情，然后await next()来调用下一个async函数,每个async函数称为middleware。如果没有这个await next，那么后面一个app.use就不会执行
    ctx.response.type = 'text/html'; // 设置response的Content-type，也可以写成ctx.type = 'text/html'
    ctx.response.body = '<h1>hello, koa2</h1>' // 设置body内容
    console.log('第二次调用结束')
});

app.use(async (ctx, next) =>{
    console.log('第三次调用')
    console.log('第三次调用结束')
})

// app.use的顺序就是middleware的执行顺序，如果middleware中没有await next，那么后续的middleware将都不会执行
app.listen(3000);
console.log('app started at port 3000...')