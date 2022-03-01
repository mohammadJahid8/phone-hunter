//  url fetched and load phone 
const loadPhones = () => {
    const searchField = document.getElementById('search-field').value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data.slice(0, 20)));
}


//display phones
const displayPhones = (phones) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach((phone) => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col-md-6', 'col-lg-4');
        div.innerHTML = `
            <div class="card rounded-3 align-items-center shadow-lg bg-body rounded border-0 pt-3">
                <img src="${phone.image}" class="card-img-top w-75" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">
                    Brand: ${phone.brand}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="card-btn btn btn-success px-1 fs-6"><span class="btn-text">Show Details</span></button>
                </div>
            </div>
        `
        phoneContainer.appendChild(div);
    })
}
// load details 
const loadPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.data));
}
const displayDetails = (phoneId) => {
    console.log(phoneId);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <div class="card rounded-3 align-items-center shadow bg-body rounded border-0 pt-3" style="width: 18rem;">
                <img src="${phoneId.image}" class="card-img-top w-75" alt="...">
                <div class="card-body gy-3">
                    <h5><span class="fw-bold">Name:</span> ${phoneId.name}</h5>
                    <h5><span class="fw-bold">Storage:</span> ${phoneId.mainFeatures.storage}</h5>
                    <h5><span class="fw-bold">Storage:</span> ${phoneId.mainFeatures.storage}</h5>
                </div>
        </div>
    `
}