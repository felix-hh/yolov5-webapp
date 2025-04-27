echo creating sample images

cd ./example_images_yolov5
python ./make_examples.py
cd ..

echo generating static website
npm run build

echo updating aws s3
aws s3 sync ./build s3://instra.felixhaba.com/ 

echo finished