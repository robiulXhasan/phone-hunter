// load phone api data
const loadData = async (phoneName) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    productHandler(data.data);
  } catch (error) {
    console.log(error);
  }
};

// show api data 
const showData = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  const error = document.getElementById("error");
  if (phones.length === 0) {
    error.classList.remove("d-none");
  } else {
    error.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card mb-3"">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <h6 class="card-text">Brand: ${phone.brand}</h6>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadDetails('${phone.slug}')" class="btn bg-danger text-white fw-medium" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See details</button>
        </div>
      </div>
    </div>
  </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false);
};
// handling phone using slice and show all button
const productHandler = (phones) => {
  const showAllBtnContainer = document.getElementById("show-allbtn-container");
  if (phones.length < 7) {
    showAllBtnContainer.classList.add("d-none");
    showData(phones);
  } else {
    showAllBtnContainer.classList.remove("d-none");
    showData(phones.slice(0, 6));
    document.getElementById("show-all").addEventListener("click", function () {
      toggleSpinner(true);
      showData(phones);
    });
  }
};

// load details of a phone using their unique slug name
const loadDetails = async (slug) => {
  try {
    toggleSpinner(true);
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${slug}`);
    const data = await res.json();
    console.log(data.data.name);
    showDetails(data.data);
  } catch (error) {
    console.log(error);
  }
};
// show details using modal
const showDetails = (phone) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  <div class="modal-content">
  <div class="modal-header">
      <h1 class="modal-title fs-4 fw-bold" id="staticBackdropLabel">${phone.name}</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body d-flex justify-content-start align-items-center gap-3">
      <img src="${phone.image}" class="img-fluid" />
      <div>
      <h5> <span class="fw-bold">Brand:</span> ${phone.brand} </h5>
      <h6><span class="fw-bold">Storage:</span> ${phone.mainFeatures.storage}</h6>
      <h6><span class="fw-bold">Memory:</span> ${phone.mainFeatures.memory}</h6>
      <h6><span class="fw-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</h6>
      <h6><span class="fw-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</h6>
      <h6><span class="fw-bold">Release Date:</span> ${phone.releaseDate}</h6>
      </div>
  </div>
  <div class="modal-footer">
      <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
  </div>
</div>
  `;
  toggleSpinner(false);
};
// search phone using click event listener
document.getElementById("search-btn").addEventListener("click", function () {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  searchValue = searchField.value;
  searchField.value = "";
  console.log(searchValue);
  loadData(searchValue);
});
// search phone using keypress event listener
document.getElementById("search-field").addEventListener("keypress", function (e) {
  console.log(e.code);
  if (e.code === "Enter") {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    searchValue = searchField.value;
    searchField.value = "";
    console.log(searchValue);
    loadData(searchValue);
  }
});
// spinner Handler
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
// initially load data
loadData("iphone");
