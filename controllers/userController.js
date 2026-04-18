const ApiError = require("../error/ApiError")

class UserController { //создаем клас для группировки, в них функции для регистрации, входа и проверки авторизации
    async registration(req, res) {

    }

    async login(req, res) {

    }

    async check(req, res, next) { //request → входящие данные, response → ответ клиенту next передаем ошибку
        const {id} = req.query //свойство query в express позволяет получитьт доступ к параметрам строки запроса (query string) из URL входящего HTTP-запроса
        if (!id) {
            return next(ApiError.badRequest('нет id'))
        }
        res.json(id)
    }
}

module.exports = new UserController() //экспортируем класс, для доступа по нему к функциям внутри