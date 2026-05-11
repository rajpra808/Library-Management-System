
$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBA2O5kze6cSrMqrUpDYoP5KZepBsNEa4k",
        authDomain: "library-management-syste-37dc2.firebaseapp.com",
        databaseURL: "https://library-management-syste-37dc2-default-rtdb.firebaseio.com",
        projectId: "library-management-syste-37dc2",
        storageBucket: "library-management-syste-37dc2.firebasestorage.app",
        messagingSenderId: "962676782645",
        appId: "1:962676782645:web:c008daf774bcee5a80e37c",
        measurementId: "G-NZ9VJF0LJ2"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();

    $("#book-form").submit(function(e) {
        e.preventDefault();
    });

    $('#submit').click(function() {
        add_this();
    });

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'index.html';
        }
    });
});

function add_this() {
    var BookCode = document.getElementById("book_code").value;
    var BookName = document.getElementById("book_name").value;
    var Author1 = document.getElementById("author1").value;
    var Author2 = document.getElementById("author2").value;
    var Subject = document.getElementById("Subject").value;
    var tags = document.getElementById("tags").value;
    var db = firebase.firestore();

    if (!BookCode) {
        alert("Book Code is required.");
        return;
    }

    // Prepare the data for update
    var updateData = {};
    if (BookName) updateData.bookname = BookName;
    if (Author1) updateData.author1 = Author1;
    if (Author2) updateData.author2 = Author2;
    if (Subject) updateData.subject = Subject;
    if (tags) updateData.tags = tags;

    // Check if data exists in Firestore
    db.collection("books").doc(BookCode).get()
        .then((doc) => {
            if (doc.exists) {
                // If the document exists, update the fields
                db.collection("books").doc(BookCode).update(updateData)
                    .then(() => {
                        alert("Book successfully updated!");
                        console.log("Update successful!");
                    })
                    .catch((error) => {
                        alert("Error updating document: " + error);
                        console.error("Error updating document: ", error);
                    });
            } else {
                // If the document does not exist, add the book
                db.collection("books").doc(BookCode).set({
                    bookcode: BookCode,
                    bookname: BookName || "",
                    author1: Author1 || "",
                    author2: Author2 || "",
                    subject: Subject || "",
                    tags: tags || ""
                })
                .then(() => {
                    alert("Book successfully added!");
                    console.log("Book added successfully!");
                })
                .catch((error) => {
                    alert("Error adding document: " + error);
                    console.error("Error adding document: ", error);
                });
            }
        })
        .catch((error) => {
            alert("Error fetching document: " + error);
            console.error("Error fetching document: ", error);
        });
}
