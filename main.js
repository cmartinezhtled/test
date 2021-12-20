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
    initialiseUI(); // push subscription 
    
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





/////// checkea el botón presionado
document.getElementById("boton").onclick = function(event) {
  //alert("Submit button is clicked!");
  console.log('ENTRO A notifyMe--->');
  notifyMe();
  event.preventDefault();
}


function initialiseUI () {
  console.log('ENTRO A SUSCRIPCION--->');

  Notification.requestPermission().then(function(result) 
  {
    console.log('RESULT_SI' + result);

    if(result === 'granted') 
    {
        //randomNotification();
        console.log('REQ PERM: GRANTED');

        subscribeUserToPush();
        
    

    }
    else
    {
      console.log('REQ PERM: DENIED');

    }
  })
  .catch(function(result)
  {
    console.log('RESULT_NO' + result);
  }

  
  );



}


function subscribeUserToPush() {
  console.log('SUBSCRIPTION');

  return navigator.serviceWorker.register('./sw.js')
  .then(function(registration) {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BLefJtEydR57a4LR3tCWJPyt7mPH0OawfjpcVRnSiwdzf2glDu35Pg6eI9KQOQTWO4qHwWYgE5-b1OtCW4GDlp8'
      )
    };

    return registration.pushManager.subscribe(subscribeOptions);
  })
  .then(function(pushSubscription) {
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });
}



function notifyMe() {
  // Comprobemos si el navegador admite notificaciones
  if (("Notification" in window)) 
  {
    alert("This browser does not support desktop notification");
  }

  // Comprobemos si ya se han otorgado permisos de notificación
  else if (Notification.requestPermission() === "granted") 
  {
    // Si está bien, creemos una notificación
    console.log('**YA TIENE PERMISOS GRANTED**');
  }

  // De lo contrario, debemos pedir permiso al usuario
  else if (Notification.requestPermission() !== "denied") 
  {
    Notification.requestPermission().then(function (permission) 
    {
      // Si el usuario acepta, creemos una notificación
      if (permission === "granted") 
      {
        console.log('**USUARIO DIO GRANTED**');
      }
    });
  }
  else
  {
    console.log('**EL USUARIO DENEGO**');
  
  // Por fin, si el usuario ha denegado las notificaciones y usted
  // quiero ser respetuoso, no hay necesidad de molestarlos más.
  }
}