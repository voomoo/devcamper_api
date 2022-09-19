const express = require("express");
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");
const path = require("path");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandler = require("./middleware/error");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Route Files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//file uploading
app.use(fileupload());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

//Middleware to catch error and respond for above route
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    //close server and exit process
    server.close(() => process.exit(1));
});
