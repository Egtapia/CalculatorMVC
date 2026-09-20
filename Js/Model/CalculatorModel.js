class CalculatorModel {

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }

        return a / b;
    }

    calculate(a, b, operator) {
        switch (operator) {
            case "+":
                return this.add(a, b);

            case "-":
                return this.subtract(a, b);

            case "×":
            case "*":
                return this.multiply(a, b);

            case "÷":
            case "/":
                return this.divide(a, b);

            default:
                throw new Error("Invalid operator");
        }
    }
}