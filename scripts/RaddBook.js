let RbookForm = document.getElementById("R_bookForm");
RbookForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // get the values from the form and delete spaces from it
    // get car name and make it capital to be the same at every car
    let RbookName = document.getElementById("R_bookName").value.trim();
    let RbookNameCapital = RcapitalizeBookName(RbookName);
    // get car model
    let RbookGener = document.getElementById("R_bookGener").value.trim();
    // get car price
    let RbookPrice = document.getElementById("R_price").value.trim();
    // check if car price is integer 
    if (!RisPriceInteger(RbookPrice)) {
        alert("please enter a positive integer price");
        return;
    }
    // get car url_image
    let RbookImage = document.getElementById("R_bookImage").value.trim();
    // get car description
    let RbookDescription = document.getElementById("R_description").value.trim();
    // get car status
    let RbookStatus = document.getElementById("R_status").value;
    // for test
    // console.log({ RcarNameCapital, RcarPrice, RcarImage, RcarDescription, RcarStatus });

    try {
        // return cars from fire store and check dublicated 
        let RbooksCollection = db.collection("cars");
        let RquerySnapshot = await RbooksCollection.where("name", "==", RbookNameCapital).get();
        if (!RquerySnapshot.empty) {
            alert("book already exists");
            return;
        }
        await RbooksCollection.add({
            name: RbookNameCapital,
            url_image: RbookImage,
            price: RbookPrice,
            description: RbookDescription,
            gener: RbookGener,
            status: RbookStatus,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        alert("book added successfully");
        RbookForm.reset();
        window.location.href = "R_dashboard.html";
    } catch (error) {
        console.error("Error: ", error);
        alert("failed to add book");
    }
});
// capitalize car name
function RcapitalizeBookName(bookName) {
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