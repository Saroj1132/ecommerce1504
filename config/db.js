const mongoose = require('mongoose')

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.aez8suc.mongodb.net/ecommercePro');
        console.log('connected sucessfully')
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDB