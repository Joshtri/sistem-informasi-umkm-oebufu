// ALL FEATURE IS HERE.




//live search bar features.
const searchBar = document.querySelector('#search-bar');
const tableRows = document.querySelectorAll('#data-table-view tbody tr');
const noDataMessage = document.getElementById('no-data-message');
const paginationButtons = document.getElementById('pagination-buttons'); // Assuming you have an element with id 'pagination-buttons'

searchBar.addEventListener('input', () => {
const searchTerm = searchBar.value.toLowerCase();
let dataFound = false;

tableRows.forEach((row) => {
    const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const nomorKK = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const alamat = row.querySelector('td:nth-child(4)').textContent.toLowerCase();

    if (name.includes(searchTerm) || nomorKK.includes(searchTerm) || alamat.includes(searchTerm)) {
    row.style.display = '';
    dataFound = true;
    } else {
    row.style.display = 'none';
    }
});

if (!dataFound) {
    // If no data is found, display a message and hide pagination buttons
    noDataMessage.style.display = 'block';
    paginationButtons.style.display = 'none';
} else {
    noDataMessage.style.display = 'none';
    paginationButtons.style.display = 'block';
}
});



//time clock feature.
function updateTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Perbarui waktu setiap detik
setInterval(updateTime, 1000);

// Inisialisasi waktu saat halaman dimuat
updateTime();