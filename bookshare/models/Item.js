const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: String,
    description: String,
    place: String,
    condition: String,
    type: String,
    price: Number,
    cast: [{type: Schema.Types.ObjectId, ref: 'Category'}]
});

const Item = mongoose.model('Item', itemSchema);
















module.exports = Item;