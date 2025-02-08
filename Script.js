const screen = document.getElementById('screen');
let currentInput = '';
let operatorUsed = false;

// Add event listener to buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');
        
        if (value === 'C') {
            // Clear screen
            currentInput = '';
            screen.value = '';
        } else if (value === '=') {
            // Evaluate the expression
            try {
                // Using eval cautiously for basic operations
                currentInput = eval(currentInput.replace('×', '*').replace('÷', '/'));
                screen.value = currentInput;
            } catch (error) {
                screen.value = 'Error';
                currentInput = '';
            }
        } else {
            // Handle numbers and operators
            if (operatorUsed && isNaN(value) && value !== '.') {
                // Prevent consecutive operators
                return;
            }

            if (value === '.') {
                // Prevent multiple decimals in the same number
                if (currentInput.includes('.') && currentInput.split(/[\+\-\×\÷]/).pop().includes('.')) {
                    return;
                }
            }

            // Append the value to current input
            currentInput += value;
            screen.value = currentInput;

            // Check if the last input was an operator
            operatorUsed = ['+', '-', '×', '÷'].includes(value);
        }
    });
});
