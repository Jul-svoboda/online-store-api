const {Brand} = require('../models/models') //импорт модели 
const ApiError = require('../error/ApiError') // импорт обработчика ошибок


class BrandController { //создаем клас для группировки
    async create(req, res, next) {
        const {name} = req.body //из тела запроса берем название
        const brandFound = await Brand.findOne({where: {name}})
        if (brandFound) {
            return next(ApiError.badRequest('такой брэнд уже есть'))
        }
        const brand = await Brand.create({name}) //с помощью метода create создаем новый брэнд
        return res.json(brand) //возвращаем ответ о создании брэнда с полученным названием
    }

    async getAll(req, res) {
        const brands = await Brand.findAll() //вызываем метод findAll который вернет все записи из базы данных
        return res.json(brands)
    }

    async getOne(req, res, next) {
        const {id} = req.params;
        const brand = await Brand.findOne({where: {id}}) //вызывает метод findOne для поиска одного брэнда
        if (!brand) {
            return next(ApiError.notFound('такого брэнда нет'))
        }
        return res.json(brand)
    }

    async delete(req, res, next) {
        const {id} = req.params; //получаем запрошенный на удаление айди брэнда
        const brand = await Brand.findOne({where: {id}});
        if (!brand) {
            return next(ApiError.notFound('такого брэнда нет'))
        }
        await type.destroy(); //удаляем брэнд из базы данны
        return res.json('брэнд удален')
    }
}

module.exports = new BrandController() //экспортируем класс, для доступа по нему к функциям внутри