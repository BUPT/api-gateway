var APIGateway = angular.module('APIGateway', [
    'apiGatewayCtrls', 'ngDialog'
]); //module作为启动点，告诉该项目依赖哪些模块----依赖注入，ng开头是自带的，不用自己定义，如果出现了未定义的模块会报错