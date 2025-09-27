import express from 'express'
const app = express()
const port = 3000

const aboutMiddleware = ((req,res,next) => {
  console.log("Method:",req.method, "URL:",req.url)
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about',aboutMiddleware, (req, res) => {
  // res.redirect('/go')
  res.send('About')
})

app.get("/go",(req,res) => {
  res.send("go")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
