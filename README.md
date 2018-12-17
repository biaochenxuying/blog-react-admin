
![效果图1.gif](https://upload-images.jianshu.io/upload_images/12890819-226f48af9087c3cf.gif?imageMogr2/auto-orient/strip)

![效果图 2](https://upload-images.jianshu.io/upload_images/12890819-f3b950acbffb944b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 前言

此 blog-react-admin 项目是基于 [蚂蚁金服开源的 ant design pro](https://pro.ant.design/index-cn) 之上，用 react 全家桶 + Ant Design  的进行再次开发的，项目已经开源，项目地址在 github 上。

效果预览 [https://preview.pro.ant.design/user/login](https://preview.pro.ant.design/user/login)

# 1. 后台管理

## 1.1 已经实现功能

- [x] 登录  
- [x] 文章管理
- [x] 标签管理  
- [x] 留言管理
- [x] 用户管理
- [x] 友情链接管理
- [x] 时间轴管理
- [x] 富文本编辑器（支持 MarkDown 语法）

## 1.2 待实现功能

- [ ] 点赞、留言和评论 的通知管理
- [ ] 评论管理
- [ ] 个人中心（用来设置博主的各种信息）
- [ ] 工作台（ 接入百度统计接口，查看网站浏览量和用户访问等数据 ）

# 2. 主要项目结构

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
  - Tag 标签管理
  - TimeAsix 时间轴
  - User 登录注册管理
```

文章管理、用户管理、留言等 具体业务需求，都是些常用的逻辑可以实现的，也很简单，这里就不展开讲了。

# 3. 添加富文本编辑器，同样支持 markdown 语法 

添加的编辑器为 [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)

效果图


![效果图1](https://user-images.githubusercontent.com/24362914/49021611-01c45080-f1ce-11e8-988a-8c1064a448de.png)


参考的文章为 [react 搭建博客---支持markdown的富文本编辑器](https://segmentfault.com/a/1190000010616632)


# 4. 使用

使用详情请查看 [Ant Design Pro ](https://pro.ant.design/docs/getting-started-cn)，因为本项目也是在这个基础之上，按这个规范来构建的。


# 5. 缺点

开发时，程序出错后，修改正确后，webpack 有时不会及时查觉到内容已经更改，从而不能及时编译，要重新运行命令打包。

# 6. 项目地址

开源不易，如果觉得该项目不错或者对你有所帮助，欢迎到 github 上给个 star，谢谢。

**项目地址：**
> [前台展示: https://github.com/biaochenxuying/blog-react](https://github.com/biaochenxuying/blog-react)

> [管理后台：https://github.com/biaochenxuying/blog-react-admin](https://github.com/biaochenxuying/blog-react-admin)

> [后端：https://github.com/biaochenxuying/blog-node](https://github.com/biaochenxuying/blog-node)

> [blog：https://github.com/biaochenxuying/blog](https://github.com/biaochenxuying/blog)

**本博客系统的系列文章：**

- 1. [react + node + express + ant + mongodb 的简洁兼时尚的博客网站](http://biaochenxuying.cn/articleDetail?article_id=5bf57a8f85e0f13af26e579b)
- 2. [react + Ant Design + 支持 markdown 的 blog-react 项目文档说明](http://biaochenxuying.cn/articleDetail?article_id=5bf6bb5e85e0f13af26e57b7)
- 3. [基于 node + express + mongodb 的 blog-node 项目文档说明](http://biaochenxuying.cn/articleDetail?article_id=5bf8c57185e0f13af26e7d0d)
- 4. [服务器小白的我,是如何将node+mongodb项目部署在服务器上并进行性能优化的](http://biaochenxuying.cn/articleDetail?article_id=5bfa728bb54f044b4f9da240)

# 7. Build Setup ( 构建安装 )

``` 
# install dependencies
npm install 

# serve with hot reload at localhost: 3000
npm start 

# build for production with minification
npm run build 
```

如果要看完整的效果，是要和后台项目  **[blog-node](https://github.com/biaochenxuying/blog-node)** 一起运行才行的，不然接口请求会失败。


# 8. 项目常见问题

## 8.1 管理员账号创建

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

## 8.2 端口

本地开发时，blog-react 和 blog-node 默认启动的端口是相同的，都是 3000。
**所以要先启动 blog-node 项目，再启动 blog-react 项目，而且 blog-react 的端口用另外一个打开。**

## 8.3 权限

注册了管理员账号，并用管理员账号登录，还不能正常登录管理后台的，会被重定向加登录页面。因为权限管理的限制，要把自己注册的管理员账号的 **名字** 加在 config/router.config.js 的 authority 里面。

详情请看：


```
https://pro.ant.design/docs/authority-management-cn
```

# 9. 最后


鉴于问问题的人有点多，小汪时间有限，处理不过来，大家可以加入 QQ 群：**186045338**，加群暗号：**全栈修炼** ，一起相互交流学习。


对 **全栈开发** 有兴趣的朋友可以扫下方二维码关注我的公众号，我会不定期更新有价值的内容。

关注公众号并回复 **福利** 便免费送你视频资源，绝对干货。

福利详情请点击：  [免费资源分享--Python、Java、Linux、Go、node、vue、react、javaScript](https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&mid=2247483711&idx=1&sn=1ffb576159805e92fc57f5f1120fce3a&chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&token=1560489745&lang=zh_CN#rd)

![BiaoChenXuYing](https://upload-images.jianshu.io/upload_images/12890819-091ccce387e2ea34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




