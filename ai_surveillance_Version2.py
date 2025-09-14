"""
Idea 1: AI-Powered Smart City Surveillance
- Detects faces via webcam, compares them to an auto-fetched local 'wanted' database, and triggers alerts for matches.
"""

import cv2
import os
import requests

DB_PATH = "wanted_faces/"
DB_SOURCE_URL = "https://example.com/api/wanted-faces"  # Replace with real API

def fetch_wanted_faces():
    os.makedirs(DB_PATH, exist_ok=True)
    # Example: Fetch face images from an API and save locally
    # resp = requests.get(DB_SOURCE_URL)
    # for item in resp.json():
    #     filename = os.path.join(DB_PATH, f"{item['id']}.jpg")
    #     with open(filename, "wb") as f:
    #         f.write(requests.get(item["image_url"]).content)
    # Demo: create an empty file as placeholder
    open(os.path.join(DB_PATH, "demo.jpg"), "wb").close()

def is_wanted(face_img):
    for img_file in os.listdir(DB_PATH):
        wanted_img = cv2.imread(os.path.join(DB_PATH, img_file), 0)
        if wanted_img is None:
            continue
        res = cv2.matchTemplate(face_img, wanted_img, cv2.TM_CCOEFF_NORMED)
        if res.max() > 0.8:
            return img_file
    return None

def main():
    if not os.listdir(DB_PATH):
        print("Auto-fetching face database...")
        fetch_wanted_faces()

    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(0)
    print("Monitoring faces. Press Q to quit.")
    while True:
        ret, frame = cap.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        for (x, y, w, h) in faces:
            face_img = gray[y:y+h, x:x+w]
            name = is_wanted(face_img)
            if name:
                print(f"ALERT: Wanted person detected ({name})!")
        cv2.imshow('Surveillance', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()