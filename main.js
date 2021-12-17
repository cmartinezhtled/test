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





}






  


/*
pushButton.onclick = function() {
  pushButton.textcontent = "Hello World";
};
*/