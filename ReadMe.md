# 项目搭建

## 初始化

### 创建项目

```shell
# 创建项目
mkdir ts-snake & cd ts-snake

# 初始化项目，生成package.json
npm init -y

# 创建源码文件，打包输出文件目录
mkdir src dist

# 从webpack-test项目拷贝已经存在配置 .gitignore,package.json (手动合并),tsconfig.json,webpack.config.js
```

### 复用配置

#### .gitignore

```shell
# .gitignore
.idea
node_modules
*.iml
.DS_Store
```

#### package.json

```json
// package.json
{
  "name": "ts-snake",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --open '/Applications/Google Chrome.app'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^3.0.0",
    "core-js": "^3.8.1",
    "html-webpack-plugin": "^4.5.0",
    "ts-loader": "^8.0.12",
    "typescript": "^4.1.3",
    "webpack": "^5.11.1",
    "webpack-cli": "^4.3.0",
    "webpack-dev-server": "^3.11.1"
  }
}
```

#### tsconfig.json

```json
{
  "compilerOptions": {
    "module": "CommonJS", // 模块规范
    "target": "ES2015", // 编译规范
    "strict": true, // 启用严格模式
    "noEmitOnError": true // 打包异常不输出
  }
}
```

#### webpack.config.js

```js
// webpack.config.js
// 引入path包
const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

// webpack中所有配置信息都应写在exports
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",
    // 指定编译输出
    output: {
        // 编译输出目录
        path: path.resolve(__dirname,"dist"),
        // 打包后合并为一个文件
        filename: "bundle.js",
        environment: {
            // 使用 babel 可以将ts中 箭头函数转换为ie也能执行的function(),
            // 但bundle.js开头的(()=>...) 是webpack生成的，babel无法修改，因此要控制不使用箭头函数，需要再此处配置
            arrowFunction: false
        }
    },
    // webpack打包需要依赖的模块
    module: {
        rules: [
            {
                // 指定规则生效文件，此处是值.ts结尾文件
                test: /\.ts$/,
                // 打包使用ts-loader插件
                use:[
                    // 复杂方式配置babel加载器
                    {
                        loader: "babel-loader",
                        options: {
                            presets:[
                                [
                                    "@babel/preset-env",
                                    {
                                        // 要兼容目标浏览器
                                        targets:{
                                            "chrome":"88",
                                            "ie":"11",
                                        },
                                        // 指定corejs 版本
                                        "corejs":"3",
                                        // 按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader', // 从后往前执行（第一个执行）
                ],
                // 打包排除文件
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title:"自定义html标题"
            template: "./src/template.html"
        }),
    ],
    resolve: {
        extensions: [".ts",".js"]
    }
}
```

## 参照配置补充缺项文件

### src/index.ts

```typescript
// src/index.ts  入口文件
console.info("hello")
```

### src/template.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="div1">这是一个div</div>
</body>
</html>
```

### 尝试打包运行

```shell
# 使用打包命令打包，观察dist目录下是否正常输出
npm run build 

# 运行测试
npm start 
```

## 添加css样式支持

#### 安装less插件

```shell
# less插件功能是支持对css文件自动加载，less对于 css，就如同html-webpack-plugin对于html
npm i -D less less-loader style-loader
```

#### 安装postcess插件

```shell
# css 前置加载插件，解决css的浏览器兼容问题，postcss 对于css 就如同babel对于js，都是改写目标文件，使其适配各自环境浏览器
npm i -D postcss postcss-loader postcss-preset-env
```

```json
// package.json
{
  "name": "ts-snake",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --open '/Applications/Google Chrome.app'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^3.0.0",
    "core-js": "^3.8.1",
    "css-loader": "^5.0.1",  // <<< 
    "html-webpack-plugin": "^4.5.0",
    "less": "^4.0.0", // <<< 
    "less-loader": "^7.2.1", // <<< 
    "postcss": "^8.2.2", // <<< 
    "postcss-loader": "^4.1.0", // <<< 
    "postcss-preset-env": "^6.7.0", // <<< 
    "style-loader": "^2.0.0", // <<< 
    "ts-loader": "^8.0.12",
    "typescript": "^4.1.3",
    "webpack": "^5.11.1",
    "webpack-cli": "^4.3.0",
    "webpack-dev-server": "^3.11.1"
  }
}
```

#### 新增样式文件

```css
// src/style/index.less
body{
  background-color: #bfa;
  display: flex; // 检验postcss是否生效，生效的话，会在flex前加前缀
}
```

```shell
# 重新打包 
npm run build

# 运行，浏览器正常是可以看到css样式效果
npm start

# 打包后bundle.js文件出现带-ms前缀的flexbox属性
# display: -ms-flexbox;
```

## 步骤

```shell
# 创建蛇
# 创建食物
# 创建记分牌
# 蛇移动
# 蛇吃食物
# 蛇长身体
# 蛇移动身体联动
# 蛇撞墙终止游戏
# 蛇撞自己终止游戏
# 游戏升级上限
```







