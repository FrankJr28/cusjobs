const mongoose = require("mongoose");
dbConnect();
async function dbConnect() {

    try {
        await mongoose.connect('mongodb+srv://FrankJr28:1234@cluster0.fioywud.mongodb.net/cusurjobs', { useNewUrlParser: true });
        console.log('Mongo DB Connection Succesful');
    } catch (error) {
        console.log('Mongo DB Connection failed');
    }

}

module.exports = mongoose