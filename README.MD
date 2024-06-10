# Currency Exchange API
A simple API to fetch currency exchange rates.
1. [Requirements](#requirements)
2. [Installation Guide](#installation-guide)
   - [Using Node.js](#using-nodejs)
   - [Using Docker](#using-docker)
3. [API Endpoint Overview](#api-endpoint-overview)
4. [Running Tests](#running-tests)
5. [Environment Variables](#environment-variables)

## Requirements
+ Node.js (version 14.x or higher)
+ npm (version 6.x or higher)
+ Docker (optional)
+ Postman (optional)

## Installation Guide
### Using Node.js
1. Clone the repository: 
```
git clone https://github.com/kerollosy/currency-exchange-api.git
cd currency-exchange-api
```

2. Install the dependencies:
```
npm install
```

3. Run the application: 
```
npm start
```

The application will be available at `http://localhost:3000`.

### Using Docker
1. Clone the repository: 
```
git clone https://github.com/kerollosy/currency-exchange-api.git
cd currency-exchange-api
```

2. Build the Docker image:
```
docker build -t currency-exchange-api .
```

3. Run the Docker container:
```
docker run -p 3000:3000 --env-file .env currency-exchange-api
```

The application will be available at `http://localhost:3000`.


## API Endpoint Overview
[Swagger Documentation](https://app.swaggerhub.com/apis/KEROLLOSEM/currency-exchange_rates_api/1.0.0)


## Running Tests
To run the tests, use the following command:
```
npm test
```

## Environment Variables
- `CACHE_TTL`: The time-to-live (TTL) of the cache in seconds. Defaults to 1 hour.
- `RATE_LIMIT_WINDOW_MS`: The window of time for rate limiting in milliseconds. Defaults to 5 minutes.
- `RATE_LIMIT_MAX`: The maximum number of requests a user can make within the rate limit window. Defaults to 50.
