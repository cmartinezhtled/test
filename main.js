if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  var pushButton = document.querySelector('.js-push-btn');
  pushButton.disabled = false;
  console.log('BOTON HABILITADO');


  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initialiseUI();
  })
  .catch(function(error) {
    //console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
  pushButton.disabled = true;

}

console.log('ENTRO A REGISTRACION');

// We need the service worker registration to check for a subscription
navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
  console.warn('INICIO REGISTRACION');

  // Do we already have a push message subscription?
  serviceWorkerRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      // Enable any UI which subscribes / unsubscribes from
      // push messages.
      const applicationServerKey = 'BLDUWLUIaRb8OiTV7PqAsnwopoYUbiUTP3zF-9tbxW7MwxisVK0LoZbKYD11btoDfeKaOLQ1KC5Ot_v4XBMBwjc';
      swRegistration.pushManager.getSubscription()
        .then(subscription => {
          const isSubscribed = !(subscription === null);
          if (!isSubscribed) 
          {
            return swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey,
              })
              .then(Notification.requestPermission().then(function(result) {

                console.log('result:' + result);

                if(result === 'granted') 
                {
                    // Set your UI to show they have subscribed for
                    // push messages
                    pushButton.textContent = 'Disable Push Messages';
                    isPushEnabled = true;


                    console.log('SUBSCRIPCION HECHA');
                    randomNotification();


                }
                else{
                  console.log('NO HAY SUBSCRIPCION');

                  pushButton.textContent = 'Enable Push Messages';

                }
              })
              );
          }




        })

    })
    .catch(function(err) {
      window.Demo.debug.log('Error during getSubscription()', err);
    })


    
  });


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