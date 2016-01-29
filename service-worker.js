self.addEventListener('push', function(event) {
  console.log('push event received');
  var payload = event.data ? event.data.text() : 'no payload';

  console.log('payload is', payload);

  payload = JSON.parse(payload);

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.message
    }).catch(console.error.bind(console))
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('User clicked notificiation', event.notification.tag);

  event.notification.close();

  // This looks to see if the page is still open
  event.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.focused) {
          console.log('page already focused!');
          return;
        }
        if ('focus' in client) {
          console.log('focusing the page', client.url);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        console.log('page not open, opening page');
        return clients.openWindow('/');
      }
    })
    .catch(function (error) {
      console.error(error);
    })
  );
});
