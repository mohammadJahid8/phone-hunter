const loadPhones = () => {
    const searchField = document.getElementById('search-field').value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
}