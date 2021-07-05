import { Select } from '@chakra-ui/react'


export const ModelSelector = () => {


    return <Select placeholder='Choose your model'>
        <option value='granular'> Medical instruments (with segmentation) </option>
        <option value='uniform'> Medical instruments (uniform) </option>
        <option value='yolov5s'> Default weights </option>
    </Select>
}