const form = document.querySelector('form');
const result = document.querySelector('#result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = event.target.elements[0].files[0];
});
