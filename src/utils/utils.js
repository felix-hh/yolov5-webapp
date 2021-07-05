import AWS, { Credentials, LambdaClientConfig } from 'aws-sdk'
import { keys } from '../secrets'
import { LambdaClient, Invoke, InvokeCommand } from "@aws-sdk/client-lambda";
import { sampleRequest } from "../sample_request"

const DEFAULT_REGION = 'us-east-1'
const IMAGE_TYPE_REGEX = /^data:image\/[a-z]+;base64,/

// Configure AWS SDK for JavaScript
const credentials = new Credentials(keys.aws_access_key_id, keys.aws_secret_access_key)
const lambda = new AWS.Lambda({
  credentials: credentials,
  region: DEFAULT_REGION,
  apiVersion: '2015-03-31',
})

export const callLambda = (image, setSelectedImage) => {
  image = image.replace(IMAGE_TYPE_REGEX, "");

  let lambdaParams = {
    FunctionName: 'yolov5',
    InvocationType: 'RequestResponse',
    LogType: 'None',
    Payload: JSON.stringify({ ...sampleRequest, "Source": image })
  };

  lambda.invoke(lambdaParams, (error, response) => {
    if (error) {
      prompt(error)
    } else {
      // weird trick, this is because server side, we encode before returning, and then lambda service encodes again, so there are 2 levels of string encoding
      let imageResponse = JSON.parse((JSON.parse(response.Payload))).image
      imageResponse = 'data:image/jpeg;base64,'.concat(imageResponse)
      setSelectedImage(imageResponse)
    }
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
