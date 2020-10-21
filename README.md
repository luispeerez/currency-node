### Exchange rate API

This app implements some sample endpoints and two endpoints to convert a given amount from a currency to anoher, and to get the exchange rate of a given currency compared to a list of available currencies.
Examples:

```
Open http://localhost:8080/ to see the status
Open http://localhost:8080/hello-world to see a sample message

Example of currency coverter, http://localhost:8080/convert?from=MXN&to=USD&amount=10
Example of currency list, http://localhost:8080/exchange-rates?from=MXN
```

## Installation

To use the API, be sure to have node `>=12.8.3`.
Clone the repository, then move to the root directory and run:
`npm install` or `yarn`

This will install all the dependencies.

To start the server, run: `npm start` or `yarn start`. By default it runs on `http://localhost:8080/`
Some examples of the available endpoints will be displayed in the node console

## Test

Run `npm test` or `yarn test`
