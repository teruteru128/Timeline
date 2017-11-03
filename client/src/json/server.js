var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('mock.json')
var middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.get('/v1/users', function (req, res, next) {
  req.method = 'GET'
  req.query = req.body
  next()
})

server.post('/v1/auth', function (req, res, next) {
  req.method = 'GET'
  req.query = req.body
  next()
})

server.use('/v1', router)
server.listen(3000, function () {
  console.log('JSON Server is running')
})