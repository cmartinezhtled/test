if ('serviceWorker' in navigator && 'PushManager' in window) 
{
  console.log('Service Worker and Push is supported');

  var pushButton = document.querySelector('.js-push-btn');
  pushButton.disabled = false;
  console.log('BOTON HABILITADO');


  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) 
  {
    console.log('Service Worker is registered!!', swReg);

    console.log('Todo registrado', swReg);

    swRegistration = swReg;
    initialiseUI(); // push subscription 
  })
  .catch(function(swRegerr) 
  {
    console.warn('Service Worker Error', swRegerr);
  })
}   
else 
{
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
  pushButton.disabled = true;

}


function initialiseUI () {
  console.log('ENTRO A SUSCRIPCION--->');


}






  

