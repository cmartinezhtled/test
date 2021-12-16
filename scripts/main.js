if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

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
}

// We need the service worker registration to check for a subscription
navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
  // Do we already have a push message subscription?
  serviceWorkerRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      // Enable any UI which subscribes / unsubscribes from
      // push messages.
      var pushButton = document.querySelector('.js-push-btn');
      pushButton.disabled = false;

      if (!subscription) {
        // We aren’t subscribed to push, so set UI
        // to allow the user to enable push
        return;
      }

      // Keep your server in sync with the latest subscriptionId
      sendSubscriptionToServer(subscription);
      
      showCurlCommand(subscription);

      // Set your UI to show they have subscribed for
      // push messages
      pushButton.textContent = 'Disable Push Messages';
      isPushEnabled = true;
    })
    .catch(function(err) {
      window.Demo.debug.log('Error during getSubscription()', err);
    })
    
  });

