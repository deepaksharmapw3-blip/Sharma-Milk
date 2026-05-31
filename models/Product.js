const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  description:  { type: String, default: '' },
  price:        { type: Number, required: true, min: 0 },
  image:        { type: String, default: '' },
  category:     { type: String, default: 'Mithai', trim: true },
  weight:       { type: String, default: '500g' },
  deliveryTime: { type: String, default: '45 min' },
  rating:       { type: Number, default: 4.5, min: 0, max: 5 },
  reviews:      { type: Number, default: 0 },
  badge:        { type: String, default: '' },
  festiveTag:   { type: String, default: '' },
  inStock:      { type: Boolean, default: true },
  inventory:    { type: Number, default: 100 },
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
