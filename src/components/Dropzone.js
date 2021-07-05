import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Flex, Image, useBoolean, useColorModeValue, Spacer } from '@chakra-ui/react'

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

    }, [setImages])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const bgDropzone = useColorModeValue('blue.50', 'gray.700')

    const renderChildrenJSX = () => {
        return (
            <Flex w='100%' flexDir='column' justifyContent='space-evenly' alignItems= 'stretch'>
                {/* this renders just one item, either a message or an image.  */}
                {isDragActive ?
                    <p>Drop the files here ...</p>
                    : selectedImage ?
                        <Image src={selectedImage} fit= 'contain' border='2px solid red' 
                        justifySelf='center'
                        maxH='100%'/>
                        : <p>Drag 'n' drop some files here, or click to select files</p>}
            </Flex>)
    }
    return (
        <Flex {...getRootProps()} bg={bgDropzone} w='100%' border='10px' borderColor='orange.200'>
            <input {...getInputProps()} />
            {renderChildrenJSX()}
        </Flex>
    )
}