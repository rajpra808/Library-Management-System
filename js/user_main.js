$(document).ready(function() {

    var firebaseConfig = {
    apiKey: "AIzaSyBin1evT-H6jfR49WIhtVPsGMLzbEklIQY",
    authDomain: "library-management-syste-f2a85.firebaseapp.com",
    databaseURL: "https://library-management-syste-f2a85.firebaseio.com",
    projectId: "library-management-syste-f2a85",
    storageBucket: "library-management-syste-f2a85.appspot.com",
    messagingSenderId: "914416876417",
    appId: "1:914416876417:web:bf9e7762c1c283ba"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    var db = firebase.firestore();
    
    
    db.collection("books").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            $('#books').append(
                "<div><h2>"+doc.data().bookcode+"-" +doc.data().bookname+"</h2>"+
                "<h3>"+doc.data().author1 + " , " +doc.data().author2 +"</h3>"+
                "<h3>"+doc.data().subject+"</h3>"+
                "<p>" + doc.data().tags + "</p>"+
                "</div><hr>");
        });
    });


    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            db.collection("users").where("Email","==",user.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var book = [];
                    book = doc.data().books;
                    books_set = "<ul>";
                    for(var i=0;i<book.length;i++)
                    {
                        books_set = books_set +"<li>"+ book[i] + "</li>" ;
                    }
                    books_set = books_set + "</ul>";
                    
                    $('#about_me').append(
                    "<div><h1>"+"Name :" +doc.data().name+"</h1>"+
                    "<h2>"+"Roll Number : "+doc.data().Roll_Number+"</h2>"+
                    "<h2>"+"Date of Birth : " + doc.data().DOB +"</h2>"+
                    "<h2>"+"E-mail Id: " + doc.data().Email +"</h2><hr>"+
                     " <h2> Books </h2>" +   
                    books_set+
                    "</div>");
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    
        
        }
        });
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                window.location = 'index.html';
            }
        });
    $('#log_button').click(function()
    {
        logout();
    });

});

function logout()
{
    firebase.auth().signOut().then(function() {
        console.log("logout done");
        window.location = 'admin_login.html';
    }).catch(function(error) {
        console.log("error");
    });
}
