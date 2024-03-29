## ATIB-API

- [x] Help Page
- [x] Rate Limit
- [x] Ping Host
- [x] Resolve DNS Host
- [x] Check Port Host
- [x] Whois resolve domain
- [x] Geo IP Information
- [x] Check validity e-mail format
- [x] Generate strong random password
- [x] Computer unit conversion
- [x] Display your IPv4
- [x] UUID Generation
- [x] Generate ATIB ID
- [x] Get System Uptime
- [x] Calculate monthly price of device in watt 

## Usage Exemple

<a href="https://api.atib.network/help" target="_blank">Exemple</a>
- GET /help [View all API routes]
- GET /ping/:host [Ping a host and returns the round trip time]
- GET /resolvedns/:host [Resolves the IP addresses associated with a domain name]
- GET /checkport/:host/:port [Checks if a specific port is open on a host]
- GET /whois/:domain [Retrieve information about the registered owner of a domain name]
- GET /geoipinfo/:ip [Retrieve country information for a given IP address]
- GET /verifyemail/:email [Verify if an email address format is valid]
- GET /genpassword [Generates a strong 16 character password]
- GET /convert/:value/:unit [Convert a computer unit value to other units]
- GET /getip [Display the IPv4 of your client]
- GET /generate-uuid [Generates a UUID]
- GET /generate-atibid [Generate a ATIB ID]
- GET /uptime [Get system uptime]
- GET /specs [Get system specifications]
- GET /consommation/:kwh_price/:watts [Calculate the annual and monthly price of a device in Watt]

## Rate-Limit

The ATIB-API rate-limit is a 2 minute window in which all requests will be counted, if it exceeds 50 requests, the ip will be blocked for the window, making an endless rate-limit cycle.
To disable it, pass the "ratelimit_status" variable to false.


## Installation

```bash
git clone https://github.com/tomnoel41/ATIB-API.git
cd ATIB-API
node api.js
```
