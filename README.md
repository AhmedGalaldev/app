# How to run this application

## Installation


```bash
git clone https://github.com/AhmedGalaldev/khazna-app.git
```
```bash
npm run install
```
Create .env file and add the following environment variables
```bash
NODE_ENV=development
DATABASE_NAME=name
DATABASE_USERNAME=user
DATABASE_PASSWORD=password
```

open postman and hit this routes

register (POST method)
```bash
http://localhost:5000/api/register
```
login (POST method)
```bash
http://localhost:5000/api/login
```
products (GET method)
```bash
http://localhost:5000/api/products
```

Buy Product (POST method)
```bash 
http://localhost:5000/api/products/1
```
Cancel operation (POST method)
```bash 
http://localhost:5000/api/products/1/canceled
```

