const periodButtons = document.querySelectorAll("[data-period]");
let data = [];

// Load the JSON file
fetch("data.json")
.then(res => res.json())
.then(json => {
    data = json;
    updateCards("weekly");
});

periodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const period = btn.dataset.period;
        periodButtons.forEach(button => button.classList.remove("text-white"));
        periodButtons.forEach(button => button.classList.add("text-slate-700"));

        btn.classList.add("text-white");
        btn.classList.remove("text-slate-700")
        updateCards(period);
    });
});

function updateCards(period){
    data.forEach(item => {
        const card = document.querySelector(`.card[data-title="${item.title}"]`);
        if (!card) return;

        const current = card.querySelector(".current-hours");
        const previous = card.querySelector(".previous-hours");

        current.textContent = `${item.timeframes[period].current}hrs`;
        previous.textContent = `Last Week - ${item.timeframes[period].previous}hrs`;
    });
};