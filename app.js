

if(process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./router/index')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', express.static('public'));
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string

//npx sequelize-cli model:generate --name Favorite --attributes userId:integer,coinId:string