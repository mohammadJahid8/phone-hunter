//error msg
document.getElementById('error-message').style.display = 'none';

//  url fetched and load phone 
const loadPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value
    // clear search field
    searchField.value = '';
    //error msg
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '' || searchText == 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data.slice(0, 20)))
            .catch(error => displayError(error));
    }




    //clearing details after new search
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
}
// showing error msg
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

//display phones
const displayPhones = (phones) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    if (phones.length == 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    phones.forEach((phone) => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col-md-6', 'col-lg-4');
        div.innerHTML = `
            <div class="card rounded-3 align-items-center shadow-lg bg-body rounded border-0 pt-3">
                <img src="${phone.image}" class="card-img-top w-75" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${phone.phone_name}</h4>
                    <h6 class="fs-5 card-text"><span class="fw-bolder ">Brand:</span>${phone.brand}</h6>
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

// showing details 
const displayDetails = (phoneId) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
    detailsContainer.innerHTML = `
        <div class="card rounded-3 align-items-center shadow bg-body rounded border-0 pt-3" style="width: 18rem;">
                <img src="${phoneId.image}" class="card-img-top w-75" alt="...">
                <div class="card-body gy-3">
                    <h6><span class="fw-bold">Name:</span> ${phoneId.name}</h6>
                    <h6><span class="fw-bold">Realese Date:</span> ${phoneId.releaseDate === '' ? 'unavailable' : `${phoneId.releaseDate}`}</h6>
                    <h6><span class="fw-bold">Brand:</span> ${phoneId.brand}</h6>
                    <h6><span class="fw-bold">Storage:</span> ${phoneId.mainFeatures.storage}</h6>
                    <h6><span class="fw-bold">Display Size:</span> ${phoneId.mainFeatures.displaySize}</h6>
                    <h6><span class="fw-bold">Chipset:</span> ${phoneId.mainFeatures.chipSet}</h6>
                    <h6><span class="fw-bold">Sensor:</span> ${arrayToString(phoneId.mainFeatures.sensors)}</h6>
                    ${phoneId.others ? `
                    <h5 class="fw-bold my-3">More Specifications</h5>
                    <ul>
                        <li><span class="fw-bolder">Bluetooth:</span> ${phoneId.others.Bluetooth}</li>
                        <li><span class="fw-bolder">GPS:</span> ${phoneId.others.GPS}</li>
                        <li><span class="fw-bolder">NFC:</span> ${phoneId.others.NFC}</li>
                        <li><span class="fw-bolder">Radio:</span> ${phoneId.others.Radio}</li>
                        <li><span class="fw-bolder">USB:</span> ${phoneId.others.USB}</li>
                        <li><span class="fw-bolder">WLAN:</span> ${phoneId.others.WLAN}</li>
                    </ul>` : ''}
                </div>
        </div>
    `
}
// converting sensor array to string 
function arrayToString(array) {
    let returned = ``;
    if (array.length === 0) {
        returned += 'none';
    } else {
        for (const el of array) {
            returned += `${el}, `;
        }
    }
    return returned.slice(0, returned.length - 2);
}