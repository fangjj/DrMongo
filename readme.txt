meteor --settings settings-development.json --port 3040
MONGO_URL=mongodb://localhost:3041/meteor meteor --settings settings-development.json --port 3050


ready
1. Dr连接自己只读MongoDBUrl(内网)
2. Dr所有路由需要read权限
3. Dr connections publish 只读connections(通过坏境变量设置只读的MongoDBurl->connections)


write
1. Dr连接自己可读写MongoDBUrl（内网）
2. Dr所有路由需要write权限
3. Dr connections publish all connections(不改)
4. 新建自己MongoDBURL（可读写）connections和其他系统的MongoDB（可读写）（只读）connections


系统跳转认证
pup系统
Meteor._localStorage.getItem('Meteor.loginToken')
Accounts._storedLoginToken();

Dr系统
client -> authenticate -> getUserByToken(pup) -> setUserId

坑：
1. 刷新页面时候methods丢失了this.userId
2. 在所有路由中，添加sessionStorage.DrLoginToken,如果没有this.userId,有DrLoginToken，重新认证一下。
3. 参数化
