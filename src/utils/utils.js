import AWS, { Credentials, } from 'aws-sdk'
import { keys } from '../secrets'

const DEFAULT_REGION = 'us-east-1'

// Configure AWS SDK for JavaScript
const credentials = new Credentials(keys.aws_access_key_id, keys.aws_secret_access_key)
const lambda = new AWS.Lambda({
  credentials: credentials,
  region: DEFAULT_REGION,
  apiVersion: '2015-03-31',
})

export const callLambda = (request, setSelectedImage, onFinish) => {
  let lambdaParams = {
    FunctionName: 'yolov5',
    InvocationType: 'RequestResponse',
    LogType: 'None',
    Payload: JSON.stringify(request)
  };

  lambda.invoke(lambdaParams, (error, response) => {
    if (error) {
      prompt(error)
    } else {
      let imageResponse = JSON.parse(response.Payload).image
      imageResponse = 'data:image/jpeg;base64,'.concat(imageResponse)
      setSelectedImage(imageResponse)
    }
    onFinish()
  })
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
