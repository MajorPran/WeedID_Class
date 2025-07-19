import sys
import os
import torch
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from PIL import Image
import io
import pathlib

pathlib.PosixPath = pathlib.WindowsPath
# Add the YOLOv5 directory to Python path
sys.path.append('.\\yolov5')  # Make sure this path points to your cloned YOLOv5 directory

# Import YOLOv5 components directly
from yolov5.detect import run
from yolov5.utils.torch_utils import select_device

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",  # Be more specific in production
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})

# Load the YOLOv5 model
MODEL_PATH = "model/best.pt"
device = select_device('cpu')  # Use 'cuda' for GPU if available


@app.route('/')
def home():
    return render_template('index.html')

import os
from flask import Flask, request, jsonify
from PIL import Image
import io
import torch
from pathlib import Path

@app.route('/detect', methods=['POST'])
def detect_weed():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Save the uploaded file temporarily
        temp_path = os.path.join('temp_uploads', file.filename)
        os.makedirs('temp_uploads', exist_ok=True)
        file.save(temp_path)
        
        # Setup output directory
        output_dir = os.path.join('static', 'results')
        os.makedirs(output_dir, exist_ok=True)
        
        # Run detection
        results = run(
            weights=MODEL_PATH,  # Your model path
            source=temp_path,    # Path to the saved image
            project=output_dir,  # Save results to static/results
            name='result',      # Subfolder name
            conf_thres=0.25,    # Confidence threshold
            iou_thres=0.45,     # NMS IOU threshold
            save_txt=False,     # Don't save txt files
            save_conf=True,     # Save confidence in labels
            exist_ok=True       # Overwrite existing files
        )
        
        # Get the path of the saved result image
        # YOLOv5 saves results in project/name/image_filename
        result_path = os.path.join(output_dir, 'result', file.filename)
        
        # Move the result to a consistent location
        final_output_path = os.path.join(output_dir, 'result.jpg')
        os.replace(result_path, final_output_path)
        
        # Clean up
        os.remove(temp_path)
        try:
            os.rmdir(os.path.join(output_dir, 'result'))  # Remove empty result directory
        except:
            pass
            
        # Get detection results from the Results object
        detections = []
        if results is not None and len(results) > 0:
            for r in results:
                boxes = r.boxes
                for box in boxes:
                    detection = {
                        "xmin": float(box.xyxy[0][0]),
                        "ymin": float(box.xyxy[0][1]),
                        "xmax": float(box.xyxy[0][2]),
                        "ymax": float(box.xyxy[0][3]),
                        "confidence": float(box.conf),
                        "class": int(box.cls),
                        "class_name": r.names[int(box.cls)]
                    }
                    detections.append(detection)
        
        return jsonify({
            "success": True,
            "result_image": '/static/results/result.jpg',
            "detections": detections
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")  # For debugging
        return jsonify({"error": str(e)}), 500
    
    
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "OK"})

if __name__ == '__main__':
    # Create results directory if it doesn't exist
    os.makedirs(os.path.join('static', 'results'), exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
