const express = require("express")
const app = express();

app.use(express.json());

require('dotenv').config()
const mongoose = require("mongoose");
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const authRoute = require('./routes/auth');



var uri = process.env.MONGOOSE_URI.replace('<password>', process.env.MONGOOSE_PASSWORD);


mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("DB Connection Successful"))
.catch((err) => console.log(err));


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);


app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`Backend server is running at port`)
})