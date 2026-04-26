const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function(role) { //функция для проверки роли
    return function(req, res, next) {
        if (req.method === 'OPTIONS') { //нас интересуют только post, get, put, delete
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] //первым идет тип токена, нам нужен второй элемент, сам токен
            if (!token) {
                return res.status(401).json({message: 'пользователь не авторизован'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY) //декодируем токен с помощью того же ключа
            if (decoded.role !== role) {
                return next(ApiError.forbidden('нет доступа'))
            }
            req.user = decoded //передаем код доступа в юзер реквест
            next()
        } catch (error) {
            res.status(401).json({message: 'пользователь не авторизован'})
        }
    }
}