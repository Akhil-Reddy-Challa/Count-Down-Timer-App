export function checkNotificationPermissions() {
  //1) Check the device OS
  //Notifications dont work on iOS devices,browsers
  const deviceOS = getMobileOperatingSystem();
  if (deviceOS[0] !== "i") {
    const status = Notification.permission;
    //2) If status is default, request permissions from the user
    if (status === "default") {
      requestPermission();
    }
  }
}
function requestPermission() {
  Notification.requestPermission().then(function (result) {
    //3) User will be prompted an option to Allow, Block Notifications
    if (result !== "granted") {
      return;
    }
  });
}
function getMobileOperatingSystem() {
  /**
   * Determine the mobile operating system.
   * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
   *
   * @returns {String}
   */
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}
