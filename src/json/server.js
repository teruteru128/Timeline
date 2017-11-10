var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('mock.json')
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use(jsonServer.rewriter({
  '/v1': '/',
  '/v1/*': '/$1',
  '/posts/home': '/_posts_home',
  '/posts/home/*': '/_posts_home/$1',
}))

server.get('/', function (req, res, next) {
  res.jsonp({})  
});  

server.get('/users', function (req, res, next) {
  res.jsonp({})
})

server.get('/auth', function (req, res, next) {
  res.statusCode = 400;
  res.jsonp({error: 'GET method not allowed'})
})  

server.post('/auth', function (req, res, next) {
  req.method = 'GET'
  req.query = req.body
  if(req.query['name'] === 'kitten' && req.query['password'] === 'kitten') {
    next()
    return
  }

  res.statusCode = 401;
  res.jsonp({error: 'login failed'});
})

server.get('/posts', function(req, res, next) {
  res.jsonp({})
})

server.get('/_posts_home', function(req, res, next) {
  const authToken = req.get('Authorization');
  if (authToken === undefined) {
    res.statusCode = 401;    
    res.jsonp({error: 'Access token required.'})
    return
  }
  if (authToken.indexOf('Bearer ') !== -1) {
    res.statusCode = 401;    
    res.jsonp({error: 'Invalid access token.'})
    return
  }
  
  next();
})

server.get('/_posts_home/*', function(req, res, next) {
  const authToken = req.get('Authorization');
  if (authToken === undefined) {
    res.statusCode = 401;    
    res.jsonp({error: 'Access token required.'})
    return
  }
  if (authToken.indexOf('Bearer ') !== -1) {
    res.statusCode = 401;    
    res.jsonp({error: 'Invalid access token.'})
    return
  }
  
  next();
})

server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running')
})