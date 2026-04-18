const Router = require('express') //экспорт роутера из экспресса
const router = new Router() //создаем объект роутера
const itemController = require('../controllers/itemController')

router.post('/', itemController.create) //метод для создания 
router.get('/', itemController.getAll) //метод для получения всех девайсов
router.get('/:id', itemController.getOne) //метод для получения одного конкретного
router.delete('/:id', itemController.delete) //метод для удаления 


module.exports = router //этот объект отсюда экспортируем