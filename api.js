const ping = require('ping');
const traceroute = require('traceroute');
const express = require('express');
const app = express();

app.get('/ping/:host', (req, res) => {
  const host = req.params.host;

  ping.promise.probe(host)
    .then(function (response) {
      res.send({ host: response.host, time: response.time });
    })
    .catch(function (error) {
      res.send({ error: error.toString() });
    });
});

app.get('/traceroute/:host', (req, res) => {
  const host = req.params.host;

  traceroute.trace(host, function (err, response) {
    if (err) {
      res.send({ error: err.toString() });
    } else {
      res.send({ host: host, trace: response });
    }
  });
});

app.listen(80, () => {
  console.log('API running on http://localhost');
});