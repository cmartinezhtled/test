if ('serviceWorker' in navigator && 'PushManager' in window) 
{
  console.log('Service Worker and Push is supported');

  var pushButton = document.querySelector('.js-push-btn');
  pushButton.disabled = false;
  console.log('BOTON HABILITADO');


  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) 
  {
    console.log('Service Worker is registered!! *** REGISTRADO***', swReg);


    swRegistration = swReg;
    //initialiseUI(); // push subscription 
    notifyMe(); // notificar recibir push
  })
  .catch(function(swRegerr) 
  {
    console.warn('Service Worker Error', swRegerr);
  });
}   
else 
{
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
  pushButton.disabled = true;

}


function initialiseUI () {
  console.log('ENTRO A SUSCRIPCION--->');

  Notification.requestPermission().then(function(result) 
  {
    console.log('RESULT_SI' + result);

    if(result === 'granted') 
    {
        //randomNotification();
        console.log('GRANTED');
    }
    else
    {
      console.log('DENIED');

    }
  })
  .catch(function(result)
  {
    console.log('RESULT_NO' + result);
  }

  );
}


function notifyMe() {
  // Comprobemos si el navegador admite notificaciones...
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Comprobemos si ya se han otorgado permisos de notificación
  else if (Notification.permission === "granted") {
    // Si está bien, creemos una notificación
    var notification = new Notification("Hi there!");
  }

  // De lo contrario, debemos pedir permiso al usuario
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // Si el usuario acepta, creemos una notificación
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // Por fin, si el usuario ha denegado las notificaciones y usted
  // quiero ser respetuoso, no hay necesidad de molestarlos más.
}




  

