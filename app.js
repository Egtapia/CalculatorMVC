const model = new CalculatorModel();
const controller = new CalculatorController(model);

const display = document.getElementById('result');
const keypad = document.querySelector('.calculator-keypad');

keypad.addEventListener('click', (event) => {
    const target = event.target;

    if (!target.matches('button')) return;

    const action = target.dataset.action;
    const number = target.dataset.number;
    let newValue;

    if (number !== undefined) {
        newValue = controller.inputDigit(number);
    } else if (action === 'clear') {
        newValue = controller.clear();
    } else if (action === 'delete') {
        newValue = controller.deleteLastDigit();
    } else if (action === 'decimal') {
        newValue = controller.inputDecimal();
    } else if (action === 'calculate') {
        newValue = controller.calculate();
    } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
        newValue = controller.chooseOperator(action);
    }

    if (newValue !== undefined) {
        display.textContent = newValue;
    }
});