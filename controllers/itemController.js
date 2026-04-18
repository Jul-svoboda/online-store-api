const ApiError = require('../error/ApiError')
const uuid = require('uuid') //необходимый пакет для генерации уникального имени
const path = require('path') //необходимый модуль для удобного указания пути и перемещения файлов
const {Item} = require('../models/models')

class ItemController { //создаем клас для группировки
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body //получаем основную информацию из тела запроса
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Файл изображения не передан'));
            }
            const {img} = req.files //получаем файл картинки из файла запроса
            let fileName = uuid.v4() + '.jpeg' //генерируем уникальное имя для загруженного файла с нужным расширением
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) //пишем путь, чтобы сервер данные отдавал как статику для получения их браузером, тут метод resolve адаптирует указанный путь к ОС
            const item = await Item.create({name, price, brandId, typeId, img: fileName}) //создаем элемент, как картинку передаем сгенерированное нами имя файла
            return res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message, {message: 'ошибка при создании товара'}))
        }

    }

    async getAll(req, res, next) {
        
    }

    async getOne(req, res, next) {
        
    }

    async delete(req, res, next) {

    }
}

module.exports = new ItemController() //экспортируем класс, для доступа по нему к функциям внутри