meteor --port 3040

1. Dr有自己的dburl（内网、读写权限）
2. Dr建立读写两个connections
3. Dr的connections publish(根据userId读写权限过滤mongourl)
4. Dr的认证和其他系统之间的认证
5. 路由权限验证


pup系统
Meteor._localStorage.getItem('Meteor.loginToken')
Accounts._storedLoginToken();

Dr系统
client -> authenticate -> getUserByToken(pup) -> setUserId
