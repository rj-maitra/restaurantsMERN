const mongoose = require("mongoose");
const ReviewSchema = require('./review'); 

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A restaurant name is required!"],
        minlength: [3, "Restaurant name must be 3 characters or longer"]
    },
    cuisine: {
        type: String,
        required: [true, "A cuisine type is required!"],
        minlength: [3, "Cuisine must be 3 characters or longer"]
    },

    reviews: [ ReviewSchema ]
}, {timestamps: true});

mongoose.model("Restaurant", RestaurantSchema);