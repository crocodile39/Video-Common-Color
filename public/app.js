const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const boxSize = 300; 
const boxColor = 'red';

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

    const centerX = (canvas.width - boxSize) / 2;
    const centerY = (canvas.height - boxSize) / 2;

    context.strokeStyle = boxColor;
    context.lineWidth = 2;
    context.strokeRect(centerX, centerY, boxSize, boxSize);

    const imageData = context.getImageData(centerX + 1, centerY + 1, boxSize - 2, boxSize - 2).data;

    const colorOccurrences = {};

    for (let i = 0; i < imageData.length; i += 4) {
      const color = `rgb(${imageData[i]}, ${imageData[i + 1]}, ${imageData[i + 2]})`;

      colorOccurrences[color] = (colorOccurrences[color] || 0) + 1;
    }

    let mostCommonColor = null;
    let maxOccurrences = 0;

    for (const color in colorOccurrences) {
      if (colorOccurrences[color] > maxOccurrences) {
        maxOccurrences = colorOccurrences[color];
        mostCommonColor = color;
      }
    }

    document.body.style.backgroundColor = mostCommonColor || 'white';
  }, 2000); 
});
