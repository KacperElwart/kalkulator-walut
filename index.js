const defaultResult = 0;
let currentResult = defaultResult;

const userValue = document.getElementById("user_amount");
const userCurrency = document.getElementById("user_currency");
const resultOutput = document.getElementById("current_result");
const availableCurrency = document.querySelector(".available_currency");
const showCurrencies = document.querySelector(".show");

const map = new Map();

getUserNumberInput = () => {
  return parseInt(userValue.value);
};

getUserCurrencyInput = () => {
  return parseInt(userCurrency.value);
};

function loadXMLDoc() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      empDetails(this);
    }
  };

  xmlhttp.open("GET", "eurofxref-daily.xml", true);
  xmlhttp.send();
}

function empDetails(xml) {
  let i;
  const xmlDoc = xml.responseXML;
  const x = xmlDoc.getElementsByTagName("Cube");

  for (i = 0; i < x.length; i++) {
    if (
      x[i].getAttribute("currency") &&
      x[i].getAttribute("currency") !== null
    ) {
      const currency = document.createElement("div");
      currency.classList.add("currency");
      const currencyValue = x[i].getAttribute("currency");
      const paragraph = document.createElement("p");
      paragraph.innerHTML = currencyValue;
      currency.appendChild(paragraph);
      availableCurrency.appendChild(currency);

      const rank = document.createElement("div");
      rank.classList.add("rank");
      const rankValue = x[i].getAttribute("rate");
      const paragraphRank = document.createElement("p");
      paragraphRank.innerHTML = rankValue;
      rank.appendChild(paragraphRank);

      availableCurrency.appendChild(rank);

      map.set(x[i].getAttribute("currency"), x[i].getAttribute("rate"));
    }
  }
}

calculateResult = () => {
  if (map.get(userCurrency.value.toUpperCase()) == undefined) {
    alert("Incorrect Currency name");
  } else {
    let currentResult =
      userValue.value * map.get(userCurrency.value.toUpperCase());

    const paragraphResult = document.createElement("p");
    paragraphResult.innerHTML =
      parseFloat(currentResult).toFixed(2) +
      " " +
      userCurrency.value.toUpperCase();
    resultOutput.innerHTML = "";
    resultOutput.appendChild(paragraphResult);
  }
  console.log(map.get(userCurrency.value.toUpperCase()));
};

showMore = () => {
  availableCurrency.classList.add("active");
};

window.addEventListener("DOMContentLoaded", () => {
  loadXMLDoc();
});
