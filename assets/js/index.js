(function () {
  var sw = navigator.serviceWorker;

  function updateFound() {
    var installingWorker = this.installing;
    installingWorker.addEventListener('statechange', function() {
      switch (installingWorker.state) {
        case 'installed':
          // updated version is available
          sw.controller && window.location.reload();
          break;
        case 'redundant':
          console.error('The installing service worker became redundant.');
          break;
      }
    });
  }
  
  if (sw) {
    sw.register('/notes/sw.js')
      .then(function (registration) {
        registration.addEventListener('updatefound', updateFound);
      })
      .catch(function (err) {
        console.log('service worker register failed')
      })
  }
})();