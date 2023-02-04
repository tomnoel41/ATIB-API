// By Tom Noel with ChatGPT

const ping = require('ping');
const dns = require('dns');
const net = require('net');
const express = require('express');
const whois = require('whois-json');
const geoip = require('geoip-lite');
const host = "localhost", port = "3000";
const app = express();

app.get('/verifyemail/:email', (req, res) => {
  const email = req.params.email;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(email)) {
    res.send({ email: email, valid: true });
  } else {
    res.send({ email: email, valid: false });
  }
});

app.get('/geoipinfo/:ip', (req, res) => {
  const ip = req.params.ip;
  const geo = geoip.lookup(ip);
  res.send({ 
    country: geo.country
  });
});

app.get('/convert/:value/:unit', (req, res) => {
  const value = req.params.value;
  const unit = req.params.unit;

  let gigabyteGB, megabyteMB, kilobyteKB, byteB, bits;
  
  switch (unit) {
    case "gigabyte":
      gigabyteGB = value;
      megabyteMB = value * 1024;
      kilobyteKB = value * 1024 * 1024;
      byteB = value * 1024 * 1024 * 1024;
      bits = value * 8 * 1024 * 1024 * 1024;
      break;
    case "megabyte":
      gigabyteGB = value / 1024;
      megabyteMB = value;
      kilobyteKB = value * 1024;
      byteB = value * 1024 * 1024;
      bits = value * 8 * 1024 * 1024;
      break;
    case "kilobyte":
      gigabyteGB = value / 1024 / 1024;
      megabyteMB = value / 1024;
      kilobyteKB = value;
      byteB = value * 1024;
      bits = value * 8 * 1024;
      break;
    case "byte":
      gigabyteGB = value / 1024 / 1024 / 1024;
      megabyteMB = value / 1024 / 1024;
      kilobyteKB = value / 1024;
      byteB = value;
      bits = value * 8;
      break;
    case "bits":
      gigabyteGB = value / 8 / 1024 / 1024 / 1024;
      megabyteMB = value / 8 / 1024 / 1024;
      kilobyteKB = value / 8 / 1024;
      byteB = value / 8;
      bits = value;
      break;
    default:
      res.status(400).send({ error: "Invalid unit of measurement" });
      return;
  }

  res.send({ gigabyte: gigabyteGB, megabyte: megabyteMB, kilobyte: kilobyteKB, byte: byteB, bits: bits });
});

app.get('/genpassword', (req,res) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-";
  let password = "";
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  res.send({password : password});
});

app.get('/whois/:domain', (req, res) => {
    const domain = req.params.domain;

    whois(domain)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(error) {
            res.send({ error: error.toString() });
        });
});

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


app.get('/resolvedns/:host', (req, res) => {
    const host = req.params.host;
  
    dns.resolve4(host, (err, addresses) => {
      if (err) {
        res.send({ error: err.toString() });
        return;
      }
  
      res.send({ host: host, addresses: addresses });
    });
});

app.get('/checkport/:host/:port', (req, res) => {
    const host = req.params.host;
    const port = req.params.port;
  
    const server = net.createServer().listen(port, host);
  
    server.on('error', (err) => {
      res.send({ host: host, port: port, status: 'closed' });
      server.close();
    });
  
    server.on('listening', () => {
      res.send({ host: host, port: port, status: 'open' });
      server.close();
    });
  });

app.get('/', (req, res) => {
    res.redirect('/help');
  });

app.get('/help', (req, res) => {
    const helpMessage = `
      <h1>Welcome to the ATIB-API Help page!</h1>
      <p>Available routes:</p>
      <ul>
        <li>
          <p><strong>GET /ping/:host</strong></p>
          <p>Ping a host and returns the round trip time</p>
        </li>
        <li>
          <p><strong>GET /resolvedns/:host</strong></p>
          <p>Resolves the IP addresses associated with a domain name</p>
        </li>
        <li>
          <p><strong>GET /checkport/:host/:port</strong></p>
          <p>Checks if a specific port is open on a host</p>
        </li>
        <li>
          <p><strong>GET /whois/:domain</strong></p>
          <p>Retrieve information about the registered owner of a domain name</p>
        </li>
        <li>
          <p><strong>GET /geoipinfo/:ip</strong></p>
          <p>Retrieve country information for a given IP address</p>
        </li>
        <li>
          <p><strong>GET /verifyemail/:email</strong></p>
          <p>Verify if an email address format is valid</p>
        </li>
        <li>
          <p><strong>GET /genpassword</strong></p>
          <p>Generates a strong 16 character password</p>
        </li>
        <li>
          <p><strong>GET /convert/:value/:unit</strong></p>
          <p>Convert a computer unit value to other units (:unit -> gigabyte, megabyte, kilobyte, byte, bits)</p>
        </li>
      </ul>
    `;
  
    res.send(helpMessage);
});
  
app.listen(port, () => {
  console.log(`API running on http://${host}:${port}/`);
});