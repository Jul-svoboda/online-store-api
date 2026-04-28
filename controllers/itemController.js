const ApiError = require('../error/ApiError')
const uuid = require('uuid') //необходимый пакет для генерации уникального имени
const path = require('path') //необходимый модуль для удобного указания пути и перемещения файлов
const {Item, ItemInfo, Type, Brand} = require('../models/models')
const cloudinary = require('../cloudinary')

class ItemController { //создаем клас для группировки
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId} = req.body //получаем основную информацию из тела запроса
            let {info} = req.body
            if (!req.files || !req.files.img) {
                return next(ApiError.notFound('файл изображения не передан'))
            }
            // let fileName = uuid.v4() + ".jpg" //генерируем уникальное имя для загруженного файла с нужным расширением
            // img.mv(path.resolve(__dirname, '..', 'static', fileName)) //пишем путь, чтобы сервер данные отдавал как статику для получения их браузером, тут метод resolve адаптирует указанный путь к ОС
            const {img} = req.files //получаем файл картинки из файла запроса
            const result = await cloudinary.uploader.upload(img.tempFilePath, {folder: 'shop'}) //для прода загружаем изображения в Cloudinary
            const item = await Item.create({name, price, brandId, typeId, img: result.secure_url}) //создаем элемент, тут у него появляется айди, как картинку передаем ссфлку на нее в клауди
            console.log('FILES:', req.files)
            console.log('TEMP PATH:', req.files?.img?.tempFilePath)

            if (info) {
                info = JSON.parse(info) //парсим обратно из джисон строки в объект js
                info.forEach(i => 
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        itemId: item.id
                    })
                )
            }
            
            return res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message, {message: 'ошибка при создании товара'}))
        }
    }

    async getAll(req, res, next) {
        let {typeId, brandId, limit, page} = req.query; //получаем айди брэнда и типа из запорса, а также построничный вывод
        if (typeId) {
            if (!await Type.findOne({where: {id: typeId}})) {
                return next(ApiError.notFound('такого типа нет'))
            }
        }
        if (brandId) {
            if (!await Brand.findOne({where: {id: brandId}})) {
                return next(ApiError.notFound('такого брэнда нет'))
            }
        }
        page = page || 1; //если страница не указана, по дефолту с первой
        limit = limit || 9; //если лимит не указан, будем отображать 9 товаров
        let offset = limit * page - limit // отступ, показывает с какого товара начнется отображение на указанной странице
        let items;
        if (!typeId && !brandId) { //если в запросе они не указаны, возвращаем все товары
            items = await Item.findAndCountAll({limit, offset}) // функция findAndCountAll не только найдет, но и посчитает общее количество 
        }
        if (!typeId && brandId) { // возвращем все товары одного брэнда
            items = await Item.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (typeId && !brandId) { //возвращем все товары одного типа
            items = await Item.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (typeId && brandId) { //возвращем товары конкретного типа и брэнда
            items = await Item.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }
        return res.json(items) //возвращаем запрашиваемый массив
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const item = await Item.findOne(
                {
                    where: {id},
                    include: [{model: ItemInfo, as: 'info', required: false}] //сразу подгружаем инфу о товаре c имемнем 'info', чтобы осуществять этот запрос для открытия полной карточки товара
                },
            )
            if (!item) {
                return next(ApiError.notFound('Товар не найден'));
            }
        
            return res.json(item)
        } catch (error) {
            next(ApiError.badRequest(error.message, {message: 'ошибка при получении товара'}))
        }
        
    }

    async delete(req, res, next) {
        const {id} = req.params;
        const item = await Item.findOne({where: {id}});
        if (!item) {
            return next(ApiError.notFound('товар не найден'))
        }
        await item.destroy();
        return res.json('товар удален')
    }
}

module.exports = new ItemController() //экспортируем класс, для доступа по нему к функциям внутри