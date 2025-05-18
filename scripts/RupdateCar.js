document.addEventListener("DOMContentLoaded", async () => {
    try {
        let Rurl = new URLSearchParams(window.location.search);
        let RcarId = Rurl.get("id");

        if (!RcarId) {
            alert("Ther is no car id");
            return;
        }
        let RcarRef = db.collection("cars").doc(RcarId);
        let Rdoc = await RcarRef.get();
        if (!Rdoc.exists) {
            alert("car not found");
            return;
        }
        let Rdata = Rdoc.data();
        // return the old value about the car in the form
        document.getElementById("R_carName").value = Rdata.name || "";
        document.getElementById("R_pricePerDay").value = Rdata.pricePerDay || "";
        document.getElementById("R_carImage").value = Rdata.url_image || "";
        document.getElementById("R_description").value = Rdata.description || "";
        document.getElementById("R_status").value = Rdata.status || "available";

        document.getElementById("R_carForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            // update car name with capitalize it
            let RcarUpdatedName = document.getElementById("R_carName").value.trim();
            let RcarCapitalizeName = RcapitalizeCarName(RcarUpdatedName);
            // update car price with validation
            let RcarUpdatedPrice = document.getElementById("R_pricePerDay").value.trim();
            if (!RisPriceInteger(RcarUpdatedPrice)) {
                alert("please enter a positive integer price");
                return;
            }
            // update car url_image
            let RcarUpdatedImage = document.getElementById("R_carImage").value.trim();
            // update car description
            let RcarUpdatedDesc = document.getElementById("R_description").value.trim();
            // update car status
            let RcarUpdatedStatus = document.getElementById("R_status").value;
            try {
                await RcarRef.update({
                    name: RcarCapitalizeName,
                    pricePerDay: RcarUpdatedPrice,
                    url_image: RcarUpdatedImage,
                    description: RcarUpdatedDesc,
                    status: RcarUpdatedStatus,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                alert("car updated successfully");
                window.location.href = "R_index.html";
            } catch (error) {
                console.error("Error updating car:", error);
                alert("failed to update car");
            }
        });
    } catch (error) {
        console.error("Error loading car data:", error);
        alert("error loading car data");
    }
});


// capitalize car name
function RcapitalizeCarName(carName) {
    return carName
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