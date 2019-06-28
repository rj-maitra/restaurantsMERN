const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Reviewer name is required"],
        minlength: [2, "Reviewer name must be 2 characters or longer"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    },
    reviewText: {
        type: String,
        required: [true, "Review text is required"],
        minlength: [3, "Review text must be 3 characters or longer"]
    },
}, {timestamps: true});

mongoose.model("Review", ReviewSchema);

module.exports = ReviewSchema;