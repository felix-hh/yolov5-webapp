import React, { useState } from 'react'
import {
  ChakraProvider,
  Box,
  Text,
  Flex,
  theme,
  useBoolean,
  Image,
  Button,
  Heading,
  Spacer
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { Dropzone } from './components/Dropzone'
import { download } from './utils/utils'
import { callLambda } from './utils/utils'
import { ModelSelector } from './components/ModelSelector'


const onSubmit = (image, setSelectedImage) => {
  // need to pass the setSelectedImage because invoke uses a callback, I cannot await it. 
  callLambda(image, setSelectedImage)
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      uploadedImage: undefined,
      // image to display
      selectedImage: undefined
    }
  }

  setImages = (image) => {
    this.setState({ uploadedImage: image, selectedImage: image })
  }

  setSelectedImage = (image) => {
    this.setState({ selectedImage: image })
  }

  render = () => {
    return <ChakraProvider theme={theme}>
      <Flex h={'100vh'} w={'100vw'} flexDir='column' maxW='2000px'>
        {/* Top side */}
        <Flex h={'75%'} m='1%'>

          {/* Dropzone and image */}
          <Flex 
          w='75%' border='3px'
            borderColor='blue.200' borderStyle='dashed'
            >
            <Dropzone
              selectedImage={this.state.selectedImage}
              setImages={this.setImages} >
            </Dropzone>
          </Flex>

          {/* Config pannel */}
          <Flex flexDir='column' alignItems='center' w='25%'>
            <Flex flexDir='row' p='3%'>
              <Heading letterSpacing='tight' alignSelf='center'>
                Model config
              </Heading>

            </Flex>
            <Text> Upload your files</Text>
            <ModelSelector />
            <Button
              isDisabled={!this.state.selectedImage}
              onClick={() => onSubmit(this.state.uploadedImage, this.setSelectedImage)}
            >Submit</Button>
            <Button
              isDisabled={!this.state.selectedImage}
              onClick={() => {
                download(this.state.selectedImage, 'img.jpg', 'data:image/jpeg;base64,')
              }}>Download</Button>
            <ColorModeSwitcher justifySelf="flex-end" alignSelf='flex-end' />
          </Flex>

          {/* Examples pannel */}
        </Flex>
        <Flex w={'100%'} h='25%'>

        </Flex>
      </Flex>
    </ChakraProvider>;
  }
}
export default App;
