# Crypto8 API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`
- `GET /cryptocurrencies`
- `GET /cryptocurrencies/:id`
- `GET /news`
- `GET /favorites`
- `GET /favorites/:coinId`
- `GET /favorites/:id`

&nbsp;

## 1. POST /register

Description:

- Insert a User to Database

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Register Success",
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
OR
{
  "message": "Email Must Be Unique"
}
OR
{
  "message": "Wrong Email Format!"
}
OR
{
  "message": "Email is Required!"
}
OR
{
  "message": "Password is Required!"
}

```

&nbsp;

## 2. POST /login

Description:

- User login and set access token

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password!"
}
```

&nbsp;

## 3. GET /cryptocurrencies

Description:

- Get all cryptocurrencies from 3rd party API

- params

```json
{
  "orderBy": "string",
  "orderDirection": "string",
  "search": "string"
}
```

- body:

```json
{
  "status": "success",
  "data": {
    "stats": {
      "total": 3,
      "totalCoins": 10000,
      "totalMarkets": 35000,
      "totalExchanges": 300,
      "totalMarketCap": "239393904304",
      "total24hVolume": "503104376.06373006"
    },
    "coins": [
      {
        "uuid": "Qwsogvtv82FCd",
        "symbol": "BTC",
        "name": "Bitcoin",
        "color": "#f7931A",
        "iconUrl": "https://cdn.coinranking.com/Sy33Krudb/btc.svg",
        "marketCap": "159393904304",
        "price": "9370.9993109108",
        "btcPrice": "1",
        "listedAt": 1483228800,
        "change": "-0.52",
        "rank": 1,
        "sparkline": [
          "9515.0454185372",
          "9540.1812284677",
          "9554.2212643043",
          "9593.571539283",
          "9592.8596962985",
          "9562.5310295967",
          "9556.7860427046",
          "9388.823394515",
          "9335.3004209165",
          "9329.4331700521",
          "9370.9993109108"
        ],
        "coinrankingUrl": "https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc",
        "24hVolume": "6818750000"
      },...
    ]
  }
}
```

&nbsp;

## 4. GET /cryptocurrencies/:id

Description:

- Get cryptocurrencies by id from 3rd party API

- params

```json
{
  "id": "string"
}
```

_Response (200 - Created)_

```json
[
  {
    "uuid": "Qwsogvtv82FCd",
    "symbol": "BTC",
    "name": "Bitcoin",
    "color": "#f7931A",
    "iconUrl": "https://cdn.coinranking.com/Sy33Krudb/btc.svg",
    "marketCap": "159393904304",
    "price": "9370.9993109108",
    "btcPrice": "1",
    "listedAt": 1483228800,
    "change": "-0.52",
    "rank": 1,
    "sparkline": [
      "9515.0454185372",
      "9540.1812284677",
      "9554.2212643043",
      "9593.571539283",
      "9592.8596962985",
      "9562.5310295967",
      "9556.7860427046",
      "9388.823394515",
      "9335.3004209165",
      "9329.4331700521",
      "9370.9993109108"
    ],
    "coinrankingUrl": "https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc",
    "24hVolume": "6818750000"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Coin Not Found"
}
```

&nbsp;

## 5. GET /news

Description:

- Fetch news from 3rd Party Api

- params

```json
{
  "q": "string"
}
```

_Response (200 - OK)_

```json
{
  "status": "ok",
  "totalResults": 7603,
  "articles": [
    {
      "source": {
        "id": null,
        "name": "Blogspot.com"
      },
      "author": "noreply@blogger.com (Unknown)",
      "title": "Elon Musk reveals who bitcoin's creator Satoshi Nakamoto might be",
      "description": "Musk.MARK RALSTON/AFP via Getty Images\r\nElon Musk seems to agree with many that hyper-secret cryptocurrency expert Nick Szabo could be Satoshi Nakamoto, the mysterious creator of the digital currency Bitcoin. \"You can watch ideas evolve before Bitcoin was lau…",
      "url": "https://techncruncher.blogspot.com/2021/12/elon-musk-reveals-who-bitcoins-creator.html",
      "urlToImage": "https://blogger.googleusercontent.com/img/a/AVvXsEik_48hPzMzsDzwfdUeHj4jNGqYGevEuVjTTPkAGTu9bRN3oePxV6bxF897GK8Az3AaSqUOalYXNG4HSCy0fW5KUHuruCWP8hAfZxgrgbzh-dsbLM9jxyFGCthOZdBCa1dNkqk6mrVl0VtflsV2VvKXfGnwL6-68m-mxp7qHJuLlvqGIahZ9YDe5mt97w=w1200-h630-p-k-no-nu",
      "publishedAt": "2021-12-29T20:41:00Z",
      "content": "Musk.MARK RALSTON/AFP via Getty Images\r\nElon Musk seems to agree with many that hyper-secret cryptocurrency expert Nick Szabo could be Satoshi Nakamoto, the mysterious creator of the digital currency… [+1467 chars]"
    },...
  ]
}
```

## 6. POST /favorites

Description:

- Add user favorite cryptocurrencies to his/her watchlist

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "coinId": "string"
}
```

_Response (201 - Created)_

```json
{
  "userId": "integer",
  "coinId": "string",
  "name": "string",
  "symbol": "string",
  "price": "string",
  "listedAt": "integer",
  "iconUrl": "string",
  "tier": "integer",
  "change": "string",
  "rank": "integer",
  "coinrankingUrl": "string",
  "btcPrice": "string",
  "24hVolume": "string"
},
 "message": "coin has been added to your favorites"
```

_Response (400 - Bad Request)_

```json
{
  "message": "Cannot Add the Same Coin To Your Favorites"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Coin Not Found"
}
```

&nbsp;

## 7. GET /favorites/:coinId

Description:

- Add user favorite cryptocurrencies to his/her watchlist

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "coinId": "string"
}
```

_Response (200 - OK)_

```json
{
  "userId": "integer",
  "coinId": "string",
  "name": "string",
  "symbol": "string",
  "price": "string",
  "listedAt": "integer",
  "iconUrl": "string",
  "tier": "integer",
  "change": "string",
  "rank": "integer",
  "coinrankingUrl": "string",
  "btcPrice": "string",
  "24hVolume": "string"
},
 
```
&nbsp;

_Response (404 - Not Found)_

```json
{
  "message": "Product Not Found"
}
```

## 8. DELETE /favorites/:id

Description:
- Delete user favorite cryptocurrency by id

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "You have removed this coin from your favorites"
}
```


_Response (404 - Not Found)_

```json
{
  "message": "Favorite Not Found"
}
``` 

&nbsp;

## Global Error

_Response (401- Unauthorized)_

```json
{
  "message": "Invalid Token"
}
OR
{
  "message": "Token Expired"
}
```

_Response (403- Forbidden)_

```json
{
  "message": "Unauthorized"
}

```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```