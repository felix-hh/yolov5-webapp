export const callLambda = (request, setSelectedImage, onFinish) => {
  const lambdaUrl = 'https://qebgbzgoe4szfiwmsixof7zxb40cbruy.lambda-url.us-east-1.on.aws/';
  
  fetch(lambdaUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      let imageResponse = data.image;
      imageResponse = 'data:image/jpeg;base64,'.concat(imageResponse);
      setSelectedImage(imageResponse);
    })
    .catch(error => {
      console.error('Error:', error);
      prompt(error);
    })
    .finally(() => {
      onFinish();
    });
}

export function download(content, fileName, contentType) {
  var a = document.createElement("a");
  a.href = content;
  a.download = fileName;
  a.click();
}
export const bytesToSize = bytes => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) return "0 Byte";

  const log = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round(bytes / Math.pow(1024, log), 2) + " " + sizes[log];
};
