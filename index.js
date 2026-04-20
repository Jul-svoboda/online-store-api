require('dotenv').config() //подключение .env данные загружаются из него в process.env
const express = require('express') //подключение express
const sequelize = require('./db') //импорт объекта из db
const modules = require('./models/models') //импорт моделей
const cors = require('cors')//импорт для Middleware (промежуточное программное обеспечение, связующее программное обеспечение) 
const fileUpload = require('express-fileupload') //необходимый пакет для загрузки файлов, картинок для товара
const router = require('./routes/index') //импорт основного роутера
const errorHandler = require('./middleware/ErrorHandlingMiddleware') //импортируем хэндлер ошибки
const path = require('path') //путь до папки со статикой

const PORT = process.env.PORT || 5000

const app = express() //вызов функции express и подключение app, в нем сервер http на базе Node.js
app.use(cors()) //добавляет правильные заголовки в ответ сервера
app.use(express.json()) //для возможности парсинга джсон формата во фронте
app.use(express.static(path.resolve(__dirname, 'static' ))) //явно указываем сервиру, что файлы из папки статик раздавать как статику
app.use(fileUpload({})) //подключаем для работы с файлами
app.use('/api', router)

//замыкающий middleware, работает с ошибками
app.use(errorHandler)

const start = async() => {   //функция для подключения к БД
    try {
        await sequelize.authenticate() //функция для подключения к БД
        await sequelize.sync() //функция сверяет состояние БД со схемой БД
        app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`)) //запуска сервера, внем создается сервер http.createServer и слушает указанный порт
    } catch(e) {
        console.log(e)
    }
}

start() 

