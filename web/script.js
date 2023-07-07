document.getElementById('input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('send').click();
    }
});

document.getElementById('send').addEventListener('click', function() {
    var input = document.getElementById('input');
    var messages = document.getElementById('messages');

    // Add the user's message to the chat
    var userMessage = document.createElement('div');
    userMessage.textContent = input.value;
    userMessage.className = 'user-message';
    messages.appendChild(userMessage);

    // Add the loading spinner to the chat
    var loadingMessage = document.createElement('div');
    var loadingImage = document.createElement('img');
    loadingImage.src = 'spinner.gif';
    loadingMessage.appendChild(loadingImage);
    loadingMessage.className = 'assistant-message';
    messages.appendChild(loadingMessage);
    messages.scrollTop = messages.scrollHeight;

    // Send the user's message to the API
    fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: input.value})
    })
    .then(response => response.json())
    .then(data => {
        // Replace the loading spinner with the assistant's response
        loadingMessage.textContent = data.message;

        // Scroll to the bottom of the chat
        messages.scrollTop = messages.scrollHeight;
    });

    // Clear the input
    input.value = '';
});
