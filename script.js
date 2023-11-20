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

        // Save the question and response
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

function displayConversations() {
    const existingPanel = document.getElementById('conversation-panel');
    if (existingPanel) {
        existingPanel.style.display = 'block'; // Show the panel if it already exists
    } else {
        // Create the panel
        const panel = document.createElement('div');
        panel.id = 'conversation-panel';
        panel.style.cssText = `
            position: fixed;
            right: 0;
            top: 0;
            width: 300px;
            height: 100vh;
            background-color: white;
            box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.2);
            padding: 20px;
            overflow-y: auto;
            display: block;
        `;

        let content = '<h3>Conversations</h3>';
        conversationHistory.forEach(({ question, answer }) => {
            content += `<p><strong>Q:</strong> ${question}<br><strong>A:</strong> ${answer}</p>`;
        });

        panel.innerHTML = content;
        document.body.appendChild(panel);
    }
}
