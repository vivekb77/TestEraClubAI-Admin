
checkLogin();
function checkLogin() {
    firebase.auth().onAuthStateChanged((user)=>{

        if(!user){
            location.replace("login.html") // if user is not logged in , send to login
        }
        if(user){
            var userisAorNot = user.isAnonymous.toString();

            if(userisAorNot === "true"){
                location.replace("login.html") // if user isAnonymous and not logged in , send to home page to login
            }
            if(userisAorNot === "false"){
              // location.replace("index.html")  //do nothing
            }
            
            
        }
    })
}


function Logout (){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}


function GoToIndex(){
    location.replace("index.html")
}

var  VAArray = [];
var counter = 0;  


function GetPlaceholderText(){


   const database = firebase.database();
   
   
database.ref('/PlaceholderText').orderByChild("createdDate").limitToLast(50) 
   .once("value",function(ALLRecords){
       ALLRecords.forEach(
           function(CurrentRecord) {
              
   var placeholderText = CurrentRecord.val().placeholderText;
   var createdDate = CurrentRecord.val().createdDate;

//way 1 just displays day and month
//    let options = { month: 'short', day: 'numeric' };
//   let formatteddate0  = new Date(createdDate);
//   var formatteddate = (formatteddate0.toLocaleDateString("en-US", options));

// way 2 both time and date
var date = new Date(createdDate).toLocaleDateString("en-UK")

var time = new Date(createdDate).toLocaleTimeString("en-UK")

var formatteddate = date+" " +time;

              var VAObject = 
                   {"placeholderText":placeholderText,
                   "formatteddate":formatteddate};
                  
               
               VAArray.push(VAObject)
                 
           });
         
    //new at thte top
      VAArray.reverse()

        counter = 1;  
        
        AddPlaceholdertext(VAArray);
       

       });

}





function AddPlaceholdertext(VAArray){
  
   //remove the placeholer first
   const placeholder1 = document.getElementById('placeholder-animation1');
   placeholder1.innerHTML ='';
   const placeholder2 = document.getElementById('placeholder-animation2');
   placeholder2.innerHTML ='';
   const placeholder3 = document.getElementById('placeholder-animation3');
   placeholder3.innerHTML ='';

for (i=0 ;i < VAArray.length; i++){
  
  
var galaxzdiv = document.createElement('div');
galaxzdiv.className = 'post-preview';
galaxzdiv.id = 'galaxzdiv'+counter;
document.getElementById('maindiv').append(galaxzdiv);

var toppara = document.createElement('p');
toppara.className = 'post-meta';
toppara.id = 'toppara'+counter;
document.getElementById('galaxzdiv'+counter).append(toppara);


amountneeded = ((VAArray[i].totaltokensused/1000)*0.02).toFixed(3);



var curatedDate = document.createElement('span');
curatedDate.id = 'curatedDate'+counter;
curatedDate.innerText = VAArray[i].formatteddate;
document.getElementById('toppara'+counter).append(curatedDate);

var titleDesc = document.createElement('a');
titleDesc.id = 'titleDesc'+counter;
// titleDesc.value = VAArray[i].galaxzId;
document.getElementById('galaxzdiv'+counter).append(titleDesc);

var title = document.createElement('h5');
title.id = 'post-title'+counter;
title.className = 'post-title';
title.innerText = VAArray[i].placeholderText;
document.getElementById('titleDesc'+counter).append(title);

var br = document.createElement("br");
document.getElementById('galaxzdiv'+counter).append(br);

var hr = document.createElement("hr");
hr.className='my-4';
hr.id = 'hr'+counter;
document.getElementById('galaxzdiv'+counter).append(hr);

++counter;

}


}


countTotalRecords();
function countTotalRecords(){


const database = firebase.database();
   
   
database.ref('TestEraAssistant').once('value', function(snapshot) {
   // console.log("Count!", snapshot.numChildren());
   document.getElementById('totalRecords').innerText="Total Queries --- "+snapshot.numChildren(); 
 });

}

countTotalUsers();
function countTotalUsers(){


const database = firebase.database();
   
   
database.ref('UserUsedTokens').once('value', function(snapshot) {
   // console.log("Count!", snapshot.numChildren());
   document.getElementById('totalUsers').innerText="Total Users --- "+snapshot.numChildren(); 
 });

}


totalTokensUsed();
function totalTokensUsed(){

let totaltokensusedsofar = 0

const database = firebase.database();
   
database.ref('/TestEraAssistant').orderByChild("totaltokensused")
   .once("value",function(ALLRecords){
       ALLRecords.forEach(
           function(CurrentRecord) {
              
   var tokenusedforeachquery = CurrentRecord.val().totaltokensused;

   totaltokensusedsofar = tokenusedforeachquery+totaltokensusedsofar;

  
   });
   var totalAmountusedsofar = ((totaltokensusedsofar/1000)*.02).toFixed(3);
   document.getElementById('totalTokens').innerText="Total tokens used --- " +totaltokensusedsofar +"  ( $ " +totalAmountusedsofar+")"; 
        
           
   });

}


queryTokensUsed();
function queryTokensUsed(){

let totalquerytokensusedsofar = 0

const database = firebase.database();
   
database.ref('/TestEraAssistant').orderByChild("querytokensused")
   .once("value",function(ALLRecords){
       ALLRecords.forEach(
           function(CurrentRecord) {
              
   var eachquerytokens = CurrentRecord.val().querytokensused;

   totalquerytokensusedsofar = totalquerytokensusedsofar+eachquerytokens;

  
   });
   var totalAmountusedsofar = ((totalquerytokensusedsofar/1000)*.02).toFixed(3);
   document.getElementById('queryTokens').innerText="Query tokens used --- " +totalquerytokensusedsofar +"  ( $ " +totalAmountusedsofar+")"; 
        
           
   });

}


answerTokensUsed();
function answerTokensUsed(){

let totalanswertokensusedsofar = 0

const database = firebase.database();
   
database.ref('/TestEraAssistant').orderByChild("answertokensused")
   .once("value",function(ALLRecords){
       ALLRecords.forEach(
           function(CurrentRecord) {
              
   var eachanswertokensusedsofar = CurrentRecord.val().answertokensused;

   totalanswertokensusedsofar = totalanswertokensusedsofar+eachanswertokensusedsofar;

  
   });
   var totalAmountusedsofar = ((totalanswertokensusedsofar/1000)*.02).toFixed(3);
   document.getElementById('answerTokens').innerText="Answer tokens used --- " +totalanswertokensusedsofar +"  ( $ " +totalAmountusedsofar+")"; 
        
           
   });

}

