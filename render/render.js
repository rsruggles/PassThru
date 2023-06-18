// Constants
const video = document.querySelector('#passThru')
const videoInput = document.querySelector('#selVideoInput')
const videoResolution = document.querySelector('#selResolution')
const videoFPS = document.querySelector('#selFPS')
const videoResize = document.querySelector('#selResize')
const videoRatio = document.querySelector('#selRatio')
const chkHW = document.querySelector('#chkHW')
const audioInput = document.querySelector('#selAudioInput')
const chkGain = document.querySelector('#chkGain')
const chkEcho = document.querySelector('#chkEcho')
const chkNoise = document.querySelector('#chkNoise')

// Variables
var fullScreen = false
var inSettings = false
var srcAudio = "none";
var srcVideo = "none";
var appSettings;

////////////////////////////
//   POPULATE DEVICE LIST //
////////////////////////////
if (!navigator.mediaDevices?.enumerateDevices) {
  console.log("Something went wrong. You don't seem to have any applicable media devices.");
} else {
  // List cameras and microphones.
  navigator.mediaDevices
  .enumerateDevices()
  .then((devices) => {
    devices.forEach((device) => {
      console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
      if (device.kind == 'audioinput') {
        audioInput.innerHTML += `<option value="`+ device.deviceId +`" >`+ device.label +`</option>`;
      }
      if (device.kind == 'videoinput') {
        videoInput.innerHTML += `<option value="`+ device.deviceId +`" >`+ device.label +`</option>`;
      }
    });
    // Update Settings
    api.send('reqSettings')
  })
  .catch((err) => {
    console.error(`${err.name}: ${err.message}`);
  });
}
  
////////////////////
//   SET STREAM   //
////////////////////
function setStream() {
  video.muted = true;
  srcAudio = audioInput.value;
  srcVideo = videoInput.value;
  if (srcVideo != "none") {
    window.navigator.mediaDevices.getUserMedia({ 
      video:{
        deviceId: srcVideo,
        frameRate: getFps(),
        width: {min: 768, ideal: getResX(), max: 2440},
        height: {min: 432, ideal: getResY(), max: 1440},
        //resizeMode: "crop-and-scale"
      }, 
      audio:{
        deviceId: srcAudio,
        autoGainControl: chkGain.checked,
        echoCancellation: chkEcho.checked,
        noiseSuppression: chkNoise.checked
      } 
    })
    .then(stream => {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    })
    .catch( () => {
      alert('SetStream Error: Stream failed to initialize. Current settings may be incompatible with selected hardware sources.');
    });
  }
  // Update Mute Status
  if (srcAudio !== "none") {
    video.muted = false;
    video.volume = Number(appSettings.audioVolume)
  }
}
    

////////////////////////
//    App Controls    //
////////////////////////

// Minimize
document.querySelector('#appMin').onclick = function() {
  api.send('app-minimize')
}

// Maximize
let appMax = document.querySelector('#appMax')
function toggleScreen() {
  if (fullScreen) {
    appMax.classList.add('icon-fullscreen')
    appMax.classList.remove('icon-fullscreen_exit')
    fullScreen = false
  } else {
    appMax.classList.add('icon-fullscreen_exit')
    appMax.classList.remove('icon-fullscreen')
    fullScreen = true
  }
  api.send('app-fullscreen', (fullScreen))
}
appMax.onclick = function() {
  toggleScreen()
}
document.ondblclick = function() {
  if (!inSettings) {
    toggleScreen()
  }
}

// Exit
document.querySelector('#appExit').onclick = function() {
  api.send('app-close', (appSettings))
}

// Volume
let volWrapper = document.querySelector('#volWrapper');
let volSlider = document.querySelector('#volSlider');
let volume = volSlider.value;
let allowMute = true;
volWrapper.onmouseover = function() {
  volSlider.style.width = '100px';
  volSlider.style.opacity = '1';
}
volWrapper.onmouseout = function() {
  volSlider.style.width = '0px';
  volSlider.style.opacity = '0';
}
volSlider.oninput = function() {
  volume = volSlider.value;
  updateVolume();        
}
volSlider.onmouseover = function(){allowMute = false}
volSlider.onmouseout = function(){allowMute = true}
volWrapper.onmouseup = function() {
  if ((volume > 0) && allowMute) {
    volume = 0;
  } else {
    volume = volSlider.value;
  }
  updateVolume();
}

function updateVolume() {
  if (volume == 0) {
    volWrapper.classList.remove('icon-volume_up');
    volWrapper.classList.add('icon-volume_off');
    volSlider.style.filter = 'saturate(10%)';
  } else {
    volWrapper.classList.remove('icon-volume_off');
    volWrapper.classList.add('icon-volume_up');
    volSlider.style.filter = 'saturate(1)';
  }
  video.volume = volume;
  appSettings.audioVolume = volume
}

