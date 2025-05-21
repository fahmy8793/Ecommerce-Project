window.addEventListener('DOMContentLoaded', async () => {
    let Rurl = new URLSearchParams(window.location.search);
    let RbookId = Rurl.get("id");

    if (!RbookId) {
        alert("Ther is no book id");
        return;
    }
    let db = firebase.firestore();
    let RbookRef = db.collection("cars").doc(RbookId);

    try {
        let Rdoc = await RbookRef.get();
        if (!Rdoc.exists) {
            alert("Book not found");
            return;
        }
        let book = Rdoc.data();
        // create card for car
        let Rbookcontainer = document.getElementById("RbookDetails");
        // create car name
        let RbookName = document.createElement("h3");
        RbookName.textContent = book.name;
        // create url_image
        let Rimage = document.createElement("img");
        Rimage.src = book.url_image;
        Rimage.className = "RbookImageStyle";
        // create car price
        let RbookPrice = document.createElement("p");
        RbookPrice.textContent = "price: " + book.price + " EP";
        RbookPrice.className = "RbookPriceStyle";
        // create car description
        let RbookDesc = document.createElement("p");
        RbookDesc.textContent = book.description;
        // create book gener
        let RbookGener = document.createElement("p");
        RbookGener.textContent = book.gener;
        // create car status
        let RbookStatus = document.createElement("p");
        RbookStatus.textContent = "Availabity: " + book.status;
        // console.log(RbookName, Rimage, RbookPrice, RbookGener, RbookDesc, RbookStatus);

        // add elements to the main div
        Rbookcontainer.appendChild(RbookName);
        Rbookcontainer.appendChild(Rimage);
        Rbookcontainer.appendChild(RbookPrice);
        Rbookcontainer.appendChild(RbookGener);
        Rbookcontainer.appendChild(RbookDesc);
        Rbookcontainer.appendChild(RbookStatus);
    } catch (error) {
        console.error("Error loading book:", error);
        alert("Error loading book data.");
    }
});

// back button to return to the previos page
document.getElementById("RbackBtn").addEventListener("click", () => {
    window.history.back();
});
