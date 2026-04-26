const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}

class UserController { //создаем клас для группировки, в них функции для регистрации, входа и проверки авторизации
    async registration(req, res, next) {
        const{email, password, role} = req.body;
        if (!email || !password) { //ошибка отсутствия пароля или имейла
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) { //проверка, есть ли пользователь уже с таким email 
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5) //хэшируем пароль 5 раз
        const user = await User.create({email, role, password: hashPassword}) //создаем пользователя
        const basket = await Basket.create({userId: user.id}) //сразу создаем для пользователя карзину и привязываем по айди
        const token = generateJwt(user.id, user.email, user.role) //его время жизни
        res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.notFound('пользователя с таким email нет'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password) //функция расхэширует введеный пароль  сравнит с сохраненным в БД
        if (!comparePassword) {
            return next(ApiError.forbidden('неправильный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token})
    }

    async check(req, res, next) { //request → входящие данные, response → ответ клиенту next передаем ошибку
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async delete(req, res, next) { //request → входящие данные, response → ответ клиенту next передаем ошибку
        const {id} = req.params; //свойство query в express позволяет получитьт доступ к параметрам строки запроса (query string) из URL входящего HTTP-запроса
        const user = await User.findOne({where: {id}});
        if (!user) {
            return next(ApiError.notFound('нет пользователя с таким id'))
        }
        await user.destroy();
        return res.json('пользователь успешно удален')
    }
}

module.exports = new UserController() //экспортируем класс, для доступа по нему к функциям внутри