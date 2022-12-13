
//step 1 export user info from firebase firebase auth:export firebaseusersjson --format=json
// file will be added to folder here
//step 2 run jsonemailparser.html file and click extract button -- csv file with emails will be downloaded

function ExtractData(){

	fetch('firebaseusersjson') //path of json file
    .then((response) => response.json())
    .then((jsonExtracted) => EmailsExtract(jsonExtracted))  

   
}


function EmailsExtract(jsonExtracted){
	EmailArray = []

	for(i=0;i<jsonExtracted.users.length;i++)
	{
		var useremails = (jsonExtracted.users[i].email)
		EmailArray.push(useremails)
	}
	

	const date = new Date();
	 

	let csvData = new Blob([EmailArray], { type: 'text/csv' });  
	let csvUrl = URL.createObjectURL(csvData);

	let hiddenElement = document.createElement('a');
	hiddenElement.href = csvUrl;
	hiddenElement.target = '_blank';
	hiddenElement.download = "FirebaseAccountEmails_"+date + '.csv';
	hiddenElement.click();


}
