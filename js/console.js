document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded');

    const OPENAI_API_KEY = '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';
    
    const output = document.getElementById('console-output');
    const input = document.getElementById('console-input');
    
    console.log('Output element:', output);
    console.log('Input element:', input);

    if (!output || !input) {
        console.error('Console elements not found');
        return;
    }

    function addLine(text) {
        console.log('Adding line:', text);
        const line = document.createElement('div');
        line.className = 'console-line';
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    // Initialize console
    addLine('SOLANA.EXE initialized... 🚀');
    addLine('Type something and press Enter!');

    // Handle input
    input.addEventListener('keydown', async (e) => {
        console.log('Key pressed:', e.key);
        
        if (e.key === 'Enter') {
            console.log('Enter pressed');
            const command = input.value;
            console.log('Command:', command);
            
            // Clear input
            input.value = '';
            
            // Show user input
            addLine(`> ${command}`);
            
            // Add "thinking" message
            addLine('Processing...');
            
            try {
                // Process command
                const response = await processCommand(command);
                addLine(response);
            } catch (error) {
                console.error('Error:', error);
                addLine('An error occurred. Please try again.');
            }
        }
    });

    async function processCommand(command) {
        console.log('Processing command:', command);
        
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "system",
                        content: "You are SOLANA.EXE, a fun and enthusiastic AI that loves Solana and memecoins. Keep responses short and fun, use emojis."
                    }, {
                        role: "user",
                        content: command
                    }]
                })
            });

            const data = await response.json();
            console.log('API response:', data);
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error);
            return 'Error processing command. Please try again.';
        }
    }

    // Keep focus on input
    input.focus();
    document.addEventListener('click', () => {
        input.focus();
        console.log('Input focused');
    });
}); 