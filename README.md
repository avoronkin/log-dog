

```js
var logDogFactory = require('log-dog')

var logDog = logDogFactory()
.use(function (data, next) {
    data.line = data.line.toLowerCase()
    next()
})
.use(/Listen/i, function (data, next) {
    console.log('server start line', data.line)
})

logDog.read('tail -n 300 -f /some/path.log')
```
