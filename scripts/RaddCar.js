let RcarForm = document.getElementById("R_carForm");
RcarForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // get the values from the form and delete spaces from it
    // get car name and make it capital to be the same at every car
    let RcarName = document.getElementById("R_carName").value.trim();
    let RcarNameCapital = RcapitalizeCarName(RcarName);
    // get car model
    // let RcarModel = document.getElementById("R_carModel").value.trim();
    // get car price
    let RcarPrice = document.getElementById("R_pricePerDay").value.trim();
    // check if car price is integer 
    if (!RisPriceInteger(RcarPrice)) {
        alert("please enter a positive integer price");
        return;
    }
    // get car url_image
    let RcarImage = document.getElementById("R_carImage").value.trim();
    // get car description
    let RcarDescription = document.getElementById("R_description").value.trim();
    // get car status
    let RcarStatus = document.getElementById("R_status").value;
    // for test
    // console.log({ RcarNameCapital, RcarPrice, RcarImage, RcarDescription, RcarStatus });

    try {
        // return cars from fire store and check dublicated 
        let RcarsCollection = db.collection("cars");
        let RquerySnapshot = await RcarsCollection.where("name", "==", RcarNameCapital).get();
        if (!RquerySnapshot.empty) {
            alert("car already exists");
            return;
        }
        await RcarsCollection.add({
            name: RcarNameCapital,
            url_image: RcarImage,
            pricePerDay: RcarPrice,
            description: RcarDescription,
            status: RcarStatus,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        alert("car added successfully");
        RcarForm.reset();
        window.location.href = "R_index.html";
    } catch (error) {
        console.error("Error: ", error);
        alert("failed to add car");
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