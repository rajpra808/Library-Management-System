$(document).ready(function () {
    // Firebase configuration
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

    // Prevent default refresh of forms
    $(".login-form, .register-form").submit(function (e) {
        e.preventDefault();
    });

    // Redirect to user portal if already logged in
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            window.location = 'user_portal.html';
        }
    });

    // Event handlers
    $('#log_me_in').click(login);
    $('#register_new').click(register_me);
    $('#log_button').click(logout);
});

function logout() {
    firebase.auth().signOut()
        .then(function () {
            console.log("Logout successful");
            window.location = 'usr_login.html';
        })
        .catch(function (error) {
            console.error("Logout error: ", error);
        });
}

function register_me() {
    // Get input data
    var name = document.getElementById("usr_name").value;
    var Password = document.getElementById("usr_pass").value;
    var Email = document.getElementById("usr_email").value;
    var Roll_number = document.getElementById("usr_roll").value;
    var date_of_birth = document.getElementById("usr_dob").value;
    var books = [];

    // Validate inputs
    if (!name || !Password || !Email || !Roll_number || !date_of_birth) {
        alert("All fields are required!");
        return;
    }

    // Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(Email, Password)
        .then((userCredential) => {
            console.log("User successfully created");

            // Add user to Firestore
            var db = firebase.firestore();
            return db.collection("users").doc(Roll_number).set({
                name: name,
                Email: Email,
                Roll_Number: Roll_number,
                DOB: date_of_birth,
                books: books
            });
        })
        .then(() => {
            console.log("User successfully registered in Firestore!");
            alert("Registration successful!");
            // Optional: Redirect to login or portal
        })
        .catch((error) => {
            console.error("Error during registration: ", error.message);
            alert("Error: " + error.message);
        });
}

function login() {
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Validate inputs
    if (!email || !password) {
        alert("Email and Password are required!");
        return;
    }

    // Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Login successful");
        })
        .catch((error) => {
            console.error("Login error: ", error.message);
            alert("Login failed: " + error.message);
        });
}
