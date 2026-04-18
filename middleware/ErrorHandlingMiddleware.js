const ApiError = require('../error/ApiError')

module.exports = function (error, req, res, next) { //функция экспортируется как модуль, принимает в параметры ошибку, запрос, ответ и функцию next, она пустая тк это замыкающий middleware
    if(error instanceof ApiError) {
        return res.status(error.status).json({message: error.message})
    }
    return res.status(500).json({message: "непредвиденная ошибка"})
}