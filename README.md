# Backend Analyst Candidate Testing

Project developed for a [challenge of Anota Ai](https://github.com/anotaaidev/test-backend-nodejs).

## Get started
---
before you start, you will need to install the following tools:
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [VSCode](https://code.visualstudio.com/)
- [MongoDB](https://www.mongodb.com/)

### First steps:
---
Clone the repository and install the packages

```shell

# clone this repository
git clone https://github.com/sergiolmendonca/test-backend-nodejs.git

# change to repository directory
cd test-backend-nodejs

# install the dependencies
npm install

# run the application
npm run start

```

### project structure:
---
Structure of the project folders and files
```

__config files
__Postman Collection
  __AnotaAi-API Test.postman_collection.json
__src
  __controllers
    __CategoryController.js
    __ProductController.js

  __database
    __config.js

  __models
    __Category.js
    __Product.js

  __routes.js
  __server.js

```
## API Endpoints
---
there is a Postman's colletion in the project to make tests easier.
### Get Categories
It lists all categories in the database
```
[GET] /category
```
Response examples:
- Status 200
```json
{
    "categories": [
        {
            "_id": "60c16c0b446f3831741eff78",
            "name": "eletronics",
            "__v": 0
        },
        {
            "_id": "60c1868085630b0c2ce972e7",
            "name": "food",
            "__v": 0
        }
    ],
    "total": 2
}
```
- Status 500
```json
{
  "message": "Internal error."
}
```
### Create Category
It creates a new category
```
[POST] /category
```
Response examples:
- Status 201
```json
{
    "_id": "60c196652a714c2f30fab42f",
    "name": "shoes",
    "__v": 0
}
```
- Status 400
```json
{
    "message": "name is mandatory!"
}
```
- Status 409
```json
{
    "message": "The Category eletronics already exists."
}
```

- Status 500
```json
{
  "message": "Internal error."
}
```
### Get Products
It lists all products in the database
```
[GET] /products
```
Response examples:
- Status 200
```json
{
    "products": [
        {
            "_id": "60c186b685630b0c2ce972e8",
            "title": "PC",
            "description": "Personal Computer",
            "price": 1000.35,
            "category": {
                "_id": "60c16c0b446f3831741eff78",
                "name": "eletronics",
                "__v": 0
            },
            "__v": 0
        }
    ],
    "total": 1
}
```
- Status 500
```json
{
  "message": "Internal error."
}
```
### Create Product
It create a new product
```
[POST] /product
```
Response examples:
- Status 201
```json
{
    "_id": "60c1982a2a714c2f30fab430",
    "title": "PC",
    "description": "Personal Computer",
    "price": 4500.99,
    "category": "60c16c0b446f3831741eff78",
    "__v": 0
}
```
- Status 400
```json
{
    "message": "Title is mandatory!"
}
```
- Status 404
```json
{
    "message": "Category no-category not found."
}
```
- Status 409
```json
{
    "message": "Product PC already exists."
}
```
- Status 500
```json
{
  "message": "Internal error."
}
```
### Update product
It updates an existing 
```
[PUT] /product/:id
```
Response examples:
- Status 200
```json
{
    "message": "Product up to date."
}
```
- Status 404
```json
{
    "message": "Product not found."
}
```
- Status 500
```json
{
  "message": "Internal error."
}
```
### Delete product
It deletes a product
```
[DELETE] /product/:id
```
Response examples:
- Status 200
```json
{
    "message": "Product deleted."
}
```
- Status 404
```json
{
    "message": "Product not found."
}
```
- Status 500
```json
{
  "message": "Internal error."
}
```
### Filter products
It filter the products by name or category
```
[GET] /product?category=eletronics
[GET] /product?name=PC
```
Response examples:
- Status 200
```json
[
    {
        "_id": "60c186b685630b0c2ce972e8",
        "title": "PC",
        "description": "Personal Computer",
        "price": 1000.35,
        "category": {
            "_id": "60c16c0b446f3831741eff78",
            "name": "eletronics",
            "__v": 0
        },
        "__v": 0
    },
    {
        "_id": "60c198f02a714c2f30fab431",
        "title": "PC",
        "description": "Personal Computer",
        "price": 4500.99,
        "category": {
            "_id": "60c16c0b446f3831741eff78",
            "name": "eletronics",
            "__v": 0
        },
        "__v": 0
    }
]
```
- Status 404
```json
{
    "message": "Category not found."
}
```
- Status 500
```json
{
  "message": "Internal error."
}
```
## Tecnologies
---
- Node.js
- VSCode
- MongoDB
- Express

