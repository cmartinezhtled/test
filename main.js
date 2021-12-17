if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported!!');

  var pushButton = document.querySelector('.js-push-btn');
  pushButton.disabled = false;
  console.log('BOTON HABILITADO');


  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered!!', swReg);

    swRegistration = swReg;
    initialiseUI();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
  pushButton.disabled = true;

}


function initialiseUI () {
  console.log('ENTRO A REGISTRACION');

  var button = document.getElementById("boton");
  button.addEventListener('click', function(e) {
    console.log('ENTRE A REGISTRACION');

    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
          console.log('GRANTED');

            randomNotification();
        }
    });
});



}






  function randomNotification() {
    var randomItem = Math.floor(Math.random() * 100) + 1;
    var notifTitle = 'titulo de la noti';
    var notifBody = 'Creado por cm';
    var notifImg = 'img/icon_32.png';
    var options = {
        body: notifBody,
        icon: notifImg
    }
    var notif = new Notification(notifTitle, options);
    setTimeout(randomNotification, 30000);

    console.log('NOTI ENVIADA');

}


/*
pushButton.onclick = function() {
  pushButton.textcontent = "Hello World";
};
*/