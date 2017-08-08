# Web缓存机制总结

Web缓存用于减少网络带宽，降低服务器压力，降低网络延迟从而提升加载性能。

## Cache-Control
HTTP1.1标准新加字段。用于控制本地文件缓存有效时长（请求发出后开始计算），在有效缓存时间内不再向服务器发出请求。
> Cache-Control: max-age=3600 (3600秒内使用缓存文件)
> Cache-Control: no-cache (每一次请求都从服务器获取)
> Cache-Control: private (待验证)
> Cache-Control: must-revalidate (待验证)