//////////////////
//   Settings   //
//////////////////

document.querySelector('#videoWrapper').addEventListener("click", function(evt) {
  evt.stopPropagation();
});

document.querySelector('#audioWrapper').addEventListener("click", function(evt) {
  evt.stopPropagation();
});

document.querySelector('#settings').addEventListener("click", function(evt) {
  evt.stopPropagation();
});

// Settings UI
let btnSettings = document.querySelector('#btnSettings');
let settings = document.querySelector('#settings');
function closeSettings() {
  btnSettings.classList.remove('icon-kb_return');
  btnSettings.classList.add('icon-settings');
  settings.style.opacity = 0;
  settings.style.pointerEvents = "none";
  inSettings = false;
}
settings.onclick = function() {
  closeSettings();
}
btnSettings.onclick = function() {
  if (inSettings) {
    closeSettings();
  } else {
    btnSettings.classList.remove('icon-settings');
    btnSettings.classList.add('icon-kb_return');
    settings.style.opacity = 1;
    settings.style.pointerEvents = "all";
    inSettings = true;
  }
}

// Video Settings
function getFps() {
  let fps = 60;
  if (videoFPS.value == "null") {
    fps = null;
  } else {
    fps = Number(videoFPS.value)
  }
  return(fps);
}
  
function getResX() {
  switch(videoResolution.value) {
    case "432":
      return(768)
      break;
    case "qhd":
      return(960)
      break;
    case "vita":
      return(960)
      break;
    case "720":
      return(1280)
      break;
    case "1080":
      return(1920)
      break;
    case "1440":
      return(2560)
      break;
    case "uw1440":
      return(3440)
      break;
    default:
      return(1920)
  } 
}

function getResY() {
  switch(videoResolution.value) {
    case "432":
      return(432)
      break;
    case "qhd":
      return(540)
      break;
    case "vita":
      return(544)
      break;
    case "720":
      return(720)
      break;
    case "1080":
      return(1080)
      break;
    case "1440":
      return(1440)
      break;
    case "uw1440":
      return(1440)
      break;
    default:
      return(1080)
  } 
}

// Video Resize Mode (objectFit)
videoResize.onchange = function() {
  video.style.objectFit = this.value
  appSettings.videoResize = this.value
}

// Toggle Aspect Ratio
videoRatio.onchange = function() {
  api.send('app-aspect-ratio', (this.value))
  appSettings.videoRatio = this.value
}

// Toggle Gain
chkGain.onchange = function () {
  appSettings.audioGain = this.checked
  setStream()
}

// Toggle Echo
chkEcho.onchange = function () {
  appSettings.audioEcho = this.checked
  setStream()
}

// Toggle Noise
chkNoise.onchange = function () {
  appSettings.audioNoise = this.checked
  setStream()
}

// Hide Menu
var timeout;
var showMenu = false;
let menu = document.querySelector('.menu');
document.addEventListener("mousemove", hideMenu);
function hideMenu() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() {
    if (!showMenu) {
      if (!inSettings) {
        document.querySelector("body").style.cursor = "none";
        menu.style.top = "-" + menu.clientHeight + "px";
        showMenu = true;
      }   
    }
  }, 3000);
  if (showMenu) {
    document.querySelector("body").style.cursor = "auto";
    menu.style.top = "0px";
    showMenu = false;
  }
};

// Load Settings
function loadSettings() {
  videoInput.value = appSettings.videoDevice
  videoResolution.value = appSettings.videoResolution
  videoFPS.value = appSettings.videoFPS
  videoResize.value = appSettings.videoResize
  videoRatio.value = appSettings.videoRatio
  chkHW.checked = appSettings.hwAccelleration
  audioInput.value = appSettings.audioDevice
  volSlider.value = appSettings.audioVolume
  chkGain.checked = appSettings.audioGain
  chkEcho.checked = appSettings.audioEcho
  chkNoise.checked = appSettings.audioNoise
  console.log('settings loaded')
  setStream()
}

// Update Settings
function updateSettings(reloadStream) {
  appSettings.videoDevice = videoInput.value
  appSettings.videoResolution = videoResolution.value
  appSettings.videoFPS = videoFPS.value 
  appSettings.hwAccelleration = chkHW.checked
  appSettings.audioDevice = audioInput.value
  console.log('settings updated')
  if (reloadStream) {
    setStream()
  } else {
    api.send('restart-warning', (appSettings))
  }
}

// Parse GPU Status
api.send('gpustatus')

api.handle('resSettings', () => function(evt, data) {
  console.log('receiving settings')
  appSettings = data
  loadSettings()
})