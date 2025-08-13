import React, { useState, useEffect, useRef } from 'react';

// Helper function to add scripts to the document head
const addScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Inject Tailwind CSS for styling
const tailwindCSS = document.createElement('link');
tailwindCSS.setAttribute('rel', 'stylesheet');
tailwindCSS.setAttribute('href', 'https://cdn.tailwindcss.com/2.2.19/tailwind.min.css');
document.head.appendChild(tailwindCSS);


const App = () => {
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Loading Scripts...');
  const [currentTheme, setCurrentTheme] = useState('forest'); // 'light', 'dark', or 'forest'
  const imageRef = useRef();

  // --- Theme Definitions ---
  const themes = {
    light: {
      background: 'bg-gray-100',
      card: 'bg-white',
      title: 'text-gray-800',
      subtitle: 'text-gray-600',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      loaderBorder: 'border-gray-200',
      loaderTop: 'border-t-blue-500',
      statusText: 'text-blue-700',
      predictionItem: 'bg-gray-50 hover:bg-gray-200',
      predictionText: 'text-gray-800',
      predictionProb: 'text-blue-700 bg-blue-100',
      errorText: 'text-red-600',
      themeButton: 'bg-gray-200 text-gray-700',
      activeThemeButton: 'bg-blue-500 text-white'
    },
    dark: {
      background: 'bg-gray-900',
      card: 'bg-gray-800',
      title: 'text-white',
      subtitle: 'text-gray-400',
      button: 'bg-indigo-500 hover:bg-indigo-600 text-white',
      loaderBorder: 'border-gray-700',
      loaderTop: 'border-t-indigo-500',
      statusText: 'text-gray-300',
      predictionItem: 'bg-gray-700 hover:bg-gray-600',
      predictionText: 'text-gray-200',
      predictionProb: 'text-indigo-200 bg-indigo-900',
      errorText: 'text-red-400',
      themeButton: 'bg-gray-700 text-gray-300',
      activeThemeButton: 'bg-indigo-500 text-white'
    },
    forest: {
      background: 'bg-green-50',
      card: 'bg-white',
      title: 'text-green-800',
      subtitle: 'text-green-600',
      button: 'bg-green-600 hover:bg-green-700 text-white',
      loaderBorder: 'border-gray-200',
      loaderTop: 'border-t-green-600',
      statusText: 'text-green-700',
      predictionItem: 'bg-green-100 hover:bg-green-200',
      predictionText: 'text-green-800',
      predictionProb: 'text-green-700 bg-green-200',
      errorText: 'text-red-600',
      themeButton: 'bg-green-200 text-green-800',
      activeThemeButton: 'bg-green-600 text-white'
    }
  };

  const theme = themes[currentTheme];

  // Load TensorFlow.js and the MobileNet model from CDN
  useEffect(() => {
    const loadScriptsAndModel = async () => {
      try {
        await addScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js');
        setStatus('Loading Model...');
        await addScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@latest/dist/mobilenet.min.js');

        const loadedModel = await window.mobilenet.load();
        setModel(loadedModel);
        setLoading(false);
        setStatus('Model Loaded!');
      } catch (error) {
        console.error('Failed to load scripts or model:', error);
        setStatus('Error loading resources. Please refresh.');
        setLoading(false);
      }
    };
    loadScriptsAndModel();
  }, []);

  // Handle image selection
  const handleImageUpload = (event) => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
      setPredictions([]);
    }
  };

  // Classify the image
  const classifyImage = async () => {
    if (model && imageRef.current) {
        setLoading(true);
        setStatus('Classifying...');
        try {
            const modelPredictions = await model.classify(imageRef.current);
            setPredictions(modelPredictions);
        } catch (error) {
            console.error("Error during classification:", error);
            setStatus("Failed to classify image.");
        }
        setLoading(false);
    }
  };

  const ThemeSwitcher = () => (
    <div className="flex justify-center space-x-2 mb-6 p-1 bg-gray-200 dark:bg-gray-900 rounded-lg">
      {Object.keys(themes).map(themeName => (
        <button
          key={themeName}
          onClick={() => setCurrentTheme(themeName)}
          className={`w-full capitalize font-semibold py-2 px-4 rounded-md transition-colors duration-300 ${
            currentTheme === themeName ? theme.activeThemeButton : theme.themeButton
          }`}
        >
          {themeName}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.background} flex flex-col items-center justify-center p-4 font-sans transition-colors duration-500`}>
      <div className={`${theme.card} w-full max-w-md rounded-2xl shadow-xl p-6 space-y-4 transition-colors duration-500`}>
        <ThemeSwitcher />
        <h1 className={`${theme.title} text-3xl font-bold text-center`}>
          Animal Classifier 🌳
        </h1>
        <p className={`${theme.subtitle} text-center`}>Upload an image to see what animal it is!</p>

        {loading && (
          <div className="text-center py-4">
            <p className={`${theme.statusText} text-lg mb-2`}>{status}</p>
            <div className={`ease-linear rounded-full border-4 h-12 w-12 mx-auto ${theme.loaderBorder}`} style={{borderTopColor: theme.loaderTop}}></div>
          </div>
        )}

        {!loading && model && (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <label htmlFor="imageUpload" className={`${theme.button} cursor-pointer font-bold py-2 px-5 rounded-lg transition duration-300 shadow-md hover:shadow-lg`}>
                Select Image
              </label>
              <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            {imageURL && (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full max-w-sm h-auto overflow-hidden rounded-lg shadow-md border-4 border-gray-200 dark:border-gray-700">
                  <img src={imageURL} alt="Uploaded Animal" ref={imageRef} className="w-full h-full object-cover" />
                </div>
                <button onClick={classifyImage} className={`${theme.button} font-bold py-2 px-5 rounded-lg transition duration-300 shadow-md hover:shadow-lg`} disabled={loading}>
                  Classify Animal
                </button>
              </div>
            )}

            {predictions.length > 0 && (
              <div className="pt-4">
                <h2 className={`text-xl font-semibold ${theme.title} mb-3 text-center`}>
                  Top Predictions
                </h2>
                <ul className="space-y-2">
                  {predictions.map((pred, index) => (
                    <li key={index} className={`${theme.predictionItem} p-3 rounded-lg flex justify-between items-center transition-transform transform hover:scale-105`}>
                      <span className={`${theme.predictionText} text-md capitalize`}>{pred.className.split(',')[0]}</span>
                      <span className={`${theme.predictionProb} text-md font-medium py-1 px-3 rounded-full`}>
                        {(pred.probability * 100).toFixed(2)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {!loading && !model && (
             <div className="text-center p-4 bg-red-100 rounded-lg">
                <p className={theme.errorText}>{status}</p>
             </div>
        )}
      </div>
    </div>
  );
};

export default App;
