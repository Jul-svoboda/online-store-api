const Router = require('express') //экспорт роутера из экспресса
const router = new Router() //создаем объект роутера
const brandController = require('../controllers/brandController')

router.post('/', brandController.create) //метод для создания брэнда
router.get('/', brandController.getAll) //метод для получения всех брэндов
router.get('/:id', brandController.getOne) // для получения одного брэнда
router.delete('/:id', brandController.delete) //метод для удаления одного брэнда


module.exports = router //этот объект отсюда экспортируем