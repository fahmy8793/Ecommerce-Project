let RbooksList = document.getElementById("R_bookList");
let RbookCollection = db.collection("cars");

// Fetch books from Firestore
RbookCollection.get()
    .then((querySnapshot) => {
        if (querySnapshot.empty) {
            RbooksList.innerHTML = "<p class='text-center text-muted fs-4 fw-bold'> No books available yet.</p>";
            return;
        }
        RbooksList.innerHTML = "";

        querySnapshot.forEach(doc => {
            // Get book data
            let book = doc.data();
            book.id = doc.id;

            // Create book container
            let Rdiv = document.createElement("div");
            Rdiv.className = "RbookDivStyle shadow-lg rounded p-3 transition-all";

            // Create book image
            let Rimage = document.createElement("img");
            Rimage.src = book.url_image;
            Rimage.className = "RbookImageStyle rounded";
            Rimage.alt = book.name;

            // Create book title
            let RbookName = document.createElement("h3");
            RbookName.textContent = book.name;
            RbookName.className = "RbookModelStyle text-primary text-uppercase";

            // Create book genre
            let RbookGener = document.createElement("p");
            RbookGener.textContent = `📖 Genre: ${book.gener}`;
            RbookGener.className = "text-secondary fw-semibold";

            // Create book price
            let RbookPrice = document.createElement("p");
            RbookPrice.textContent = ` ${book.price} EP`;
            RbookPrice.className = "RbookPriceStyle fw-bold text-danger";

            // Create book status
            let RbookStatus = document.createElement("p");
            RbookStatus.textContent = `Status: ${book.status}`;
            RbookStatus.className = "text-success fw-bold";

            // Create buttons with icons
            let RupdateBook = document.createElement("button");
            RupdateBook.innerHTML = "Update";
            RupdateBook.className = "btn btn-primary mt-2 px-3 fw-bold rounded-pill";
            RupdateBook.addEventListener("click", () => {
                window.location.href = `R_updateBook.html?id=${book.id}`;
            });

            let RshowBook = document.createElement("button");
            RshowBook.innerHTML = "View Details";
            RshowBook.className = "btn btn-info mt-2 px-3 fw-bold rounded-pill";
            RshowBook.addEventListener("click", () => {
                window.location.href = `R_showBook.html?id=${book.id}`;
            });

            let RdeleteBook = document.createElement("button");
            RdeleteBook.innerHTML = "Remove";
            RdeleteBook.className = "btn btn-danger mt-2 px-3 fw-bold rounded-pill";
            RdeleteBook.addEventListener("click", async () => {
                let confirmDelete = confirm(`Are you sure you want to remove "${book.name}"?`);
                if (!confirmDelete) return;
                try {
                    await db.collection("cars").doc(book.id).delete();
                    alert("Book successfully removed!");
                    Rdiv.remove();
                } catch (error) {
                    console.error("Error deleting book:", error);
                    alert("Unable to delete book");
                }
            });

            // Create button container
            let buttonsDiv = document.createElement("div");
            buttonsDiv.className = "d-flex flex-wrap justify-content-between gap-2 mt-3";

            // Append elements
            Rdiv.appendChild(Rimage);
            Rdiv.appendChild(RbookName);
            Rdiv.appendChild(RbookGener);
            Rdiv.appendChild(RbookPrice);
            Rdiv.appendChild(RbookStatus);
            buttonsDiv.appendChild(RupdateBook);
            buttonsDiv.appendChild(RshowBook);
            buttonsDiv.appendChild(RdeleteBook);
            Rdiv.appendChild(buttonsDiv);
            RbooksList.appendChild(Rdiv);
        });
    })
    .catch(err => {
        console.error("Failed to get books:", err);
        RbooksList.innerHTML = "<p class='text-danger text-center fw-bold fs-5'>Error loading books.</p>";
    });
