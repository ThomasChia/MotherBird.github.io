// const form = document.querySelector('form');
// const result = document.querySelector('#result');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const file = event.target.elements[0].files[0];
// });


// get the button and input elements
const classifyBtn = document.getElementById('classify-btn');
const fileInput = document.getElementById('file-input');

// add event listener to the button
classifyBtn.addEventListener('click', () => {
  // get the selected file
  const file = fileInput.files[0];
  
  // make the API call to classify the bird
  // replace the URL with the actual API endpoint
  fetch('https://example.com/classify-bird', {
    method: 'POST',
    body: file,
  })
  .then(response => response.json())
  .then(data => {
    // display the result on the page
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `The bird is a ${data.species}.`;
  })
  .catch(error => {
    // handle errors
    console.error('Error:', error);
  });
});