

function Login(){

    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    

    firebase.auth().signInWithEmailAndPassword(username, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;

    document.getElementById('errormessage1').innerText = errorCode;
    var errorMessage = error.message;
    document.getElementById('errormessage2').innerText = errorMessage;
  });

}

checkLogin();
function checkLogin() {
    firebase.auth().onAuthStateChanged((user)=>{

        if(!user){
          //  do nothing
        }
        if(user){
            var userisAorNot = user.isAnonymous.toString();

            if(userisAorNot === "true"){
               // do nothing
            }
            if(userisAorNot === "false"){
               location.replace("index.html")  //go to index
            }
            
            
        }
    })
}



