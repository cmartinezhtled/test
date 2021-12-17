if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  var pushButton = document.querySelector('.js-push-btn');
  pushButton.disabled = false;
  console.log('BOTON HABILITADO');


  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered!!', swReg);

    console.log('hola');

    swRegistration = swReg;
    initialiseUI(); // push subscription 
  })
  .catch(
    console.log('Service Worker Error')
  );
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
  pushButton.disabled = true;

}


function initialiseUI () {
  console.log('ENTRO A SUSCRIPCION--->');

  const applicationServerKey = 'BLDUWLUIaRb8OiTV7PqAsnwopoYUbiUTP3zF-9tbxW7MwxisVK0LoZbKYD11btoDfeKaOLQ1KC5Ot_v4XBMBwjc';
  swRegistration
    .pushManager
    .getSubscription()
    .then(subscription => {
      const isSubscribed = !(subscription === null);
      if (!isSubscribed) {
        return swRegistration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey,
          })
          .then(sendSubscriptionToServer);
      }
      sendSubscriptionToServer(subscription);
    })
    .catch(err => {
      console.log('getSubscription failed', err);
    });







    const webpush = require('web-push');

  const vapidKeys = {
    publicKey: 'BLDUWLUIaRb8OiTV7PqAsnwopoYUbiUTP3zF-9tbxW7MwxisVK0LoZbKYD11btoDfeKaOLQ1KC5Ot_v4XBMBwjc',
    privateKey: 'dkAqBXBpVSzbmXnPpGqT5rIGMeN7-qHdLiz_CNLK2l4',
  };

  webpush.setVapidDetails(
    'mailto:cmartinez@scholem.edu.ar',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  webpush.sendNotification(
    JSON.parse(subscription),
    JSON.stringify({
      title: 'Title',
      icon: 'https://your-site.com/assets/push-icon.png',
      body: 'Body',
      url: 'https://your-site.com/url-to-open',
    })
  )

}






  

