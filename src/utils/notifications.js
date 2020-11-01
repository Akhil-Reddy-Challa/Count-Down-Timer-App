export function checkNotificationPermissions() {
  const status = Notification.permission;
  if (status === "default") {
    requestPermission();
  } else return;
}
function requestPermission() {
  try {
    Notification.requestPermission(function (result) {
      if (result !== "granted") {
        return false;
      } else return true;
    });
  } catch (error) {
    // Safari doesn't return a promise for requestPermissions and it
    // throws a TypeError. It takes a callback as the first argument
    // instead.
    if (error instanceof TypeError) {
      Notification.requestPermission((result) => {
        if (result !== "granted") {
          return false;
        } else return true;
      });
    } else {
      throw error;
    }
  }
}
