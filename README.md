
![效果图1.gif](https://upload-images.jianshu.io/upload_images/12890819-226f48af9087c3cf.gif?imageMogr2/auto-orient/strip)

![文章列表效果](https://upload-images.jianshu.io/upload_images/12890819-470c8996b8ebdfaf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![评论审核效果](https://upload-images.jianshu.io/upload_images/12890819-80ae92fc0e493805.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 前言

此 blog-react-admin 项目是基于 [蚂蚁金服开源的 ant design pro](https://pro.ant.design/index-cn) 之上，用 react 全家桶 + Ant Design  的进行再次开发的，项目已经开源，项目地址在 github 上。

效果预览 [https://preview.pro.ant.design/user/login](https://preview.pro.ant.design/user/login)


## 已实现功能

- [x] 登录  
- [x] 文章管理
- [x] 标签管理  
- [x] 留言管理
- [x] 用户管理
- [x] 友情链接管理
- [x] 时间轴管理
- [x] 富文本编辑器（支持 MarkDown 语法）
- [x] 项目展示
- [x] 评论管理

## 待实现功能

- [ ] 个人中心（用来设置博主的各种信息）
- [ ] 工作台（ 接入百度统计接口，查看网站浏览量和用户访问等数据 ）

## 主要项目结构

```
- pages
  - Account 博主个人中心
  - article 文章管理
  - Category 分类
  - Dashboard 工作台
  - Exection 403 404 500 等页面
  - Link 链接管理
  - Message 留言管理
  - OtherUser 用户管理
  - Project 项目
  - Tag 标签管理
  - TimeAsix 时间轴
  - User 登录注册管理
```

文章管理、用户管理、留言等 具体业务需求，都是些常用的逻辑可以实现的，也很简单，这里就不展开讲了。

## 添加富文本编辑器，同样支持 markdown 语法 

添加的编辑器为 [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)

效果图


![效果图1](https://user-images.githubusercontent.com/24362914/49021611-01c45080-f1ce-11e8-988a-8c1064a448de.png)


参考的文章为 [react 搭建博客---支持markdown的富文本编辑器](https://segmentfault.com/a/1190000010616632)


## 搭建

使用详情请查看 [Ant Design Pro ](https://pro.ant.design/docs/getting-started-cn)，因为本项目也是在这个基础之上，按这个规范来构建的。


## 缺点

开发时，程序出错后，修改正确后，webpack 有时不会及时查觉到内容已经更改，从而不能及时编译，要重新运行命令打包。

笔者的文章里面的图片都是上传到简书上的，创建文章时，只是写个图片链接而已，你们也可以上传到简书或者七牛云，或者其他第三方。


## Build Setup ( 构建安装 )

``` 
# install dependencies
npm install 

# serve with hot reload at localhost: 3000
npm start 

# build for production with minification
npm run build 
```

如果要看完整的效果，是要和后台项目  **[blog-node](https://github.com/biaochenxuying/blog-node)** 一起运行才行的，不然接口请求会失败。


## 项目常见问题


### 管理后台登录

管理后台登录是用 **邮箱加密码** 进行登录


### 管理员账号创建

![](https://upload-images.jianshu.io/upload_images/12890819-67861a912768e646.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

管理后台的登录账号并不是 admin/user ，也不是搭建 mongodb 数据库时创建的 user 用户，这里的账号和密码要自己创建，至于怎样创建呢？

### 用 postman 调接口注册

如果是本地的可以像这样子创建，如果是服务器上的，请把 url 修改一下，


![注册](https://upload-images.jianshu.io/upload_images/12890819-3772744f72b8ed3e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 1.  url 

```
http://127.0.0.1:3000/register
```

- 2. param
```
{
 "name": "BiaoChenXuYing",
 "password": "888888",
 "email": "admin@qq.com",
 "phone": 1380013800,
 "type": 0,
 "introduce":"加班到天明，学习到昏厥!!! 微信公众号：【 BiaoChenXuYing 】，分享 WEB 全栈开发等相关的技术文章，热点资源，全栈程序员的成长之路。"
}
```
这里的 type 为 0 是管理员账号，为 1 时，是普通用户。

### 权限

注册了管理员账号，并用管理员账号登录，还不能正常登录管理后台的，会被重定向加登录页面。因为权限管理的限制，要把自己注册的管理员账号的 **名字** 加在 config/router.config.js 的 authority 里面。

详情请看：

```
https://pro.ant.design/docs/authority-management-cn
```

### 登录

登录博客管理后台是用 **邮箱** 加 **密码** 登录。

## 项目地址与文档教程

开源不易，如果觉得该项目不错或者对你有所帮助，欢迎到 github 上给个 star，谢谢。

**项目地址：**

> [前台展示: https://github.com/biaochenxuying/blog-react](https://github.com/biaochenxuying/blog-react)

> [前台展示: https://github.com/biaochenxuying/blog-vue-typescript](https://github.com/biaochenxuying/blog-vue-typescript)

> [管理后台：https://github.com/biaochenxuying/blog-react-admin](https://github.com/biaochenxuying/blog-react-admin)

> [后端：https://github.com/biaochenxuying/blog-node](https://github.com/biaochenxuying/blog-node)

> [blog：https://github.com/biaochenxuying/blog](https://github.com/biaochenxuying/blog)

**本博客系统的系列文章：**

- 1. [react + node + express + ant + mongodb 的简洁兼时尚的博客网站](https://biaochenxuying.cn/articleDetail?article_id=5bf57a8f85e0f13af26e579b)
- 2. [react + Ant Design + 支持 markdown 的 blog-react 项目文档说明](https://biaochenxuying.cn/articleDetail?article_id=5bf6bb5e85e0f13af26e57b7)
- 3. [基于 node + express + mongodb 的 blog-node 项目文档说明](https://biaochenxuying.cn/articleDetail?article_id=5bf8c57185e0f13af26e7d0d)
- 4. [服务器小白的我,是如何将 node+mongodb 项目部署在服务器上并进行性能优化的](https://biaochenxuying.cn/articleDetail?article_id=5bfa728bb54f044b4f9da240)
- 5. [github 授权登录教程与如何设计第三方授权登录的用户表](https://biaochenxuying.cn/articleDetail?article_id=5c7bd34e42b55e2ecc90976d)
- 6. [一次网站的性能优化之路 -- 天下武功，唯快不破](https://biaochenxuying.cn/articleDetail?article_id=5c8ca2d3b87b8a04f1860c9a)
- 7. [Vue + TypeScript + Element 搭建简洁时尚的博客网站及踩坑记](https://biaochenxuying.cn/articleDetail?article_id=5c9d8ce5f181945ddd6b0ffc)
- 8. [前端解决第三方图片防盗链的办法 - html referrer 访问图片资源403问题](https://biaochenxuying.cn/articleDetail?article_id=5cfcc6798090bd3c84138a08)


## 服务器

笔者觉得每个开发者都应该拥有自己的网站和服务器，这可是很酷的事情，学习 Linux、跑跑脚本、建站、搭博客啥的都行啊。

因为笔者就有自己的服务器，而且有两台了，用于平时的学习，还搭建了自己的网站。

有不少读者问过我，为什么我学的那么快的呢 ？ 怎么在一年内学了那么知识的...

其实也没什么秘决，就是平时有自己的服务器了，就爱折腾，学到的知识能很快得到验证，所以学起来兴致高一点。

特别是大三和大四的学生，买了服务器，搭建个项目给面试官看也香，对找工作和面试都加分，还可以熟悉技术栈。

[想学得快，就得有自己的服务器来折腾才行（低于 1 折、89/年、229/3年，比学生机还便宜）](https://biaochenxuying.cn/articleDetail?article_id=5de65dd90283dc742f8f633a)

比如笔者的两个网站：

> https://biaochenxuying.cn/

> https://www.kwgg2020.com/



## 最后

如果您觉得本项目和文章不错或者对你有所帮助，请给个星吧，你的肯定就是我继续创作的最大动力。

<!-- 鉴于问问题的人有点多，笔者时间有限，处理不过来，大家可以加入 QQ 群：**186045338**，加群暗号：**全栈修炼** ，一起相互交流学习。 -->


