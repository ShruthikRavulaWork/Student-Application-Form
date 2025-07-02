const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let expression = "";

const updateDisplay = (value = expression || "0") => {
  display.textContent = value;
};

const liveEvaluate = () => {
  try {
    if (!expression || /[\+\-\*\/.]$/.test(expression)) return;
    const result = new Function(`return (${expression})`)();
    updateDisplay(`${expression} = ${result}`);
  } catch {
    updateDisplay(expression);
  }
};

const appendValue = (value) => {
  expression += value;
  liveEvaluate();
};

const clear = () => {
  expression = "";
  updateDisplay();
};

const deleteLast = () => {
  expression = expression.slice(0, -1);
  liveEvaluate();
};

const evaluateExpression = () => {
  try {
    const result = new Function(`return (${expression})`)();
    expression = result.toString();
    updateDisplay(expression);
  } catch {
    updateDisplay("Error");
    expression = "";
  }
};

buttons.addEventListener("click", (event) => {
  const { target } = event;
  if (target.tagName !== "BUTTON") return;

  const value = target.dataset.value;
  const action = target.dataset.action;

  if (value !== undefined) {
    appendValue(value);
  } else if (action === "clear") {
    clear();
  } else if (action === "delete") {
    deleteLast();
  } else if (action === "equals") {
    evaluateExpression();
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (/[\d\+\-\*\/\.\(\)]/.test(key)) {
    appendValue(key);
  }

  if (key === "Enter") {
    event.preventDefault();
    evaluateExpression();
  }

  if (key === "Backspace") {
    deleteLast();
  }

  if (key === "Escape") {
    clear();
  }
});

updateDisplay();