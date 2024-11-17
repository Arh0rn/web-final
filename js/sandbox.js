// Function to run the code entered in the textarea
function runCode() {
    var code = document.getElementById("codeInput").value;
    var consoleOutput = document.getElementById("console");
    try {
        // Clear console before new output
        consoleOutput.textContent = "";
        // Capture console.log output
        var originalConsoleLog = console.log;
        console.log = function (message) {
            consoleOutput.textContent += message + "\n";
        };
        // Execute the code
        eval(code);
        // Restore console.log
        console.log = originalConsoleLog;
    } catch (e) {
        consoleOutput.textContent = "Error: " + e.message;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const codeInput = document.getElementById("codeInput");

    // Intercept the Tab key press in the textarea
    codeInput.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            e.preventDefault(); // Prevent the default tab behavior (focus switch)
            const cursorPosition = codeInput.selectionStart;
            const textBefore = codeInput.value.substring(0, cursorPosition);
            const textAfter = codeInput.value.substring(cursorPosition);

            // Insert 4 spaces at the cursor position
            codeInput.value = textBefore + "    " + textAfter;

            // Move the cursor to the right place after inserting spaces
            codeInput.selectionStart = codeInput.selectionEnd =
                cursorPosition + 4;
        }
    });
});

let codeFontSize = 14; // Default font size for code input
let consoleFontSize = 14; // Default font size for console output

function changeFontSize(target, action) {
    if (target === "code") {
        if (action === "increase") {
            codeFontSize += 2; // Increase font size by 2px
        } else if (action === "decrease") {
            codeFontSize = Math.max(10, codeFontSize - 2); // Decrease font size by 2px, but not smaller than 10px
        }
        document.getElementById(
            "codeInput"
        ).style.fontSize = `${codeFontSize}px`; // Apply the font size to the code input
    } else if (target === "console") {
        if (action === "increase") {
            consoleFontSize += 2; // Increase font size by 2px
        } else if (action === "decrease") {
            consoleFontSize = Math.max(10, consoleFontSize - 2); // Decrease font size by 2px, but not smaller than 10px
        }
        document.getElementById(
            "console"
        ).style.fontSize = `${consoleFontSize}px`; // Apply the font size to the console output
    }
}
