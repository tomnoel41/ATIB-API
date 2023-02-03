const ping = require('ping');
const dns = require('dns');
const net = require('net');
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
      </ul>
    `;
  
    res.send(helpMessage);
});
  
app.listen(3000, () => {
  console.log('API running on http://localhost:3000/');
});