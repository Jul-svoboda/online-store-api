const Router = require('express') //экспорт роутера из экспресса
const router = new Router() //создаем объект роутера
//импорт всех подроутеров
const userRouter = require('./userRouter')
const itemRouter = require('./itemRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')

//перечисление подроутеров и их сопоставление
router.use('/user', userRouter) 
router.use('/item', itemRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)



module.exports = router //этот объект отсюда экспортируем