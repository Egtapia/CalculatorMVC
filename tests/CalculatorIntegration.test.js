import test from "node:test";
import assert from "node:assert/strict";

import { CalculatorModel } from "../Js/Model/CalculatorModel.js";
import { CalculatorController } from "../controller/CalculatorController.js";

function createCalculator() {
    const model = new CalculatorModel();
    const controller = new CalculatorController(model);

    return controller;
}

test("Addition: 5 + 3 = 8", () => {
    const calculator = createCalculator();

    calculator.inputDigit("5");
    calculator.chooseOperator("+");
    calculator.inputDigit("3");

    const result = calculator.calculate();

    assert.equal(result, "8");
});

test("Subtraction: 10 - 4 = 6", () => {
    const calculator = createCalculator();

    calculator.inputDigit("1");
    calculator.inputDigit("0");
    calculator.chooseOperator("-");
    calculator.inputDigit("4");

    const result = calculator.calculate();

    assert.equal(result, "6");
});

test("Multiplication: 5 × 4 = 20", () => {
    const calculator = createCalculator();

    calculator.inputDigit("5");
    calculator.chooseOperator("×");
    calculator.inputDigit("4");

    const result = calculator.calculate();

    assert.equal(result, "20");
});

test("Division: 10 ÷ 2 = 5", () => {
    const calculator = createCalculator();

    calculator.inputDigit("1");
    calculator.inputDigit("0");
    calculator.chooseOperator("÷");
    calculator.inputDigit("2");

    const result = calculator.calculate();

    assert.equal(result, "5");
});

test("Decimal: 2.5 + 1.5 = 4", () => {
    const calculator = createCalculator();

    calculator.inputDigit("2");
    calculator.inputDecimal();
    calculator.inputDigit("5");

    calculator.chooseOperator("+");

    calculator.inputDigit("1");
    calculator.inputDecimal();
    calculator.inputDigit("5");

    const result = calculator.calculate();

    assert.equal(result, "4");
});

test("Division by zero returns Error", () => {
    const calculator = createCalculator();

    calculator.inputDigit("5");
    calculator.chooseOperator("÷");
    calculator.inputDigit("0");

    const result = calculator.calculate();

    assert.equal(result, "Error");
});

test("Delete removes a pending operator without deleting the number", () => {
    const calculator = createCalculator();

    calculator.inputDigit("5");
    calculator.chooseOperator("+");

    calculator.deleteLastDigit();

    assert.equal(calculator.getDisplayValue(), "5");

    calculator.inputDigit("3");

    assert.equal(calculator.getDisplayValue(), "53");
});

test("Display shows only the operator until the next number is entered", () => {
    const calculator = createCalculator();

    calculator.inputDigit("8");
    assert.equal(calculator.getDisplayValue(), "8");

    calculator.chooseOperator("+");
    assert.equal(calculator.getDisplayValue(), "+");

    calculator.inputDigit("8");
    assert.equal(calculator.getDisplayValue(), "8");
});