# Animal Classifier

A simple, client-side web application built with **React** that uses a pre-trained machine learning model (MobileNet) to classify images of animals. The app runs entirely in the browser using **TensorFlow\.js** — no server or backend required.

---

## Features

* **Client-side image classification**: Upload an image and get predictions produced locally in the browser.
* **Top 3 live predictions**: Displays the top 3 animal labels with confidence scores. 
* **Theme switcher**: Three themes available — Light, Dark, and Forest.
* **Responsive design**: Works well on desktop and mobile devices.
* **No backend required**: All inference runs with TensorFlow\.js on the client.

---

## Tech Stack

* **React** (with Vite)
* **TensorFlow\.js** (MobileNet pre-trained model)
* **Tailwind CSS** for styling
* **Vite** for fast development and build

---

## Demo

Run the app locally (see setup below) to try it out. The app performs inference directly in your browser — no image leaves your machine.

---

## Setup & Installation

> You need Node.js (v16+ recommended) installed.

1. Clone the repository :

```bash
git clone https://github.com/shreyas27092004/animal-classifier-app.git
```

2. Change into the project directory:

```bash
cd animal-classifier-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and go to `http://localhost:5173` (or the port shown in the terminal).

---

## Usage

1. Click the **Upload** button (or drag & drop) and select an image that contains an animal.
2. The app will load the MobileNet model (first run may take a second or two).
3. You will see the **top 3** predictions along with confidence scores.
4. Switch themes using the theme control in the header to toggle between Light, Dark, and Forest.

---

## Building for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` folder. Serve them using any static hosting provider.

---

## Deploying to Netlify

1. Push the repository to GitHub.
2. Sign in to Netlify and click **New site from Git**.
3. Connect your GitHub account and select the repository.
4. Set the build command to `npm run build` and the publish directory to `dist`.
5. Deploy — Netlify will run the build and host your app for free.

---

## Model Details

* **Model**: MobileNet (via `@tensorflow-models/mobilenet`) — a lightweight convolutional neural network optimized for on-device inference.
* **Behavior**: The app loads MobileNet in the browser and runs `classify()` on the uploaded image to get predictions.

---

## Accessibility & Privacy

* **Privacy**: All image classification happens locally in the browser. No images are uploaded to any server.
* **Accessibility**: Use descriptive alt text for uploaded images where applicable and ensure UI controls are keyboard-accessible.

---

## Troubleshooting

* If the model fails to load, check your internet connection — the model weights are fetched the first time and cached by the browser.
* For large images, the browser may take longer to process. Consider resizing images before upload for faster results.

---

## Contributing

Contributions, issues and feature requests are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Please follow the existing code style and include clear commit messages.

---

## License

This project is open source and available under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgements

* MobileNet and TensorFlow\.js team
* Tailwind CSS

---

## Contact

If you have questions or feedback, open an issue on GitHub or reach out via your GitHub profile.
