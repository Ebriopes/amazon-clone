const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KBR2KLvjBdLcdzrCh4t5LYrKlOWCekoWS2oAdoBBRG0RrkGQm1qJ9vqnWznJ5Pn6Jcjp8lgi0EpCGI2yKXZ6nJN00gz59490B"
);

// API
// App config
const app = express();

// App middleware
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get("/", (_, response) => response.status(200).send("All fine"));

app.post("/payments/create", (request, response) => {
  const total = request.query.total;

  stripe.paymentIntents
    .create({amount: total, currency: "usd"})
    .then((paymentIntent) => {
      response.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
    })
    .catch((err) => {
      response.status(401).send(err);
    });
});

// Listen command
exports.api = functions.https.onRequest(app);
