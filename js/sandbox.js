// Function to run the code entered in the textarea
function runCode() {
    var code = document.getElementById("codeInput").value;
    var consoleOutput = document.getElementById("console");
    try {
        consoleOutput.textContent = "";
        var originalConsoleLog = console.log;
        console.log = function (message) {
            consoleOutput.textContent += message + "\n";
        };
        eval(code);
        console.log = originalConsoleLog;
    } catch (e) {
        consoleOutput.textContent = "Error: " + e.message;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const codeInput = document.getElementById("codeInput");

    codeInput.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            e.preventDefault();
            const cursorPosition = codeInput.selectionStart;
            const textBefore = codeInput.value.substring(0, cursorPosition);
            const textAfter = codeInput.value.substring(cursorPosition);

            codeInput.value = textBefore + "    " + textAfter;

            codeInput.selectionStart = codeInput.selectionEnd =
                cursorPosition + 4;
        }
    });
});

let codeFontSize = 14;
let consoleFontSize = 14;

function changeFontSize(target, action) {
    if (target === "code") {
        if (action === "increase") {
            codeFontSize += 2;
        } else if (action === "decrease") {
            codeFontSize = Math.max(10, codeFontSize - 2);
        }
        document.getElementById(
            "codeInput"
        ).style.fontSize = `${codeFontSize}px`;
    } else if (target === "console") {
        if (action === "increase") {
            consoleFontSize += 2;
        } else if (action === "decrease") {
            consoleFontSize = Math.max(10, consoleFontSize - 2);
        }
        document.getElementById(
            "console"
        ).style.fontSize = `${consoleFontSize}px`;
    }
}
