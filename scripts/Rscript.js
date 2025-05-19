let RbooksList = document.getElementById("R_bookList");
let RbookCollection = db.collection("cars");
// get cars from firestore
RbookCollection.get()
    .then((querySnapshot) => {
        if (querySnapshot.empty) {
            RbooksList.innerHTML = "<p class='text-center'>No books found.</p>";
            return;
        }
        RbooksList.innerHTML = "";

        querySnapshot.forEach(doc => {
            // get cars 
            let book = doc.data();
            book.id = doc.id;
            // create div that contain the cars
            let Rdiv = document.createElement("div");
            Rdiv.className = "RbookDivStyle";
            // create the image of car
            let Rimage = document.createElement("img");
            Rimage.src = book.url_image;
            Rimage.className = "RbookImageStyle";
            // create the name of the car
            let RbookName = document.createElement("h3");
            RbookName.textContent = book.name;
            // create the book gener
            let RbookGener = document.createElement("p");
            RbookGener.textContent = book.gener;
            RbookGener.className = "RbookGenerStyle";
            // create the price of the car
            let RbookPrice = document.createElement("p");
            RbookPrice.textContent = book.price + " EP";
            RbookPrice.className = "RbookPriceStyle";
            // create car status
            let RbookStatus = document.createElement("p");
            RbookStatus.textContent = book.status;
            // create update button
            let RupdateBook = document.createElement("button");
            RupdateBook.textContent = "Update";
            RupdateBook.className = "btn btn-primary mt-2";
            RupdateBook.addEventListener("click", () => {
                window.location.href = `R_updateBook.html?id=${book.id}`;
            });
            // create show button
            let RshowBook = document.createElement("button");
            RshowBook.textContent = "Show";
            RshowBook.className = "btn btn-info mt-2";
            RshowBook.addEventListener("click", () => {
                window.location.href = `R_showBook.html?id=${book.id}`;
            });
            // create delete button
            let RdeleteBook = document.createElement("button");
            RdeleteBook.textContent = "Delete";
            RdeleteBook.className = "btn btn-danger mt-2";
            RdeleteBook.addEventListener("click", async () => {
                let confirmDelete = confirm("Are you sure you want to delete " + book.name);
                if (!confirmDelete) return;
                try {
                    await db.collection("cars").doc(book.id).delete();
                    alert("Book deleted successfully");
                    Rdiv.remove();
                } catch (error) {
                    console.error("Error deleting book:", error);
                    alert("Failed to delete book");
                }
            });
            // create div to contain all buttons 
            let buttonsDiv = document.createElement("div");
            // add all elements to div
            Rdiv.appendChild(Rimage);
            Rdiv.appendChild(RbookName);
            Rdiv.appendChild(RbookGener);
            Rdiv.appendChild(RbookPrice);
            Rdiv.appendChild(RbookStatus);
            buttonsDiv.appendChild(RupdateBook);
            buttonsDiv.appendChild(RshowBook);
            buttonsDiv.appendChild(RdeleteBook);
            // add the div with it's elements to the main div
            Rdiv.appendChild(buttonsDiv);
            RbooksList.appendChild(Rdiv);
        });
    })
    .catch(err => {
        console.error("faild to get books", err);
        RbooksList.innerHTML = "<p class='text-danger text-center'>failed to load books</p>";
    });
