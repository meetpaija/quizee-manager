import mongoose from 'mongoose'

const connUrl = "mongodb://127.0.0.1:27017/quizee-manager-data";

mongoose.connect(connUrl, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
})