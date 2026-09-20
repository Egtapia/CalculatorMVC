class CalculatorController {

    constructor(model) {
        this.model = model;

        this.currentValue = "0";
        this.firstOperand = null;
        this.operator = null;

        this.waitingForSecondOperand = false;
        this.justCalculated = false;
    }

    inputDigit(digit) {

        if (this.currentValue === "Error") {
            this.clear();
        }

        if (this.waitingForSecondOperand || this.justCalculated) {
            this.currentValue = digit;
            this.waitingForSecondOperand = false;
            this.justCalculated = false;
        } else {
            this.currentValue =
                this.currentValue === "0"
                    ? digit
                    : this.currentValue + digit;
        }

        return this.currentValue;
    }

    inputDecimal() {

        if (this.currentValue === "Error") {
            this.clear();
        }

        if (this.waitingForSecondOperand || this.justCalculated) {
            this.currentValue = "0.";
            this.waitingForSecondOperand = false;
            this.justCalculated = false;

            return this.currentValue;
        }

        if (!this.currentValue.includes(".")) {
            this.currentValue += ".";
        }

        return this.currentValue;
    }

    chooseOperator(operator) {

        if (this.currentValue === "Error") {
            this.clear();
        }

        const currentNumber = Number(this.currentValue);

        // Change the operator if the user has not entered
        // the second number yet.
        if (this.operator !== null && this.waitingForSecondOperand) {
            this.operator = operator;
            return this.currentValue;
        }

        if (this.firstOperand === null) {
            this.firstOperand = currentNumber;
        } else if (this.operator !== null) {

            try {
                const result = this.model.calculate(
                    this.firstOperand,
                    currentNumber,
                    this.operator
                );

                this.currentValue = this.formatResult(result);
                this.firstOperand = result;

            } catch (error) {
                this.showError();
                return this.currentValue;
            }
        }

        this.operator = operator;
        this.waitingForSecondOperand = true;
        this.justCalculated = false;

        return this.currentValue;
    }

    calculate() {

        if (
            this.operator === null ||
            this.firstOperand === null ||
            this.waitingForSecondOperand
        ) {
            return this.currentValue;
        }

        const secondOperand = Number(this.currentValue);

        try {

            const result = this.model.calculate(
                this.firstOperand,
                secondOperand,
                this.operator
            );

            this.currentValue = this.formatResult(result);

            this.firstOperand = null;
            this.operator = null;
            this.waitingForSecondOperand = false;
            this.justCalculated = true;

            return this.currentValue;

        } catch (error) {

            this.showError();

            return this.currentValue;
        }
    }

    clear() {
        this.currentValue = "0";
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.justCalculated = false;

        return this.currentValue;
    }

    toggleSign() {

        if (this.currentValue === "Error") {
            return this.currentValue;
        }

        const number = Number(this.currentValue);

        if (number !== 0) {
            this.currentValue = this.formatResult(number * -1);
        }

        return this.currentValue;
    }

    percentage() {

        if (this.currentValue === "Error") {
            return this.currentValue;
        }

        const number = Number(this.currentValue);

        this.currentValue = this.formatResult(number / 100);

        return this.currentValue;
    }

    deleteLastDigit() {

        if (
            this.currentValue === "Error" ||
            this.justCalculated
        ) {
            return this.clear();
        }

        if (
            this.currentValue.length === 1 ||
            (
                this.currentValue.length === 2 &&
                this.currentValue.startsWith("-")
            )
        ) {
            this.currentValue = "0";
        } else {
            this.currentValue = this.currentValue.slice(0, -1);
        }

        return this.currentValue;
    }

    getDisplayValue() {
        return this.currentValue;
    }

    formatResult(number) {

        if (!Number.isFinite(number)) {
            return "Error";
        }

        return Number(
            number.toFixed(10)
        ).toString();
    }

    showError() {
        this.currentValue = "Error";
        this.firstOperand = null;
        this.operator = null;
        this.waitingForSecondOperand = false;
        this.justCalculated = true;
    }
}