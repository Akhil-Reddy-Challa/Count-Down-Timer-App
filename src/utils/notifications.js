export function checkNotificationPermissions() {
  const status = Notification.permission;
  if (status === "default") {
    requestPermission();
  }
}
function requestPermission() {
  Notification.requestPermission().then(function (result) {
    if (result !== "granted") {
      return;
    }
  });
}
