// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
// // const BASE_URL = "https://currency-api.pages.dev/gh/fawazahmed0/currency-api@1/latest/currencies";
// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

//  const dropdowns = document.querySelectorAll(".dropdown select");
//  const btn = document.querySelector("form button");
//  const fromcurr = document.querySelector(".from select");
//  const tocurr = document.querySelector(".to select");
//  const msg = document.querySelector(".msg")




//  for (let select of dropdowns ) {
//  for (currcode in countryList) {
//     let newOption = document.createElement("option")
//      newOption.innerText = currcode;
//      newOption.value = currcode;
//      if (select.name === "from" && currcode=== "USD"){
//       newOption.selected = "selected";
//      }
//      else if (select.name === "to" && currcode=== "INR") {
//         newOption.selected = "selected";
//        }
//      select.append(newOption);
//  }


// select.addEventListener("change", (evt) =>{
//     updateFlage(evt.target)
// });
//  }
  
//  const  updateExchangeRate = async() =>{
//    let amount = document.querySelector(".amount input");
//    let amtVal = amount.value;
//    if (amtVal ==="" || amtVal < 1) {
//       amtVal = 1;
//       amount.value = "1";
//    }

//    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}`  
//    let response = await fetch(URL);
//    let data = await response.json();
//    let rate = data[tocurr.value.toLowerCase()];
    
//    let finalAmount = amtVal*rate;
//    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
// };

// const updateFlage = (element) =>{
//    let currcode = element.value;
//    let countryCode = countryList[currcode];
//    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//    let img = element.parentElement.querySelector("img");
//    img.src = newSrc;
// };


//  btn.addEventListener("click", async (evt) =>{
//     evt.preventDefault();
//     updateExchangeRate();
   
//  });

// window.document.addEventListener ("load", () => {
//    updateExchangeRate();

// });



const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Ensure countryList is defined before using it
// const countryList = {
//   USD: "US",
//   INR: "IN",
//   EUR: "EU",
//   GBP: "GB",
//   JPY: "JP",
//   CAD: "CA",
//   AUD: "AU",
//   CNY: "CN",
//   // Add more country codes as needed
// };

for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    // Ensure we have the expected structure
    if (!data || !data[fromcurr.value.toLowerCase()] || !data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]) {
      msg.innerText = "Conversion rate not found!";
      return;
    }

    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
  } catch (error) {
    msg.innerText = "Failed to fetch exchange rate!";
    console.error("Error fetching exchange rate:", error);
  }
};

const updateFlag = (element) => {
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Ensure exchange rate updates on page load
window.addEventListener("DOMContentLoaded", () => {
  updateExchangeRate();
});
