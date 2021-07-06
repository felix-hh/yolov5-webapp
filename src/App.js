import React from 'react'
import {
  ChakraProvider,
  Flex,
  theme,
} from '@chakra-ui/react';

import { Dropzone } from './components/Dropzone'
import { download } from './utils/utils'
import { callLambda } from './utils/utils'
import { sampleRequest } from "./sample_request"

import { ExamplesPanel } from './components/ExamplesPanel'
import { ConfigPanel } from './components/ConfigPanel'

const IMAGE_TYPE_REGEX = /^data:image\/[a-z]+;base64,/

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      uploadedImage: undefined,
      selectedImage: undefined,
      selectedModel: 'yolov5s',
      iouThreshold: .45,
      confidenceThreshold: .25
    }
  }

  setImages = (image) => {
    this.setState({ uploadedImage: image, selectedImage: image })
  }

  setSelectedImage = (image) => {
    this.setState({ selectedImage: image })
  }

  setSelectedModel = (model) => {
    this.setState({ selectedModel: model })
  }

  setIouThreshold = (val) => {
    this.setState({ iouThreshold: val })
  }
  setConfidenceThreshold = (val) => {
    this.setState({ confidenceThreshold: val })
  }

  getRequest = () => {
    if (this.state.uploadedImage) {
      // remove content type from the string
      let imageReq = this.state.uploadedImage.replace(IMAGE_TYPE_REGEX, '')
      return {
        ...sampleRequest,
        "Source": imageReq,
        'Weights': this.state.selectedModel,
        'IouThreshold': this.state.iouThreshold,
        'ConfidenceThreshold': this.state.confidenceThreshold
      }
    }
    else {
      return undefined
    }
  }
  onExampleImageClick = (item) => {
    this.setImages('data:image/jpeg;base64,'.concat(item['Source']))
    // this.setState({
    //   selectedModel: 'yolov5s',
    //   iouThreshold: 0.45,
    //   confidenceThreshold: 0.25
    // })
  }

  onSubmit = (onFinish) => {
    // need to pass the setSelectedImage because invoke uses a callback, I cannot await it. 
    callLambda(this.getRequest(), this.setSelectedImage, onFinish)
  }
  onDownload = () => {
    download(this.state.selectedImage, 'img.jpg', 'data:image/jpeg;base64,')
  }

  render = () => {
    // Prepare request text to show to users. Do not show the full base64 image string to users
    let requestTxt
    if (this.getRequest()) {
      requestTxt = { ...this.getRequest(), 'Source': this.state.uploadedImage.slice(0, 30) + '...' }
      requestTxt = JSON.stringify(requestTxt, null, '\t')
    }
    else {
      requestTxt = 'Upload an image to create a request'
    }

    return <ChakraProvider theme={theme}>
      <Flex h={'100vh'} flexDir='column' overflow='hidden'>
        {/* Top side */}
        <Flex h={'75%'} w={'100vw'} flexDir='row' justifyContent='space-between'>

          {/* Dropzone and image */}
          <Flex
            m='.5%'
            w='70%'
            border='3px'
            borderColor='blue.200'
            borderStyle='dashed'
            flexDir='row'>
            <Dropzone
              selectedImage={this.state.selectedImage}
              setImages={this.setImages} >
            </Dropzone>
          </Flex>

          {/* Config pannel */}
          <Flex flexDir='column' alignItems='center' w='30%' h='100%'>
            <ConfigPanel setSelectedModel={this.setSelectedModel}
              onSubmit={this.onSubmit}
              onDownload={this.onDownload}
              confidenceThreshold={this.state.confidenceThreshold}
              iouThreshold={this.state.iouThreshold}
              setConfidenceThreshold={this.setConfidenceThreshold}
              setIouThreshold={this.setIouThreshold}
              isImageLoaded={Boolean(this.state.selectedModel)}
              requestTxt={requestTxt} />
          </Flex>

          {/* Examples pannel */}
        </Flex>
        <Flex w='100%' h='25%' >
          <ExamplesPanel
            onExampleImageClick={this.onExampleImageClick} />
        </Flex>
      </Flex>
    </ChakraProvider>;
  }
}
export default App;
