import os
from PIL import Image
import pillow_heif

# Register the HEIF opener
pillow_heif.register_heif_opener()

INPUT_DIR = r"c:\codebase\nok-website\public\projects"

placeholders = [
    "solar-image-1.jpg",
    "solar-image-2.jpg",
    "solar-image-3.jpg",
    "solar-image-4.jpg",
    "battery-image-1.jpg",
    "battery-image-2.jpg",
    "ev-image-1.jpg",
    "ev-image-2.jpg",
    "ev-image-3.jpg"
]

files = [f for f in os.listdir(INPUT_DIR) if f.lower().endswith(".heic")]

for i, filename in enumerate(files):
    if i >= len(placeholders):
        break # We only need enough to fill the placeholders
    
    input_path = os.path.join(INPUT_DIR, filename)
    target_name = placeholders[i]
    output_path = os.path.join(INPUT_DIR, target_name)
    
    try:
        img = Image.open(input_path)
        img.save(output_path, "JPEG")
        print(f"Converted {filename} to {target_name}")
    except Exception as e:
        print(f"Failed to convert {filename}: {e}")

print("Done converting images.")
