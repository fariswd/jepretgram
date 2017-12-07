# jepretgram
Sebuah aplikasi sharing foto  

## Use this app?
1. npm install
2. npm start
3. :rocket:

## Endpoint API
| Endpoint     | HTTP | Require | Description |
|--------------|------|---------|-------------|
| /api/signfb  | POST | fb(token) | Auth FB   |
| /api/signup  | POST | username & password  | Auth (Register) |
| /api/signin  | POST | username & password | Auth (login) return token jwt |
| /api/jepret  | POST | token, image, caption | post new jepret |
| /api/jepret  | GET  | token | get all my jepret |
| /api/jepret/:id  | GET  | - | get specific jepret |
| /api/jepret/:id  | PUT | token, newCaption | update caption jepret |
| /api/jepret/:id  | DELETE | token | delete jepreted post |
