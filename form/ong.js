// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDBXIkjF58K7SIwmbb5oinqhPmEFVnfPLo",
  authDomain: "help-life-96b28.firebaseapp.com",
  projectId: "help-life-96b28",
  storageBucket: "help-life-96b28.appspot.com",
  messagingSenderId: "333592759358",
  appId: "1:333592759358:web:1df02da30a91fd1c35956f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

// Set up our register function
function register() {
  // Get all our input fields
  full_name = document.getElementById("full_name").value;
  responsavel = document.getElementById("responsavel").value;
  endereco = document.getElementById("endereco").value;
  telefone = document.getElementById("telefone").value;
  cnpj = document.getElementById("cnpj").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  breve = document.getElementById("breve").value;
  introducao = document.getElementById("introducao").value;
  image1 = document.getElementById("image1").value;
  image2 = document.getElementById("image2").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Informações incompletas");
    return;
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) {
    alert("Informações incompletas");
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        full_name: full_name,
        responsavel: responsavel,
        endereco: endereco,
        telefone: telefone,
        cnpj: cnpj,
        email: email,
        breve: breve,
        introducao: introducao,
        image1: image1,
        image2: image2,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("ong/" + user.uid).set(user_data);

      // DOne
      alert("Ong registrada com sucesso!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Informações incompletas");
    return;
    // Don't continue running the code
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // DOne
      alert("User Logged In!!");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

var orgNum=0;

function addOng(){
  var aOng = document.getElementById('list')
  
}