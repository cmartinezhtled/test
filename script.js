if ('serviceWorker' in navigator && 'PushManager' in window) {
  
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))

  navigator.serviceWorker.getRegistration().then(reg => {
    reg.pushManager.subscribe({
      userVisibleOnly: true
    }).then(sub => {
      // send sub.toJON() to server
    });
  });
}
else {
  console.warn('Push notifications no soportado');
  pushButton.textContent = 'Push No Soportado';
}
