// Get references to DOM elements
const fileInput = document.getElementById('file-input');
const classifyButton = document.getElementById('classify-button');
const clearButton = document.getElementById('clear-button');
const resultContainer = document.getElementById('result-container');
const image = document.getElementById('uploaded-image');

// Add event listeners for file input, classify button, and clear button
fileInput.addEventListener('change', handleUpload);
classifyButton.addEventListener('click', handleClassify);
clearButton.addEventListener('click', handleClear);

// Handle file upload
function handleUpload(event) {
  const file = event.target.files[0];
  image.src = URL.createObjectURL(file);
}

// Handle classify button click
async function handleClassify() {
    // Convert the image to a base64 encoded string
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    const base64Image = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];

    // Call the API to classify the bird image
    const response = await fetch("https://bigchia-bird-classifier.hf.space/run/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        data: [
        `data:image/jpeg;base64,${base64Image}`,
        ]
    })
    });

    // Parse the API response and display the result
    const data = await response.json();
    console.log(data['data'][0]['confidences'][0]['label'])
    resultContainer.innerText = data['data'][0]['confidences'][0]['label'];
}

// Handle clear button click
function handleClear() {
  image.src = '';
  fileInput.value = '';
  console.log('Clear button clicked');
}

async function classifyImage(reader) {
    const response = await fetch("https://bigchia-bird-classifier.hf.space/run/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data: [
                reader,
            ]
        })
    });

    const json = await response.json();
    console.log(json);
    const label = json['data'][0]['confidences'][0]['label'];
    results.innerHTML = `<br/><img src="${reader.result}" width="300"> <p>${label}</p>`
    console.log("Classification result: ", label);
}
