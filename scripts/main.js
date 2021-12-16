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

function initialiseUI() {
  console.warn('initialiseUI...............');

  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });



const applicationServerPublicKey = 'BLDUWLUIaRb8OiTV7PqAsnwopoYUbiUTP3zF-9tbxW7MwxisVK0LoZbKYD11btoDfeKaOLQ1KC5Ot_v4XBMBwjc';


function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = '1Disable Push Messaging';
  } else {
    pushButton.textContent = '1Enable Push Messaging';
  }

  pushButton.disabled = false;
}




  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

