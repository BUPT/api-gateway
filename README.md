# API Gateway
## What is a API Gateway for?
## What is our API Gateway for?
A API Gateway System Implemented by TypeScript

# Modules

## Module 1

@linyimin

Register API which described by swagger specification using the yaml syntax to API Gateway.

### Install

#### Dependencies

1. Node.js >= 8 (8 is recommend)
2. TypeScript >= 1.2

### Run

When run the whole system using the Following instructions,this module will work.

```
npm start
```

------

This module expose several APIs for registering API.

1. Register:Initialize the whole system,and register the default swagger.yaml file store in the ./views/uploads/swagger derectory.

```
http://localhost:8001/apis/register
```
------

2. Upload:Upload a yaml file and add the API to API Gateway

```
http://localhost:8001/apis/uploads
```

------

3. View: Check out the registered API.

```
htpp://localhost:8001/apis/viewAPIs?fileName=yourRegisterfileName
```

------


## Module 2

@someone

Here is the module description


### Install

Here descript how to install this module, i.e.: environment dependencies.

### Run

Here descript how to run this module.
