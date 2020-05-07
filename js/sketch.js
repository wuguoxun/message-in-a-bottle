"use strict";
// template for firebase

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chatMessages"; // name of folder you create in db
let messageInput;
let sendBtn;
let receiveMessageBtn;
let receivedMessage;
let sendAgainBtn;
let receiveDiv, sendDiv;

function setup() {

  noCanvas();


  messageInput = document.querySelector("#messageInput");
  sendBtn = document.querySelector("#sendBtn");
  receiveMessageBtn = document.querySelector("#receiveMessageBtn");
  receivedMessage = document.querySelector("#receivedMessage");
  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");
  sendAgainBtn = document.querySelector("#sendAgainBtn");

  sendBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);
  sendAgainBtn.addEventListener('click', sendAgain);


  let config = {
    apiKey: "AIzaSyDA6HQ8u_RSRSz62IUmNLeVc6QyEVG_cRs",
    authDomain: "black-tenure-275919.firebaseapp.com",
    databaseURL: "https://black-tenure-275919.firebaseio.com",
    projectId: "black-tenure-275919",
    storageBucket: "black-tenure-275919.appspot.com",
    messagingSenderId: "865657789544",
    appId: "1:865657789544:web:9cd9257e2cd76ed71eafdd",
    measurementId: "G-9EWT9JJJ95"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!
}

function draw() {

}

function sendMessage() {

  if (messageInput.value) {
    let timestamp = Date.now();
    nodeData = {

      messageText: messageInput.value,
      timestamp: timestamp,
      received: false,
    }


    createNode(folderName, timestamp, nodeData)

    console.log("sent message:");
    console.log(nodeData);

    messageInput.value = ''

    sendDiv.style.display = 'none';
    receiveDiv.style.display = 'block';

  } else {

    alert("tpye message first!")
  }
}


// function displayChat() {
//
//   let length = fbDataArray.length;
//
//   createP(fbDataArray[length - 1].message);
//
//   sendMessage.value('');
//
//   // for (let i = 0; i < length; i++){
//   //   createP(fbDataArray[i].message);
//   // }
// }

function receiveMessage() {

  for (let i = 0; i < fbDataArray.length; i++) {
    if (fbDataArray[i].received === false) {
      // console.log('get message');
      // console.log(fbDataArray[i].messageText);

      receivedMessage.innerHTML = fbDataArray[i].messageText;

      updateNode(folderName, fbDataArray[i].timestamp, {
        received: true
      });

      receiveMessageBtn.style.display = 'none';
      sendAgainBtn.style.display = 'block';

      break;

    } else {
      // console.log('no more message');
      receivedMessage.innerHTML = "no more message";

    }
  }


}

function sendAgain(){
  receivedMessage.innerHTML = "";
  receiveMessageBtn.style.display = 'block';
  sendAgainBtn.style.display = 'none';


  receiveDiv.style.display = 'none';
  sendDiv.style.display = 'block';

}
