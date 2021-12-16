if ('serviceWorker' in navigator ) {
  
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))

   /* if ('Notification' in window ) {
      // Display the UI to let the user toggle notifications
      Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
      });
    }
  */
}






function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: './img/icon_64.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: './img/icon_32.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
  else if (Notification.permission === "blocked") {
    /* the user has previously denied push. Can't reprompt. */
   } else {
     /* show a prompt to the user */
   }


}