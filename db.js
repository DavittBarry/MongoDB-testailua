const mongoose = require('mongoose')

// Tehdään funktio missä kerromme mistä saamme DB:in.

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected:"+conn.connection.host)
    }
    catch(err) {
        console.log(err)
        process.exit(1)        
    }
}

module.exports = connectDB