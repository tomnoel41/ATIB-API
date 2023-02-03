## ATIB-API

- [x] Help Page
- [x] Ping Host
- [x] Resolve DNS Host
- [x] Check Port Host
- [x] Whois resolve domain
- [x] Geo IP Information

## Usage Exemple

<a href="https://api.atib.network/help" target="_blank">Exemple</a>
- GET /help [View all API routes]
- GET /ping/:host [Ping a host and returns the round trip time]
- GET /resolvedns/:host [Resolves the IP addresses associated with a domain name]
- GET /checkport/:host/:port [Checks if a specific port is open on a host]
- GET /whois/:domain [Retrieve information about the registered owner of a domain name]
- GET /geoipinfo/:ip [Retrieve country information for a given IP address]


## Installation

```bash
git clone https://github.com/tomnoel41/ATIB-API.git
cd ATIB-API
node api.js
```
