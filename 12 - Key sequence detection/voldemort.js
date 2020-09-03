const body = document.querySelector('body')

function renderVoldemortVideo() {
  body.innerHTML = `
  <video autoplay loop id="myVideo">
  <source src="./video/video.mp4" type="video/mp4">
</video>`

 const video = document.querySelector('video');
 video.currentTime= 4.1;
}

