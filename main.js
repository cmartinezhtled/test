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
        console.log('REQ PERMI: GRANTED');

        code_subscripcion = JSON.stringify(subscribeUserToPush());
        console.log('SUBSCRIPCION:' + code_subscripcion);
    

    }
    else
    {
      console.log('REQ PERMI: DENIED');

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

    var mysql = require('mysql');
    var conexion = mysql.createConnection({
      host: 'localhost',
      database: 'celu',
      user: 'root',
      password: '-debianwoody853-',
    })
    conexion.connect(function(err){
      if (err){
        console.error('Error de conexion '+ err.stack);
        return;
      }
      console.log('Conectado con el id ' + conexion.threadId)
    });
    conexion.query('SELECT * FROM login', function (error, results, fields){
      if (error)
        throw error;
      results.forEach(result => {
        console.log(result);
      });
    });


    return pushSubscription;
  });
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
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