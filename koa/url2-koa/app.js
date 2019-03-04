const Koa = require('koa')

const router = require("koa-router")() // require("koa-router")返回的是函数

const bodyParser = require("koa-bodyparser")

const controller = require('./controller');

const app = new Koa()

app.use(bodyParser()) // bodyParser必须在router之前被注册到app对象上

app.use(controller());

// var files = fs.readdirSync(__dirname + 'controllers')

// var js_files = files.filter((f) => {
//     return f.endsWith('.js')
// })

// for(var f of js_files){
//     console.log(`process controller: ${f}...`)

//     let mapping = require(__dirname + '/controllers/' + f)
//     for(var url in mapping){
//         if(url.startsWith('GET ')){
//             var path = url.substring(4);
//             router.get(path, mapping[url]);
//             console.log(`register URL mapping: GET ${path}`)
//         } else if(url.startsWith('POST ')){
//             var path = url.substring(5)
//             router.post(path, mapping[url])
//             console.log(`register URL mapping: POST ${path}`)
//         }else {
//             console.log(`invalid URL: ${url}`)
//         }
//     }
// }


// app.use的顺序就是middleware的执行顺序，如果middleware中没有await next，那么后续的middleware将都不会执行
app.listen(3000);
console.log('app started at port 3000...')