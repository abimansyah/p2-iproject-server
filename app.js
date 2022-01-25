const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const router = require('./router/index')
// const errorHandler = require('./middlewares/errorHandler')

app.use('/', express.static('public'));
app.use('/', router)
// app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string

//npx sequelize-cli model:generate --name Favorite --attributes uuid:string,symbol:string,name:string,description:string,iconUrl:string,websiteUrl:string,total:string,circulating:string,marketCap:string,price:string,dailyVolume:string,change:string,rank:string,userId:integer