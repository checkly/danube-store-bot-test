require('./tracing')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.get('/404', (req, res) => {
  res.status(404).sendFile(__dirname + '/404.html')
})

app.use(express.static(__dirname + '/vue/dist'))

app.get('/api/books', (req, res) => {
  if (fs.existsSync('downtime.json')) {
    console.log('Downtime detected')
    res.status(500).send()
  } else {
    const rawData = fs.readFileSync('books.json')
    const books = JSON.parse(rawData)

    res.status(200).json(books)
  }
})

app.get('/api/books/:id', (req, res) => {
  const rawData = fs.readFileSync('books.json', 'utf8')
  const books = JSON.parse(rawData)
  const idAsNumber = Number(req.params.id)
  const found = books.find((item) => item.id === idAsNumber)
  res.status(200).json(found)
})

app.get('/api/users/login', (req, res) => {
  res.status(200).json({
    message: 'Login successful',
    token: uuidv4(),
    name: 'Danube',
  })
})

app.post('/api/toggle', (req, res) => {
  if (fs.existsSync('downtime.json')) {
    fs.unlinkSync('downtime.json')
    res.status(200).send()
  } else {
    fs.writeFileSync('downtime.json', '{}')
    res.status(200).send()
  }
})

app.get('/api/downtime', (req, res) => {
  const downtime = fs.existsSync('downtime.json')
  res.status(200).json({ downtime })
})

app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/vue/dist/index.html')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
