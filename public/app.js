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
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

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
