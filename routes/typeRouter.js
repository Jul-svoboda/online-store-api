const Router = require('express') //экспорт роутера из экспресса
const router = new Router() //создаем объект роутера
const typeController = require('../controllers/typeController')

router.post('/', typeController.create) //метод для создания 
router.get('/', typeController.getAll) //метод для получения всех
router.get('/:id', typeController.getOne) // для получения одного типа
router.delete('/:id', typeController.delete) //метод для удаления 


module.exports = router //этот объект отсюда экспортируем