const mongoose = require("mongoose");

const dbconnecturl = process.env.MONGODB_URL;

mongoose.connect(dbconnecturl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
