const {Type} = require('../models/models') //импорт модели тип
const ApiError = require('../error/ApiError') // импорт обработчика ошибок

class TypeController { //создаем клас для группировки
    async create(req, res, next) {
        const {name} = req.body //из тела запроса берем название
        const typeFound = await Type.findOne({where: {name}})
        if (typeFound) {
            return next(ApiError.badRequest('такой тип уже есть'))
        }
        const type = await Type.create({name}) //с помощью метода create создаем новый тип
        return res.json(type) //возвращаем ответ о создании типа с полученным названием
    }

    async getAll(req, res) {
        const types = await Type.findAll() //вызываем метод findAll для модели Type которая вернет все записи из базы данных
        return res.json(types)
    }

    async getOne(req, res, next) {
        const {id} = req.params;
        const type = await Type.findOne({where: {id}}) //вызывает метод findOne для поиска одной конкретной категории
        if (!type) {
            return next(ApiError.notFound('такого типа нет'))
        }
        return res.json(type)
    }

    async delete(req, res, next) {
        const {id} = req.params; //получаем запрошенный айди
        const type = await Type.findOne({where: {id}});
        if (!type) {
            return next(ApiError.notFound('такого типа нет'))
        }
        await type.destroy(); //удаляем тип из базы данны
        return res.json('тип удален')
    }
}

module.exports = new TypeController() //экспортируем класс, для доступа по нему к функциям внутри