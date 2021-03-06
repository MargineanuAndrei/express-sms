const numberInput = document.getElementById('number'),
    textInput = document.getElementById('msg'),
    button = document.getElementById('button'),
    response = document.querySelector('.response');

button.addEventListener('click', send, false);

const socket = io();
socket.on('smsStatus', function(data) {
    response.innerHTML = '<h6>Text message sent to ' + data.number + '</h6>';
    clearMsg();
})

function clearMsg() {
    setTimeout(function() { response.innerHTML = ''; }, 3000);
}

function send() {
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;
    document.getElementById('number').value = '';
    document.getElementById('msg').value = '';

    fetch('/', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ number: number, text: text })
        })
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        })
}