# truefeedback-api

Express.js API for TrueFeedback, built with JavaScript and CommonJS.

## Setup

1. Install the dependencies with `npm install`.
2. Copy `.env.example` to `.env` and adjust the values as needed.
3. Start the server with `npm start`.

The server listens on port `5000` by default. Set `PORT` in the environment to use a different port.

## API

### `GET /api/v1/health`

Returns the API health status:

```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "service": "truefeedback-api",
    "status": "healthy"
  }
}
```

Unknown routes return a JSON 404 response with `"status": "error"`.
