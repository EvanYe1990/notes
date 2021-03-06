# 阿里云ECS安装Mongodb数据库

## 安装说明  
软件安装位置: /usr/local/mongodb  
数据存放位置: /usr/local/mongodb/data  
日志存放位置: /usr/local/mongodb/logs  

### [下载Mongdb安装包](https://www.mongodb.com/download-center#community)
> [root@iZbp14vaxi src]# wget https://www.mongodb.com/download-center#community  

```
[root@iZbp14vaxi src]# wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.9.tgz
--2017-09-14 13:48:34--  https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.9.tgz
正在解析主机 fastdl.mongodb.org (fastdl.mongodb.org)... 52.84.49.94, 52.84.49.83, 52.84.49.250, ...
正在连接 fastdl.mongodb.org (fastdl.mongodb.org)|52.84.49.94|:443... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：86766439 (83M) [application/x-gzip]
正在保存至: “mongodb-linux-x86_64-3.4.9.tgz”

100%[==============================================================================>] 86,766,439   428KB/s 用时 6m 17s 

2017-09-14 13:54:53 (225 KB/s) - 已保存 “mongodb-linux-x86_64-3.4.9.tgz” [86766439/86766439])
```

### 解压Mongodb安装包
> [root@iZbp14vaxi src]# tar -zxvf mongodb-linux-x86_64-3.4.9.tgz   

```
mongodb-linux-x86_64-3.4.9/README
mongodb-linux-x86_64-3.4.9/THIRD-PARTY-NOTICES
mongodb-linux-x86_64-3.4.9/MPL-2
mongodb-linux-x86_64-3.4.9/GNU-AGPL-3.0
mongodb-linux-x86_64-3.4.9/bin/mongodump
mongodb-linux-x86_64-3.4.9/bin/mongorestore
mongodb-linux-x86_64-3.4.9/bin/mongoexport
mongodb-linux-x86_64-3.4.9/bin/mongoimport
mongodb-linux-x86_64-3.4.9/bin/mongostat
mongodb-linux-x86_64-3.4.9/bin/mongotop
mongodb-linux-x86_64-3.4.9/bin/bsondump
mongodb-linux-x86_64-3.4.9/bin/mongofiles
mongodb-linux-x86_64-3.4.9/bin/mongooplog
mongodb-linux-x86_64-3.4.9/bin/mongoreplay
mongodb-linux-x86_64-3.4.9/bin/mongoperf
mongodb-linux-x86_64-3.4.9/bin/mongod
mongodb-linux-x86_64-3.4.9/bin/mongos
mongodb-linux-x86_64-3.4.9/bin/mongo
```

### 移动到指定目录
> [root@iZbp14vaxi src]# mv mongodb-linux-x86_64-3.4.9 /usr/local/mongodb

### 创建数据库文件和日志目录
> [root@iZbp14vaxi src]# mkdir /usr/local/mongodb/data  
> [root@iZbp14vaxi src]# mkdir /usr/local/mongodb/logs  

### 编辑开机启动配置文件rc.local
> [root@iZbp14vaxi src]# vi /etc/rc.local  

### 把Mongodb添加到开机启动项内(在rc.local中添加以下配置)
/usr/local/mongodb/bin/mongod --dbpath=/usr/local/mongodb/data --logpath=/usr/local/mongodb/dblog.log -fork

### 启动Mongodb
> [root@iZbp14vaxi src]# /usr/local/mongodb/bin/mongod --dbpath=/usr/local/mongodb/data --logpath=/usr/local/mongodb/dblog.log -fork  

```
about to fork child process, waiting until server is ready for connections.
forked process: 9274
child process started successfully, parent exiting
```
