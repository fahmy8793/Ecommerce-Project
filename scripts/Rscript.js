let RcarsList = document.getElementById("R_carList");
let RcarsCollection = db.collection("cars");
// get cars from firestore
RcarsCollection.get()
    .then((querySnapshot) => {
        if (querySnapshot.empty) {
            RcarsList.innerHTML = "<p class='text-center'>No cars found.</p>";
            return;
        }
        RcarsList.innerHTML = "";

        querySnapshot.forEach(doc => {
            // get cars 
            let car = doc.data();
            car.id = doc.id;
            // create div that contain the cars
            let Rdiv = document.createElement("div");
            Rdiv.className = "RcarDivStyle";
            // create the image of car
            let Rimage = document.createElement("img");
            Rimage.src = car.url_image;
            Rimage.className = "RcarImageStyle";
            // create the name of the car
            let RcarName = document.createElement("h3");
            RcarName.textContent = car.name;
            // create the car model
            // let RcarModel = document.createElement("p");
            // RcarModel.textContent = car.model;
            // RcarModel.className = "RcarModelStyle";
            // create the price of the car
            let RcarPrice = document.createElement("p");
            RcarPrice.textContent = car.pricePerDay + " EP";
            RcarPrice.className = "RcarPriceStyle";
            // create car status
            let RcarStatus = document.createElement("p");
            RcarStatus.textContent = car.status;
            // create update button
            let RupdateCar = document.createElement("button");
            RupdateCar.textContent = "Update";
            RupdateCar.className = "btn btn-primary mt-2";
            RupdateCar.addEventListener("click", () => {
                window.location.href = `R_updateCar.html?id=${car.id}`;
            });
            // create show button
            let RshowCar = document.createElement("button");
            RshowCar.textContent = "Show";
            RshowCar.className = "btn btn-info mt-2";
            RshowCar.addEventListener("click", () => {
                window.location.href = `R_showCar.html?id=${car.id}`;
            });
            // create delete button
            let RdeleteCar = document.createElement("button");
            RdeleteCar.textContent = "Delete";
            RdeleteCar.className = "btn btn-danger mt-2";
            RdeleteCar.addEventListener("click", async () => {
                let confirmDelete = confirm("Are you sure you want to delete " + car.name);
                if (!confirmDelete) return;
                try {
                    await db.collection("cars").doc(car.id).delete();
                    alert("Car deleted successfully");
                    Rdiv.remove();
                } catch (error) {
                    console.error("Error deleting car:", error);
                    alert("Failed to delete car");
                }
            });
            // create div to contain all buttons 
            let buttonsDiv = document.createElement("div");
            // add all elements to div
            Rdiv.appendChild(Rimage);
            Rdiv.appendChild(RcarName);
            // Rdiv.appendChild(RcarModel);
            Rdiv.appendChild(RcarPrice);
            Rdiv.appendChild(RcarStatus);
            buttonsDiv.appendChild(RupdateCar);
            buttonsDiv.appendChild(RshowCar);
            buttonsDiv.appendChild(RdeleteCar);
            // add the div with it's elements to the main div
            Rdiv.appendChild(buttonsDiv);
            RcarsList.appendChild(Rdiv);
        });
    })
    .catch(err => {
        console.error("faild to get cars", err);
        RcarsList.innerHTML = "<p class='text-danger text-center'>failed to load cars</p>";
    });
