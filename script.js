async function submitQuestion() {
    const question = document.getElementById('question').value;
    document.getElementById('response').innerText = data.answer;
    
    try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();
        responseParagraph.innerText = data.answer;
    } catch (error) {
        responseParagraph.innerText = 'Error: ' + error.message;
    }
}

function downloadCSV() {
    window.open('YOUR_BACKEND_ENDPOINT_FOR_DOWNLOAD');
}
