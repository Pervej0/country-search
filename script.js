const searchContainer = document.getElementById("searchInput");
const loadingContainer = document.getElementById("loading");
const countryContainer = document.getElementById("country-container");
const detailsContainer = document.getElementById("country-details");

const loadCountry = async () => {
  if (!searchContainer.value || searchContainer.value === "") {
    alert("Please input valid country name");
  } else {
    loadingContainer.style.display = "block";
    const url = `https://restcountries.eu/rest/v2/name/${searchContainer.value}`;
    const res = await fetch(url);
    const data = await res.json();
    setLoadData(data);
    searchContainer.value = "";
    // loading hide-
    loadingContainer.style.display = "none";
  }
};

const setLoadData = (info) => {
  if (info.status === 404) {
    alert("Input result not found");
    return;
  }
  countryContainer.textContent = "";
  detailsContainer.textContent = "";
  info.forEach((element) => {
    const { name, flag, capital } = element;
    // parent div
    let div = document.createElement("div");
    div.classList.add("col-md-3", "col-12");

    // flag-img div--
    let subDiv1 = document.createElement("div");
    subDiv1.classList.add("rounded", "overflow-hidden", "border", "p-2");
    subDiv1.innerHTML = `<img class="w-100" src =${flag} alt = "flag"/>`;

    // flag-info div-
    let subDiv2 = document.createElement("div");
    subDiv2.classList.add(
      "py-2",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "d-md-block",
      "text-md-center"
    );
    subDiv2.innerHTML = `<h3>${name}</h3>
    <button class="btn btn-dark" onclick="loadSingleDetails('${capital}')">Learn More</button>`;

    // append -
    div.appendChild(subDiv1);
    div.appendChild(subDiv2);
    countryContainer.appendChild(div);
  });
};

// loadSingleDetails: fetching single country details by API-
const loadSingleDetails = async (cap) => {
  if (!cap) {
    alert("sorry this country hasn't details");
  } else {
    const url = `https://restcountries.eu/rest/v2/capital/${cap}`;
    const res = await fetch(url);
    const data = await res.json().catch((err) => {
      console.log(err);
    });
    setSingleDetails(data[0]);
  }
};

// setSingleDetails: setting single country details-
const setSingleDetails = (info) => {
  console.log(info);
  detailsContainer.textContent = "";
  detailsContainer.classList.add("border", "p-2");
  const { name, capital, flag, area, population } = info;

  // flag-image div
  let div1 = document.createElement("div");
  div1.classList.add("col-md-7");
  div1.innerHTML = `<img src="${flag}" class="w-100" alt="flag"/>`;

  // country details div-
  let div2 = document.createElement("div");
  div2.classList.add("col-md-5");
  div2.innerHTML = `<h3>${name}</h3>
                    <p>Capital: ${capital}</p>
                    <p>Area: ${area}</p>
                    <p>Population: ${population}</p>`;
  // append div-
  detailsContainer.appendChild(div1);
  detailsContainer.appendChild(div2);
};
