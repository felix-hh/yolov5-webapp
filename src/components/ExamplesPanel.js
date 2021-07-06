import React from 'react'
import {
  HStack,
  Flex,
  Image, 
  useColorModeValue
} from '@chakra-ui/react';
import imageData from '../examples/json/result.json'

export const ExamplesPanel = ({onExampleImageClick}) =>{
  const gridColor = useColorModeValue('black', 'white')
  return (
    <HStack w='100%' h='100%' overflow='auto' spacing={0} wrap='wrap'
    justifyContent='center'>
      {(imageData).map( (item) => (
        <Flex border = '1px solid' borderColor={gridColor} w='19vh' h='200px' key={item['Name']}>
        <Image src={'data:image/jpeg;base64,'.concat(item['Thumbnail'])}
        fit='contain'
        onClick = {(event) => onExampleImageClick(item)}/>
        </Flex>
      )) }
    </HStack>

  )
}

