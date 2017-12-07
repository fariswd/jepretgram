# exp-temp
My express template 

## Endpoint API
| Endpoint       | HTTP   | Require                  | Description         |
|----------------|--------|--------------------------|---------------------|
| /              | GET    | -                        | Welcome Page        |
| /blog          | POST   | token(header), newpost   | Post new blog       |
| /blog/all      | GET    | -                        | Get blog post       |
| /blog/:id      | GET    | token(header),id(params) | Get blog post       |
| /blog/:id      | DELETE | token(header),id(params) | Delete blog post    |
| /signin        | POST   | username, password       | return token        |
| /signup        | POST   | username, password       | return token        |
| /verify        | POST   | token(header)            | return status login | 

## Before you start
1. start mongo
```
mongod
```
2. npm command
```
npm test
npm start
```

## Use custom command
1. Make text file  
```
#!/bin/bash
git clone git@github.com:fariswd/exp-temp.git
mv ./exp-temp ./express-project
mv ./express-project/.env-template ./express-project/.env
rm -f -r -- ./express-project/.git
```
2. save  it to /usr/bin/whatever-you-name (for called in command later)  
3. change permission  
```
chmod +x /usr/bin/whatever-you-name
```
4. type in your terminal
```
whatever-you-name
```
5. :rocket: