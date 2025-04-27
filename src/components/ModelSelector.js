import { Select } from '@chakra-ui/react'

const MODEL_OPTIONS = [
    {
        value: 'yolov5s',
        name: 'Default weights'
    },
    {
        value: 'granular',
        name: 'Medical instruments (with segmentation)'
    },
    {
        value: 'uniform',
        name: 'Medical instruments (uniform)'
    }
]


export const ModelSelector = ({setSelectedModel, selectedModel}) => {
    return <Select value={selectedModel} onChange={(event) => {
    console.log(event.target)
    setSelectedModel(event.target.value)}}>
        {MODEL_OPTIONS.map(({value, name}) => (
        <option value= {value} key={value}> {name}</option>) )}
    </Select>
}