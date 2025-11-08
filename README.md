<h1 align="center">
  <br>
  <img width="50%" src="https://raw.githubusercontent.com/lindascan/lindascan-frontend/refs/heads/master/src/images/LindaBanner.svg">
  <br>
  Lindascan Frontend
  <br>
</h1>

<h4 align="center">
  React.js Frontend for <a href="https://lindascan.org">Lindascan.org</a>
</h4>

<p align="center">
  <a href="#requirements">Requirements</a> •
  <a href="#installation">Running</a> •
  <a href="https://lindascan.org">lindascan.org</a>
</p>

## Features

* All information from the blockchain viewable
* Web Wallet
* Super Representative Voting
* Node Tester
* Transaction Debugger
* Notifications
* Poloni DEX Information
* News
* Node Overview
* Basic info browser
* Quick search token
* Web wallet
* Poloni DEX
* DApp Recommend
* Vote for SR
* LINDA Committee
* Token List
* Contract Deploy& Verify
* DAppChain
* Node Tester
* Transaction Debugger

# Requirements

* node.js
* yarn

# Running

```bash
> yarn install
> yarn start
```

## Configuring API URL

By default the Explorer will connect to https://api.lindascan.org for its data. 

When developing locally the url can be changed by defining the `API_URL` environment variable

```bash
> API_URL=http://127.0.0.0:9000 yarn start
```

