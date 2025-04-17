let textEditorInput = document.getElementById("input");
    let compailerOutput = document.getElementById("output");
    let runButton = document.getElementById("runbtn");

    runButton.addEventListener("click", () => {
      const code = textEditorInput.value;
      if (!code.trim()) {
        alert("WRITE SOME CODE BEFORE RUNNING IT!");
        return;
      }

      compailerOutput.textContent = "Running...";

      fetch("https://wandbox.org/api/compile.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          compiler: "gcc-head", 
          save: false,
          options: "warning,gnu++17",
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.compiler_error || data.compiler_output) {
          compailerOutput.textContent = `Compiler Output:\n${data.compiler_output || ""}\nCompiler Errors:\n${data.compiler_error || ""}`;
        } else {
          compailerOutput.textContent = `Program Output:\n${data.program_output || ""}`;
        }
      })
      .catch(error => {
        compailerOutput.textContent = `Error: ${error}`;
      });
    });