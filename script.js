if ('serviceWorker' in navigator && 'PushManager' in window) {
  
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))

  
}
else {
  console.warn('Push notifications no soportado');
  pushButton.textContent = 'Push No Soportado';
}
