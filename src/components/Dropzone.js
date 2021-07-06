import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Flex, Image, useBoolean, useColorModeValue, Button, Spinner, Heading } from '@chakra-ui/react'
import { FiMaximize, FiMinimize } from 'react-icons/fi'

const EmptyState = () => {
    return (
        <Flex flexDir='column' justifyContent='space-evenly' alignItems='baseline' height='100%' padding='3%'>
            <Flex>
            <Heading size='xl' letterSpacing='tight'>
                Yolov5: Object detection deep learning model
            </Heading>
            </Flex>
            <Flex flexDir='column'>
            <Heading size='l' letterSpacing='tight'>
                Option 1: BYOI (bring your own image)
            </Heading>
            <p>Drag 'n' drop some .jpg image here, or click to select files</p>
            </Flex>
            <Flex flexDir='column'>
            <Heading size='l' letterSpacing='tight'>
                Option 2: Choose an example below
            </Heading>
            <p>Click on an example below , select the default or specific weights and submit</p>
            <p>You can leave the default confidence and IOU thresholds intact</p>
            </Flex>
        </Flex>
    )
}


export const Dropzone = ({ selectedImage, setImages }) => {
    const [isLoading, setLoading] = useBoolean()

    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader()
        let base64
        reader.onloadstart = (event) => {
            setLoading.on()
        }
        reader.onloadend = (event) => {
            setLoading.off()
            base64 = event.target.result
            setImages(base64)
        }
        reader.readAsDataURL(acceptedFiles[0])

    }, [setImages, setLoading])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const bgDropzone = useColorModeValue('blue.50', 'gray.700')
    const [isImageExpanded, setImageExpanded] = useBoolean(false)

    const renderChildrenJSX = () => {
        return (
            <Flex w='100%' flexDir='column' justifyContent='space-evenly' alignItems='center'>
                {/* this renders just one item, either a message or an image.  */}
                {isDragActive ?
                    <p>Drop the files here ...</p>
                    : selectedImage ?
                        <Image src={selectedImage} fit='contain' border='0px solid red'
                            justifySelf='center' alignSelf={isImageExpanded ? 'stretch' : 'center'}
                            maxH='100%' />
                        : <EmptyState />}
            </Flex>)
    }
    return (
        <Flex {...getRootProps()} flexDir='row-reverse' bg={bgDropzone} w='100%'>
            <input {...getInputProps() } accept="image/*" inputMode='image'/>
            {renderChildrenJSX()}
            <Flex position='absolute' alignSelf='start'>
                <Button onClick={(event) => {
                    setImageExpanded.toggle()
                    // Do not prompt user to upload an image
                    event.stopPropagation()
                }}
                    zIndex={1}
                    leftIcon={isImageExpanded ? <FiMinimize /> : <FiMaximize />}
                    variant='ghost' _focus={{ border: '0px' }} />
            </Flex>
            {isLoading ? <Spinner /> : ''}
        </Flex>
    )
}