import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";

const form = document.getElementById("chatForm");
const input = document.getElementById("chatInput");
const addBtn = document.getElementById("addStockBtn");
const lastStock = document.getElementById("stockList");

const firstRemoveBtn = document.getElementById("firstBtn")

firstRemoveBtn.addEventListener("click", function(e){
    e.preventDefault();
    const firstStock = document.getElementById("stockChoose");
   if (firstStock) firstStock.remove();
})

addBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const anotherStockDiv = document.createElement("div");
    anotherStockDiv.className= "py-2 text-bg-white stockChoose";
    anotherStockDiv.style = "display: flex;";

    const anotherInput = document.createElement("input");
    anotherInput.type="text";
    anotherInput.name = "stocks[]"
    //anotherInput.id="chatInput";
    anotherInput.className="form-control div-second-header-experience";
    anotherInput.placeholder="Enter stock symbol (e.g. AAPL)";
    anotherInput.autocomplete="off";

    const anotherButton = document.createElement("button");
    anotherButton.type="button";
    anotherButton.className = "chat-send-button";
    anotherButton.textContent = "Remove";
    anotherButton.addEventListener("click", () => anotherStockDiv.remove());

    anotherStockDiv.appendChild(anotherInput);
    anotherStockDiv.appendChild(anotherButton);
    lastStock.appendChild(anotherStockDiv);

});

function showLoading() {
  document.getElementById("loading-overlay").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading-overlay").classList.add("hidden");
}
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const stocks = Array.from(
        form.querySelectorAll('input[name="stocks[]"]')
    )
        .map(input => input.value.trim().toUpperCase())
        .filter(Boolean);
    for (const stock of stocks) {
        if (stock.includes(" ")){
            alert("Wrong format in stock "+stock+" please enter correct stock symbol!");
            return;
        }
    }
    if (stocks.length ===0){
        alert("Please enter at least one stock symbol!");
        return;
    } else if (stocks.length > 5){
        alert("Please enter no more stock symbol than 5!")
        return;
    }
    try {
        showLoading();
        const response = await axios.post("/agentic-ai", {
        stocks: stocks
        });
        const htmlAnalysis = response.data.reply;
        document.querySelectorAll('.stockChoose').forEach(el => el.remove());
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlAnalysis,"text/html");
        const element = document.getElementById("AnalysisContent");
        element.replaceChildren();
        element.appendChild(doc.body.firstElementChild);
    } catch(err) {
        console.error("Error stocks:",err);
    } finally {
        hideLoading();
    }
});