const { json } = require('express');

const app = require('express')();

// router
const router = require('./routers/Router');

app.use(json());
app.use("/", router);

app.listen(3000, () => {
    console.log("A API está funcionando");
});