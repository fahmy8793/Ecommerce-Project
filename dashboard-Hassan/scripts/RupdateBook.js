document.addEventListener("DOMContentLoaded", async () => {
    try {
        let Rurl = new URLSearchParams(window.location.search);
        let RbookId = Rurl.get("id");

        if (!RbookId) {
            alert("Ther is no book id");
            return;
        }
        let RbookRef = db.collection("cars").doc(RbookId);
        let Rdoc = await RbookRef.get();
        if (!Rdoc.exists) {
            alert("book not found");
            return;
        }
        let Rdata = Rdoc.data();
        // return the old value about the car in the form
        document.getElementById("R_bookName").value = Rdata.name || "";
        document.getElementById("R_bookGener").value = Rdata.gener || "";
        document.getElementById("R_price").value = Rdata.price || "";
        document.getElementById("R_bookImage").value = Rdata.url_image || "";
        document.getElementById("R_description").value = Rdata.description || "";
        document.getElementById("R_status").value = Rdata.status || "available";

        document.getElementById("R_bookForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            // update car name with capitalize it
            let RbookUpdatedName = document.getElementById("R_bookName").value.trim();
            let RbookCapitalizeName = RcapitalizeCarName(RbookUpdatedName);
            // update car price with validation
            let RbookUpdatedPrice = document.getElementById("R_price").value.trim();
            if (!RisPriceInteger(RbookUpdatedPrice)) {
                alert("please enter a positive integer price");
                return;
            }
            // update car url_image
            let RbookUpdatedImage = document.getElementById("R_bookImage").value.trim();
            // update book gener
            let RbookUpdatedGener = document.getElementById("R_bookGener").value.trim();
            // update car description
            let RbookUpdatedDesc = document.getElementById("R_description").value.trim();
            // update car status
            let RbookUpdatedStatus = document.getElementById("R_status").value;
            try {
                await RbookRef.update({
                    name: RbookCapitalizeName,
                    pricePerDay: RbookUpdatedPrice,
                    url_image: RbookUpdatedImage,
                    description: RbookUpdatedDesc,
                    status: RbookUpdatedStatus,
                    gener: RbookUpdatedGener,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                alert("book updated successfully");
                window.location.href = "R_dashboard.html";
            } catch (error) {
                console.error("Error updating book:", error);
                alert("failed to update book");
            }
        });
    } catch (error) {
        console.error("Error loading book data:", error);
        alert("error loading book data");
    }
});


// capitalize car name
function RcapitalizeCarName(bookName) {
    return bookName
        .toLowerCase()
        .split(' ')
        .filter(word => word)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ');
}
// check if price is integer or not
function RisPriceInteger(price) {
    let num = Number(price);
    if (Number.isInteger(num) && num > 0) {
        return true;
    }
    return false;
}