// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// const indexRoutes = require("./routes/index.routes"); // alix commenté
// app.use("/api", indexRoutes);// alix commenté

// Comme ça sur GITHUB :
// const allRoutes = require("./routes");
// app.use("/api", allRoutes);

// Dans leçon IH : 
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

// MA ROUTE TEST  :
const testRouter = require("./routes/test.routes");
app.use("/api", testRouter);

//  MA ROUTE TEST 2 : 
// const test2Router = require("./routes/test2.routes");
// app.use("/api", test2Router);

// ADD : Require my newly created project.routes.js file. 
const projectRouter = require("./routes/project.routes");     
app.use("/api", projectRouter);

// We import this file with the tasks routes, using require(), 
// and set it up as the routes middleware in the app.js:
const taskRouter = require("./routes/task.routes");
app.use("/api", taskRouter);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
// add the /api prefix to the routes (not mandatory, but it will help us in the long run).