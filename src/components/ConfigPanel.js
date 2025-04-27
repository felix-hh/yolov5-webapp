import React from 'react'
import {
    Text,
    Flex,
    Button,
    Heading,
    VStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Spinner,
    useBoolean,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
} from '@chakra-ui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { ModelSelector } from './ModelSelector'

export const ConfigPanel = ({ setSelectedModel,
    confidenceThreshold,
    iouThreshold,
    setConfidenceThreshold,
    setIouThreshold,
    onSubmit,
    onDownload,
    isImageLoaded,
    selectedModel,
    requestTxt }) => {

    const [isLoadingRequest, setLoadingRequest] = useBoolean(false)
    const [isJsonExpanded, setIsJsonExpanded] = useBoolean(false)

    return (
        <VStack h='100%' w='100%' p='3%' spacing={8}>
            {/* header */}
            <Flex w='100%' flexDir='column'>
            <Flex flexDir='row' w='100%' justifyContent='space-between'>
                <Heading letterSpacing='tight' alignSelf='center'>
                    Config
                </Heading>
                <ColorModeSwitcher _focus={{}}/>
            </Flex>
            </Flex>
            <Flex>
            <Text>You can choose between default parameters for normal images and weights tailored for medical instruments (scalpels, tweezers and scissors)</Text>
            </Flex>
            {/* select config */}
            <ModelSelector setSelectedModel={setSelectedModel} selectedModel={selectedModel} />
            <Flex width='inherit' flexDir='column' alignItems='stretch'>
                <Text>Confidence: {confidenceThreshold}</Text>
                <Slider
                    aria-label='ConfidenceThresholdSlider'
                    defaultValue={.25}
                    min={.1}
                    max={.9}
                    step={.01}
                    onChange={setConfidenceThreshold}
                    // update also when change ends
                    onChangeEnd={setConfidenceThreshold}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Flex>
            <Flex width='inherit' flexDir='column'>
                <Text>IOU: {iouThreshold}</Text>

                <Slider
                    aria-label='IouThresholdSlider'
                    defaultValue={.45}
                    min={.1}
                    max={.9}
                    step={.01}
                    onChange={setIouThreshold}
                    onChangeEnd={setIouThreshold}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Flex>

            {/* buttons side by side */}
            <Flex flexDir='row' justifyContent='space-between' w='100%' >
                <Button width='100%'
                    _hover={{
                        border: "2px",
                        borderColor: "cyan.200"
                    }}
                    _focus={{

                    }}
                    isDisabled={!isImageLoaded}
                    onClick={() => {
                        setLoadingRequest.on()
                        // pass set loading request off as a finisher
                        onSubmit(setLoadingRequest.off)
                    }}
                >Submit {isLoadingRequest ? <Spinner /> : ''}</Button>
                <Button width='100%'
                    _hover={{
                        border: "2px",
                        borderColor: "cyan.200"
                    }}
                    _focus={{

                    }}
                    borderColor="cyan.200"
                    isDisabled={!isImageLoaded}
                    onClick={() => { onDownload() }}
                >Download</Button>
            </Flex>

            {/* extendable menu with json request, can overflow */}
            <Flex width='inherit' overflow='auto'>
                <Accordion width='inherit' >
                    <AccordionItem>
                        <Flex width='inherit' onClick={setIsJsonExpanded.toggle}
                            flexDir='column' alignItems='center'>

                            <Heading
                                size='l'>
                                Show API request
                            </Heading >
                            <Flex alignSelf='center'>
                            <AccordionButton _focus={{}} _hover={{}}>
                                {isJsonExpanded ? (
                                    <FiChevronUp fontSize="12px" />
                                ) : (
                                    <FiChevronDown fontSize="12px" />
                                )}
                            </AccordionButton>
                            </Flex>
                        </Flex>

                        {isJsonExpanded &&
                            <AccordionPanel height='inherit'>
                                <Flex overflow='auto'
                                    maxW='inherit' minW='0px' mb='auto' wrap='wrap'>
                                    {requestTxt}
                                </Flex>
                            </AccordionPanel>}


                    </AccordionItem>
                </Accordion>
            </Flex>


        </VStack >
    )
}