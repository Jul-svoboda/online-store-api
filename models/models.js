const sequelize = require('../db') //ипортируем объект sequelize из db
const {DataTypes} = require('sequelize') //импортируем из пакета sequelize класс DataTypes, он описывает типы полей

//модель пользователя
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //числовой тип, первичный ключ, при создании нового объекта увелич
    email: {type: DataTypes.STRING, unique: true}, //уникальный мэйл
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}, 
})

//модель корзины покупок
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //числовой тип, первичный ключ, при создании нового объекта увелич
})

//модель одного товара в корзине
const BasketItem = sequelize.define('basket_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //числовой тип, первичный ключ, при создании нового объекта увелич
})

//модель одного товара
const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //числовой тип, первичный ключ, при создании нового объекта увелич
    name: {type: DataTypes.STRING, unique: true, allowNull: false}, //уникальное и не может быть пустым
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}, //строка для хранения пути до файла и расширения
})

//модель типов объектов
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //числовой тип, первичный ключ, при создании нового объекта увелич
    name: {type: DataTypes.STRING, unique: true},
})

//модель брендов объектов
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //числовой тип, первичный ключ, при создании нового объекта увелич
    name: {type: DataTypes.STRING, unique: true},
})

//модель рейтинга товаров
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //числовой тип, первичный ключ, при создании нового объекта увелич
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

//модель дополнительной информации о товаре
const ItemInfo = sequelize.define('item_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //числовой тип, первичный ключ, при создании нового объекта увелич
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

//Описание связей между моделями

//Отдельный список для хранения связки типа и бренда многие ко многим
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //числовой тип, первичный ключ, при создании нового объекта увелич
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

Type.hasMany(Item)
Item.belongsTo(Type)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Item.hasMany(Rating)
Rating.belongsTo(Item)

Item.hasMany(BasketItem)
BasketItem.belongsTo(Item)

Item.hasMany(ItemInfo, {as: 'info'})
ItemInfo.belongsTo(Item)

Type.belongsToMany(Brand, {through: TypeBrand}) //Brand и Type связаны друг с другом много ко многим, поэтому нужна промежуточная таблица
Brand.belongsToMany(Type, {through: TypeBrand})

//экспорт моделей

module.exports = {
    User,
    Basket,
    BasketItem,
    Item,
    ItemInfo,
    Type,
    Brand,
    TypeBrand,
    Rating,
}