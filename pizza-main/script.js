// GET
fetch('http://localhost:5000/Konyv')
.then(function getAccommodations (datas) {
    return datas.json();
})
.then(function(datas) {
    let container = document.getElementById('kartya');
    for (let i = 0; i < datas.length; i++) {
        let cardHtml = `
            <div class="col-md-4 mb-4">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h3 class="card-title">Könyv neve: ${datas[i].nev}</h3>
                        <h4 class="card-title">Kiadás éve: ${datas[i].kiadasEve}</h4>
                        <h5 class="card-title">Könyv értékelése: ${datas[i].ertekeles}</h5>
                        <img src="${datas[i].kepneve}"/>
                        <i class="bi bi-pencil" onclick="modifyBook(${datas[i].id})"></i>
                        <i class="bi bi-trash3" onclick="deleteBook(${datas[i].id})"></i>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    }
});

//POST
function addBook() {
    const id = document.getElementById('id').value;
    const nev = document.getElementById('nev').value;
    const kiadasEve = document.getElementById('kiadasEve').value;
    const ertekeles = document.getElementById('ertekeles').value;
    const kepneve = document.getElementById('kepneve').value;
    const newBook = {
        nev: nev,
        kiadasEve: kiadasEve,
        ertekeles: ertekeles,
        kepneve: kepneve,
        id : id
    };
    fetch("http://localhost:5000/Konyv", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
    })
}

//DELETE
function deleteBook(id) {
    const confirmDelete = confirm('Biztosan törlöd?');
    if (confirmDelete) {
        fetch(`http://localhost:5000/Konyv/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert("Sikeres törlés");
            } else {
                alert('Hiba történt a törlés során:', response.status);
            }
        })
    }
}

//PUT
function modifyBook(id) {
    const newNev = prompt('New name:');
    const newPrice = prompt('New price:');
    const newId = prompt('New ID:');
    const newLocation = prompt('New location:');
    const newMinNights = prompt('New nights:');
    const newHostname = prompt('New hostname:');
    const updatedAccommodation = {
        name: newName,
        price: newPrice,
        id: newId,
        location: newLocation,
        min_nights: newMinNights,
        hostname: newHostname
    };

    fetch(`https://nodejs.sulla.hu/data/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAccommodation)
    })
    .then(response => {
        if (response.ok) {
            alert("Sikeres módosítás");
        } else {
            alert('Hiba történt a módosítás során:', response.status);
        }
    })
}

//TÖBBI ADAT
function TobbAdat(id) {
    fetch(`https://www.nodejs.sulla.hu/data/${id}`)
    .then(response => response.json())
    .then(data => {
        alert(`Name: ${data.name}\nLocation: ${data.location}\nPrice: ${data.price}\nMinimum nights: ${data.minimum_nights}\nHostname: ${data.hostname}`);
    })
}
