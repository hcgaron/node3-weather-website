console.log('client side JS file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');

messageOne.textContent = 'Please enter your location above to get local weather';
messageTwo.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })

    // console.log(location);
})