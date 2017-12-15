# API Gateway
## What is API Gateway for?

An API Gateway sits in front of your application(s) and/or services and manages the heavy lifting of authorisation, access control and throughput limiting to your services. Ideally, it should mean that you can focus on creating services instead of implementing management infrastructure. For example, if you have written a really awesome web service, and you want to make it public, integrating an API gateway is a faster, more secure route than writing your own authorisation middleware.

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

@sunmeijie

Here is the module description

User management of API Gateway (Provide sub-user management functions)

### Install

Here descript how to install this module, i.e.: environment dependencies.

Import the required JavaScript file

### Run

Here descript how to run this module.

Open in browser

------


## Module 3

@xuxiangyu

public/API combination

A visual API combination system based on an open source project called SVGDragTree on github.
The system can combine a composite API by dragging and dropping atomic atom API, and the composite API can be registered into the API gateway to use.

### Install

#### Dependencies

1. angular
2. bootstrap
3. jquery
4. SDT

All js files are imported via the <script> tag：

```
<script src="framework/jquery.min.js" type="text/javascript"></script>
<script src="framework/bootstrap.min.js"></script>
<script src="framework/angular.js"></script>
<script src="framework/SDT.js" type="text/javascript" defer="defer" charset="utf-8"></script>
```

### Run

The system can be run by opening "index.html" directly in the browser.

All types of APIs are displayed on the left side of the system. By dragging and dropping the node onto the canvas, click on the node to see all the properties of the API in the property setting area on the right, and it can be set. We can set the API to be synchronized or asynchronous execution, the implementation of the conditions, and so on.  click Save, the atomic API is set to be completed.

After setting up all the atomic APIs, click "Register" to register the combined combination API into the API gateway and use it.

------

## Module 4 

@konghuihui 

API GateWay is a scalable, open source API Layer. API GateWay provides functionalities and services such as requests routing, authentication, Service monitoring, etc. 

### Managing APIs 

The page of Managing APIs include descriptions of the fields to which the API sets belong. Click on a field to view the classification information of all  API information and add, modify, and delete the specified APIs. 

### Install

  #### Dependencies

1. angular.js
2. bootstrap

------

Import the JavaScript file:  

```
 <script src="js/angular-1.3.0.js"></script> 
<script src="js/angular-animate.js"></script>
 <script src="js/angular-ui-router.js"></script> 
<script src="UIRoute3.js"></script> 
```

### Run 

Download UI-Router: 

```
 https://angular-ui.github.io/ 
```

You can now run your API GateWay by opening UIRoute3.html in your browser.

------