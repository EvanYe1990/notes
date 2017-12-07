// 开启socket链接
var socket = io.connect('ws://192.168.1.188:9000');
socket.on('connecting', () => {
  console.log('WebSocket 连接中')
})
socket.on('error', (err) => {
  console.log('WebSocket 连接错误')
});

socket.on('connect_failed', () => {
  console.log('WebSocket 连接失败')
})

socket.on('disconnect', (data) => {
  console.log("WebSocket 连接断开");
});

socket.on('reconnect', () => {
  console.log("WebSocket 重连");
});
socket.on('server_socket_connected', (data) => {
  console.log(data)
})
socket.on('server_socket_disconnected', data => {
  console.log(data)
})