const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing the camera:', error);
  });

video.addEventListener('canplay', () => {
  setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    applyDarkeningEffect(imageData, 90); 

    context.putImageData(imageData, 0, 0);
  }, 100); 
});

function applyDarkeningEffect(imageData, threshold) {
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

    if (brightness < threshold) {
      const newBrightness = Math.max(0, brightness - 50); 

      pixels[i] = newBrightness;
      pixels[i + 1] = newBrightness;
      pixels[i + 2] = newBrightness;
    }
  }
}
