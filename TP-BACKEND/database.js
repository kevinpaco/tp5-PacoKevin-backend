const mongoose = require('mongoose');
const URI = 'mongodb://0.0.0.0/tp5-pacoKevin-conexion';
mongoose.connect(URI)
.then(db=>console.log("BD is conected"))
.catch(error=>console.log(error))
module.exports = mongoose;