const express = require("express")
const app = express();

app.use(express.json());

require('dotenv').config()
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');
const stripeRoute = require("./routes/stripe");
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
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`Backend server is running at port`)
})