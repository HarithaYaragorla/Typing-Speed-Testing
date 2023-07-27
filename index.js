let containerEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteEl = document.getElementById("quoteDisplay");
let inputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");
let options = {
    method: "GET"
}
let url = "https://apis.ccbp.in/random-quote";
fetch(url, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        console.log(jsonData);
        let {
            content
        } = jsonData
        quoteEl.textContent = content;
    });
let counterValue = parseInt(timerEl.textContent);
let uniqueId = setInterval(function() {
    counterValue = counterValue + 1;
    timerEl.textContent = counterValue + " seconds";
}, 1000);
submitBtnEl.addEventListener("click", function(event) {
    if (quoteEl.textContent === inputEl.value) {
        console.log(inputEl.value);
        console.log(quoteEl.textContent);
        clearInterval(uniqueId);
        resultEl.textContent = "You typed in " + counterValue + " seconds";
    } else {
        console.log(inputEl.value);
        console.log(quoteEl.textContent);
        resultEl.textContent = "You typed incorrect sentence";
    }
});
resetEl.addEventListener("click", function() {
    quoteEl.textContent = "";
    resultEl.textContent = "";
    clearInterval(uniqueId);
    inputEl.value = "";
    spinnerEl.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            spinnerEl.classList.add("d-none");
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            let {
                content
            } = jsonData;
            quoteEl.textContent = content;
            timerEl.textContent = 0;
            counterValue = 0;
            let uniqueId = setInterval(function() {
                counterValue = counterValue + 1;
                timerEl.textContent = counterValue + " seconds";
            }, 1000);
        });
});
