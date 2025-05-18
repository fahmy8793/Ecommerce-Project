window.addEventListener('DOMContentLoaded', async () => {
    let Rurl = new URLSearchParams(window.location.search);
    let RcarId = Rurl.get("id");

    if (!RcarId) {
        alert("Ther is no car id");
        return;
    }
    let db = firebase.firestore();
    let RcarRef = db.collection("cars").doc(RcarId);

    try {
        let Rdoc = await RcarRef.get();
        if (!Rdoc.exists) {
            alert("Car not found");
            return;
        }
        let car = Rdoc.data();
        // create card for car
        let Rcarcontainer = document.getElementById("RcarDetails");
        // create car name
        let RcarName = document.createElement("h3");
        RcarName.textContent = car.name;
        // create url_image
        let Rimage = document.createElement("img");
        Rimage.src = car.url_image;
        Rimage.className = "RcarImageStyle";
        // create car price
        let RcarPrice = document.createElement("p");
        RcarPrice.textContent = "price per day: " + car.pricePerDay + " EP";
        RcarPrice.className = "RcarPriceStyle";
        // create car description
        let RcarDesc = document.createElement("p");
        RcarDesc.textContent = car.description;
        // create car status
        let RcarStatus = document.createElement("p");
        RcarStatus.textContent = "Availabity: " + car.status;
        // add elements to the main div
        Rcarcontainer.appendChild(RcarName);
        Rcarcontainer.appendChild(Rimage);
        Rcarcontainer.appendChild(RcarPrice);
        Rcarcontainer.appendChild(RcarDesc);
        Rcarcontainer.appendChild(RcarStatus);
    } catch (error) {
        console.error("Error loading car:", error);
        alert("Error loading car data.");
    }
});

// back button to return to the previos page
document.getElementById("RbackBtn").addEventListener("click", () => {
    window.history.back();
});
