const getMediaStreamFromCamera = () => {
  // 兼容老版本
  const promisifiedOldGUM = function (constraints) {
    let _getUserMedia = navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia;
    if (!_getUserMedia) {
      return Promise.reject(new Error('当前浏览器不支持 getUserMedia'))
    }
    return new Promise ((resolve, reject) => {
      _getUserMedia.call(navigator, constraints, resolve, reject)
    })
  }

  !navigator.mediaDevices && (navigator.mediaDevices = {})
  !navigator.mediaDevices.getUserMedia && (navigator.mediaDevices.getUserMedia = promisifiedOldGUM)

  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      frameRate: { ideal: 10, max: 15 },
      facingMode: 'user'  // Front and back camera(user-前置摄像头, environment-后置摄像头)
    })
    .then(stream => {
      resolve(stream)
    })
    .catch(err => {
      reject(`getUserMedia error: ${err.name}`)
    })
  })
}

const loadStreamInVideo = (target, stream) => {
  return new Promise((resolve, rejcet) => {
    if (!target) {
      return false
    }
    target.srcObject = stream
    target.onplay = () => {
      console.log(`videoBox(width: ${target.offsetWidth}, height: ${ target.offsetHeight})`)
      resolve({
        width: target.offsetWidth,
        height: target.offsetHeight
      })
    }
  })
}

const initCanvasBox = (target, opt) => {
  target.setAttribute('width', opt.width);
  target.setAttribute('height', opt.height);
}

// 在canvas中绘制视频流
const renderStreamInCanvas = (canvasCtx, videoBox, opt) => {
  canvasCtx.drawImage(videoBox, 0, 0, opt.width, opt.height);
  window.requestAnimationFrame(() => {
    renderStreamInCanvas(canvasCtx, videoBox, opt)
  })
}

const renderFrame = (canvasCtx, videoBox) => {
  canvasCtx.drawImage(videoBox, 0, 0, videoBox.offsetWidth, videoBox.offsetHeight);
  let frame = canvasCtx.getImageData(0, 0, videoBox.offsetWidth, videoBox.offsetHeight);
  canvasCtx.putImageData(frame, 0, 0);
  setTimeout(() => {
    renderFrame(canvasCtx, videoBox)
  }, 0)
}

const drawFaces = (target, facePostions) => {
  for (let i = 0; i < facePostions.length; i++) {
    drawFaceBoxByDom(target, facePostions[i]);
  }
}

const drawFaceBoxByDom = (ele, facePostion) => {
  ele.style.width = `${facePostion.width}px`;
  ele.style.height = `${facePostion.height}px`;
  ele.style.top = `${facePostion.y}px`;
  ele.style.left = `${facePostion.x}px`;
}

const drawFaceBoxByCanvas = (canvasCtx, facePostion) => {
  canvasCtx.beginPath();
  canvasCtx.moveTo(facePostion.x, facePostion.y);
  canvasCtx.lineTo(facePostion.x + facePostion.width, facePostion.y);
  canvasCtx.lineTo(facePostion.x + facePostion.width, facePostion.y + facePostion.height);
  canvasCtx.lineTo(facePostion.x, facePostion.y + facePostion.height);
  canvasCtx.closePath(); // 使用closePath()闭合图形
  canvasCtx.fillStyle = 'yellow';
  canvasCtx.lineWidth = 5;
  canvasCtx.strokeStyle = "black";
  canvasCtx.stroke();
}