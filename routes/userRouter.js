const Router = require('express') //экспорт роутера из экспресса
const router = new Router() //создаем объект роутера
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration) //метод для регистрации, кладем в него функцию из контроллера
router.post('/login', userController.login) //метод для авторизации, кладем в него функцию из контроллера
router.get('/auth', authMiddleware, userController.check) //метод для прорверки авторизации пользователя, кладем в него функцию из контроллера
router.delete('/:id', userController.delete)

module.exports = router //этот объект отсюда экспортируем