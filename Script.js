const screen = document.getElementById('screen');
let currentInput = '';
let operatorUsed = false;

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');
        
        if (value === 'C') {
            
            currentInput = '';
            screen.value = '';
        } else if (value === '=') {
            
            try {
                
                currentInput = eval(currentInput.replace('×', '*').replace('÷', '/'));
                screen.value = currentInput;
            } catch (error) {
                screen.value = 'Error';
                currentInput = '';
            }
        } else {
            
            if (operatorUsed && isNaN(value) && value !== '.') {
                
                return;
            }

            if (value === '.') {
                
                if (currentInput.includes('.') && currentInput.split(/[\+\-\×\÷]/).pop().includes('.')) {
                    return;
                }
            }
            
            
            currentInput += value;
            screen.value = currentInput;

            operatorUsed = ['+', '-', '×', '÷'].includes(value);
        }
    });
});
