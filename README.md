# API-Gateway
使用：
##运行程序
```
cd API-Gateway
node ./build/app.js
```

## 查看管理员接口
```
http://localhost:8001/apis/viewAPIs
```

## 初始化注册接口
```
http://localhost:8001/apis/register
```

## 上传swagger配置文件注册接口
```
http://localhost:8001/apis/uploads
```

## 用户注册接口
```
http://localhost:8001/user/register
```

## 用户登录接口
```
http://localhost:8001/user/doLogin
```

## 查看不同swagger文件注册接口
```
http://localhost:8001/apis/viewAPIs?fileName=fileName
```
其中fileName为swagger配置文件的名称(包含.yaml扩展名)

## 向外提供访问的url
```
http://localhost:8000/path
```
其中path为真实访问url的访问路径