const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let previousFrame = null;

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


    const currentFrame = context.getImageData(0, 0, canvas.width, canvas.height).data;

    if (previousFrame) {
     
      const diffPixels = getDifferentPixels(currentFrame, previousFrame);

      drawRedRectangles(diffPixels);

      previousFrame = currentFrame.slice();
    } else {
      previousFrame = currentFrame.slice();
    }
  }, 50); 
});

function getDifferentPixels(currentFrame, previousFrame) {
  const diffPixels = [];

  for (let i = 0; i < currentFrame.length; i += 4) {
    if (
      Math.abs(currentFrame[i] - previousFrame[i]) > 20 || 
      Math.abs(currentFrame[i + 1] - previousFrame[i + 1]) > 20 ||
      Math.abs(currentFrame[i + 2] - previousFrame[i + 2]) > 20
    ) {
      diffPixels.push({
        x: (i / 4) % canvas.width,
        y: Math.floor(i / (4 * canvas.width)),
      });
    }
  }

  return diffPixels;
}

function drawRedRectangles(diffPixels) {
  context.strokeStyle = 'red';
  context.lineWidth = 2;

  diffPixels.forEach((pixel) => {
    const rectSize = 10; 
    context.strokeRect(pixel.x - rectSize / 2, pixel.y - rectSize / 2, rectSize, rectSize);
  });
}
