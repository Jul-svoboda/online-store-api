class ApiError extends Error { //расширяем ошибку, ведет себя как обычная ошибка но с доп данными
    constructor(status, message) { //конструктор принимает от стандартного js Errpr параметрами статус код и сообщение, которое мы вернем на клиент
        super();
        this.status = status;
        this.message = message;

    }

    static badRequest(message) { //статическая функция, позволяет обращаться напрямую к классу, без создания объекта ОШИБКА ЗАПРОСА
        return new ApiError(400, message)
    }
    static notFound(message) { //статическая функция, позволяет обращаться напрямую к классу, без создания объекта НЕ НАЙДЕНО
        return new ApiError(404, message)
    }
    static internal(message) { //статическая функция ОШИБКА СЕРВЕРА
        return new ApiError(500, message)
    }
    static forbidden(message) { //статическая функция, доступа нет НЕТ ДОСТУПА
        return new ApiError(403, message)
    }
}

module.exports = ApiError //экспортируем класс, для доступа по нему к функциям внутри