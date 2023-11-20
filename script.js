let conversationHistory = [];

async function submitQuestion() {
    const questionTextArea = document.getElementById('question');
    const responseDiv = document.getElementById('response');
    const question = questionTextArea.value;

    questionTextArea.disabled = true;

    try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question })
        });

        const data = await response.json();
        responseDiv.innerText = data.answer;

        conversationHistory.push({
            question: question,
            answer: data.answer
        });

    } catch (error) {
        responseDiv.innerText = 'Error: ' + error.message;
    } finally {
        questionTextArea.disabled = false;
    }
}

function downloadCSV() {
    // Implement downloadCSV functionality here
}

function displayConversations() {
    const panel = document.getElementById('conversation-panel');
    panel.style.display = 'block';

    let content = '<h3>Conversations</h3>';
    conversationHistory.forEach(({ question, answer }) => {
        content += `<p><strong>Q:</strong> ${question}<br><strong>A:</strong> ${answer}</p>`;
    });

    panel.innerHTML = content;
}
