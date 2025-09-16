import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image
import gdown
import os

# Google Drive model download (file ID already set)
MODEL_PATH = "xray_model.h5"
if not os.path.exists(MODEL_PATH):
    file_id = "1vY-u9JUgurZYoGpP_5ZHqcCKrzvikfws"
    url = f"https://drive.google.com/uc?id={file_id}"
    gdown.download(url, MODEL_PATH, quiet=False)

# Load model
model = tf.keras.models.load_model(MODEL_PATH)

# Streamlit app UI
st.title("🩻 Chest X-Ray Pneumonia Detection")

uploaded_file = st.file_uploader("Upload a chest X-ray image", type=["jpg", "png", "jpeg"])
if uploaded_file is not None:
    image = Image.open(uploaded_file).convert("RGB")
    st.image(image, caption="Uploaded Image", use_column_width=True)

    # Preprocess image: resize and scale
    img = image.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Prediction
    prediction = model.predict(img_array)

    # Show result (adjust threshold if needed)
    if prediction[0][0] > 0.5:
        st.error("❌ Pneumonia Detected")
    else:
        st.success("✅ Normal Chest X-Ray")
