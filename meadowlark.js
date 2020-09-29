const express = require('express')
const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
  }))
app.set('view engine', 'handlebars')
  
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))


app.get('/', handlers.home)

app.get('/about', handlers.about)

---The Request Object---144
app.get('/headers', (req, res) => {
  res.type('text/plain')
  const headers = Object.entries(req.headers)
  .map(([key, value]) => `${key}: ${value}`)
  res.send(headers.join('\n'))
})



// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)
 
//http://localhost:3000/
//http://localhost:3000/about
app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`))
