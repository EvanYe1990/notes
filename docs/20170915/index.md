# 阿里云ECS(CentOS)安装git

### [获取最新版git](https://github.com/git/git/releases)
> [root@iZbp14vaxib09lsim5s3n6Z src]# wget https://github.com/git/git/archive/v2.14.1.tar.gz  

```
--2017-09-14 16:31:14--  https://github.com/git/git/archive/v2.14.1.tar.gz
正在解析主机 github.com (github.com)... 192.30.255.112, 192.30.255.113
正在连接 github.com (github.com)|192.30.255.112|:443... 已连接。
已发出 HTTP 请求，正在等待回应... 302 Found
位置：https://codeload.github.com/git/git/tar.gz/v2.14.1 [跟随至新的 URL]
--2017-09-14 16:31:15--  https://codeload.github.com/git/git/tar.gz/v2.14.1
正在解析主机 codeload.github.com (codeload.github.com)... 192.30.255.121, 192.30.255.120
正在连接 codeload.github.com (codeload.github.com)|192.30.255.121|:443... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：6983655 (6.7M) [application/x-gzip]
正在保存至: “v2.14.1.tar.gz”

100%[==============================================================================>] 6,983,655   4.59MB/s 用时 1.5s   

2017-09-14 16:31:17 (4.59 MB/s) - 已保存 “v2.14.1.tar.gz” [6983655/6983655])

```

### 解压git
> [root@iZbp14vaxib09lsim5s3n6Z src]# tar -zxvf v2.14.1.tar.gz  

```
git-2.14.1/
git-2.14.1/.gitattributes
git-2.14.1/.github/
git-2.14.1/.github/CONTRIBUTING.md
git-2.14.1/.github/PULL_REQUEST_TEMPLATE.md
git-2.14.1/.gitignore
git-2.14.1/.gitmodules
git-2.14.1/.mailmap
git-2.14.1/.travis.yml
git-2.14.1/COPYING
git-2.14.1/Documentation/
git-2.14.1/Documentation/.gitattributes
git-2.14.1/Documentation/.gitignore
git-2.14.1/Documentation/CodingGuidelines
git-2.14.1/Documentation/Makefile
git-2.14.1/Documentation/RelNotes/
git-2.14.1/Documentation/RelNotes/1.5.0.1.txt
......
git-2.14.1/xdiff/xmacros.h
git-2.14.1/xdiff/xmerge.c
git-2.14.1/xdiff/xpatience.c
git-2.14.1/xdiff/xprepare.c
git-2.14.1/xdiff/xprepare.h
git-2.14.1/xdiff/xtypes.h
git-2.14.1/xdiff/xutils.c
git-2.14.1/xdiff/xutils.h
git-2.14.1/zlib.c

```

### 编译git源码

