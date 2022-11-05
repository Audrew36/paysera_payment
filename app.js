const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const Paysera = require("paysera-nodejs");
const WebToPay = require("./lib/web-to-pay.js");

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

app.post("/charge", (req, res) => {
  let options = {
    projectid: "222845",
    sign_password: "27cba94c9a9fe4283458e52c09592890",
    accepturl: "https://audrius.herokuapp.com/success",
    cancelurl: "https://audrius.herokuapp.com/cancel",
    callbackurl: "https://audrius.herokuapp.com",
    test: 1,
  };

  let paysera = new Paysera(options);

  let params = {
    payment: "",
    frame: "1",
    orderid: 1234567,
    p_email: "customer@email.com",
    amount: 10,
    currency: "EUR",
  };

  var urlToGo = paysera.buildRequestUrl(params);
  res.status(200);
  res.redirect(`${urlToGo}`);
});

app.get("/", (req, res) => {
  res.render("index", {});
});

app.get("/cancel", (req, res) => {
  res.render("cancel", {});
});

app.get("/success", (req, res) => {
  res.render("success", {});
});

const port = process.env.PORT || 3338;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

