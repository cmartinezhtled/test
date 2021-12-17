if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  var pushButton = document.querySelector('.js-push-btn');
  pushButton.disabled = false;
  console.log('BOTON HABILITADO');


  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered!!', swReg);

    //console.log('hola');

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


}






  

