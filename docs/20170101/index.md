# Web缓存机制总结

Web缓存用于减少网络带宽，降低服务器压力，降低网络延迟从而提升加载性能。

## Cache-Control
HTTP1.1标准新加字段。  
用于控制本地资源缓存有效时长（请求发出后开始计算），在有效缓存时间内不再向服务器发出请求。
> Cache-Control: max-age=3600 (3600秒内使用缓存文件)  
> Cache-Control: no-cache (每一次请求都从服务器获取)  
> Cache-Control: private (待验证)  
> Cache-Control: must-revalidate (待验证)  

## Last-Modified
用于标识该资源在服务器上最近的更新时间。  
第一次请求服务器响应200，同时响应头携带Last-Modified，标记该资源在服务器上最新的修改时间。第二次请求时，请求报头上携带If-Modified-Since，询问服务器在该时间后是否有更新。未更新则HTTP 304，否则HTTP 200。  
LastModifed不识别秒级内的修改（不能精确到毫秒）。  
> Last-Modified: Wed, 29 Feb 2012 12:15:23 GMT  
> If-Modified-Since: Wed, 29 Feb 2012 12:15:23 GMT  

# Expires
HTTP 1.0标准，用于控制缓存的失效日期（绝对时间），在该时间内缓存有效。要求客户端和服务器时间严格同步，且在失效后需要重设日期。  
区别于Cache-Control，当同时使用时，优先级：Cache-Control > Expries  
> Expires: Fri, 30 Oct 2017 14:19:41  

# Etag
标识文件的特征字符串，由服务端生成（需要服务端算法支持，比如获取资源的hashCode或MD5）。浏览器通过If-None-Match字段把特征字符串发送至服务器进行匹配，判断资源是否更新。未更新则HTTP 304，否则HTTP200。  
Etag是LastModifed的补充，比LastModifed更加严谨。如果资源发生变化，Etag就会发生变化，对性能有一定影响。  
> ETag: "3f80f-1b6-3e1cb03b"    
> If-None-Match: "3f80f-1b6-3e1cb03b"  
