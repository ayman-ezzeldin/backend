import express from 'express'
import courseRouter from './routes/course.route.js'
const app = express()
const port = 3000

app.use(express.json())


app.use("/api/courses", courseRouter)


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})