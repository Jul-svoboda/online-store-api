const Router = require('express') //экспорт роутера из экспресса
const router = new Router() //создаем объект роутера
const userController = require('../controllers/userController')

router.post('/registration', userController.registration) //метод для регистрации, кладем в него функцию из контроллера
router.post('/login', userController.login) //метод для авторизации, кладем в него функцию из контроллера
router.get('/auth', userController.check) //метод для прорверки авторизации пользователя, кладем в него функцию из контроллера


module.exports = router //этот объект отсюда экспортируем