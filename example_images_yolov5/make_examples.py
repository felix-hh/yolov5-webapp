from pathlib import Path
import shutil
from PIL import Image
from io import BytesIO
import base64
import json

MAX_SIZE=(200,200)

root = Path('.')
img_dir = root / 'img'
json_dir = root / 'json'
for dir in [img_dir, json_dir]:
    try:
        shutil.rmtree(dir)
    except:
        pass

img_dir.mkdir()
json_dir.mkdir()

def img_to_b64(img): 
    b64 = BytesIO()
    img.save(b64, 'jpeg')
    b64 = base64.b64encode(b64.getvalue()).decode('utf-8')
    return b64

sample_request = json.loads(open(root / 'sample_request.json').read())

img_files = sorted([path for path in root.iterdir() if str(path)[-4:] in ['.png', '.jpg']])
json_result = []
for i, img_file in enumerate(img_files):
    if img_file.suffix == '.jpg':
        print(img_file)
        specific_request = sample_request.copy()
        img = Image.open(img_file).convert('RGB')
        specific_request['Source'] = img_to_b64(img)
        img.thumbnail(MAX_SIZE)
        # modify thumbnail in place
        specific_request['Thumbnail'] = img_to_b64(img)
        specific_request['Name'] = img_file.name
        specific_request['Id'] = i
        json_result.append(specific_request)
        shutil.copy(str(img_file), str(img_dir / f'{i:03d}.jpg'))
        
json_file = root / 'result.json'
with open(json_file, 'w') as f:
    f.write(json.dumps(json_result))

# bonus: move json file to appropiate src/ folder
dst = Path(r"C:\Users\felix\Desktop\aws-yolov5\yolov5_webapp\src\examples\json\result.json")
shutil.copy(json_file, dst)
        