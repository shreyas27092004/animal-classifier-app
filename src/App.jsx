import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setPredictions([]);
      setShowPredictions(false);
    }
  };

  const classifyImage = async () => {
    if (model && imageURL) {
      const imgElement = document.getElementById("uploadedImage");
      const results = await model.classify(imgElement);
      setPredictions(results);
      setTimeout(() => setShowPredictions(true), 100); // small delay for fade-in
    }
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        {/* Theme Switcher */}
        <div className="theme-buttons">
          {["light", "dark", "forest"].map((t) => (
            <button
              key={t}
              className={theme === t ? "active" : ""}
              onClick={() => handleThemeChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Title */}
        <h1>Animal Classifier</h1>
        <p>Upload an image to see what animal it is!</p>

        {/* Upload Button */}
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <button onClick={() => document.getElementById("fileInput").click()}>
          Select Image
        </button>

        {/* Preview */}
        {imageURL && (
          <div className="preview">
            <img
              id="uploadedImage"
              src={imageURL}
              alt="Uploaded Preview"
              crossOrigin="anonymous"
            />
            <button onClick={classifyImage}>Classify Image</button>
          </div>
        )}

        {/* Predictions */}
        {predictions.length > 0 && (
          <div className={`predictions fade-in ${showPredictions ? "show" : ""}`}>
            <h2>Predictions</h2>
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Probability</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map((pred, index) => (
                  <tr key={index}>
                    <td>{pred.className}</td>
                    <td>{(pred.probability * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
