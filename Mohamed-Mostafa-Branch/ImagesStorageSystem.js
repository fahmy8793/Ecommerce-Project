// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyB7Lw4lts6ldobMELZ0HLiuPd4WK_uirmA",
    authDomain: "jsecommerce-9350b.firebaseapp.com",
    projectId: "jsecommerce-9350b",
    storageBucket: "jsecommerce-9350b.firebasestorage.app",
    messagingSenderId: "1010783396973",
    appId: "1:1010783396973:web:f34f9b12f4bf16c579cb64",
    measurementId: "G-RHVY9CVE46"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = firebase.storage();

// DOM elements
//const imageUpload = document.getElementById('imageUpload');
//const uploadButton = document.getElementById('uploadButton');
//const previewDiv = document.getElementById('preview');
//const statusDiv = document.getElementById('status');


//=====================Uploads an Image and returns it's url
function UploadImage(ImgInputFieldID,){//needs the id of the files input field        and usually called on pressing the upload image button
    const imageUpload = document.getElementById(ImgInputFieldID);
    const file = imageUpload.files[0];
  
  if (!file) {
    console.log("Please select an image first");
    //statusDiv.textContent = "Please select an image first";
    return;
  }

  // Create a storage reference
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`images/${file.name}`);

  // Upload the file
  const uploadTask = imageRef.put(file);

  uploadTask.on('state_changed',
    (snapshot) => {
      // Progress monitoring
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Uploading: ${Math.round(progress)}%`);
      
      //statusDiv.textContent = `Uploading: ${Math.round(progress)}%`;
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(`Upload failed: ${error.message}`);
      //statusDiv.textContent = `Upload failed: ${error.message}`;
    },
    () => {
      // Handle successful uploads
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        //statusDiv.textContent = "Upload complete!";
        //previewDiv.innerHTML = `<img src="${downloadURL}" style="max-width: 300px;">`;
        console.log("File available at", downloadURL);
        return downloadURL;
      });
    }
  );
}




//=====================Returns a promise with the url
function getImageUrlFromImagesFolder(filename) {//needs the file name from the database to get it's url
  // Get Firebase Storage reference
  //const storage = firebase.storage();
  
  // Create reference to the image in the 'images' folder
  const imageRef = storage.ref().child(`images/${filename}`);
  
  // Return the download URL promise
  return imageRef.getDownloadURL()
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.error("Error getting image URL:", error);
      throw error;
    });
}




// getImageUrlFromImagesFolder("2.png")
//   .then((url) => {
//     console.log("Image URL:", url);
//     return url;
//   })
//   .catch((error) => {
//     console.error("Failed to get image:", error);
//   });
 





