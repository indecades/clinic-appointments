let PORT = 8080 || process.env.PORT;
const express = require('express');
let jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require('mongoose')
const helmet = require("helmet")
const dotenv = require("dotenv")
// imports controllers
const login = require('./controllers/login.controller');
const appointments = require('./controllers/appointments.controller');
//impots express
dotenv.config()
const app = express();
// use cors
app.use(cors())
//use helmet
app.use(helmet())
//use express.json
app.use(express.json());
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
// connects to database
mongoose.connect(process.env.MONGO).then(()=> {
	console.log('Connected to MongoDB!')
}).catch((err)=> {
console.log(err)
});

// login routes
app.post('/login/create-default-admin', login.createDefaultAdminAccount)
app.post('/login/admin-login', login.loginAdminAccount)
app.post('/login/create-new-admin', login.createNewAdmin)

// appointments routes
app.post('/app/add-appointment', appointments.createNewAppointment)
app.get('/app/admin-appointments', appointments.findAllAppointments)
app.put('/app/edit-appointment', appointments.updateById)
app.delete('/app/delete-appointment', appointments.deleteById)
app.get('/app/user-appointments', appointments.findUserAppointments)

//launches port
app.listen(PORT, () => {
	console.log("Application up and running on port: " + PORT);
});
