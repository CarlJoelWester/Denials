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
    let content = "data:text/csv;charset=utf-8,Question,Answer\n";
    conversationHistory.forEach(({ question, answer }) => {
        content += `"${question.replace(/"/g, '""')}","${answer.replace(/"/g, '""')}"\n`;
    });

    const displayWindow = window.open();
    displayWindow.document.write("<pre>" + content + "</pre>");
}
