function StartChat(id){
    document.getElementById("chatPanel").removeAttribute('style');
    document.getElementById("divStart").setAttribute('style',"display:none");
    hideChatList();
}

///////
function showChatList(){
    document.getElementById('side-1').classList.remove(`d-none`,`d-md-block`);
    document.getElementById('side-2').classList.add(`d-none`);
}
function hideChatList(){
    document.getElementById('side-2').classList.remove(`d-none`);
    document.getElementById('side-1').classList.add(`d-none`,`d-md-block`);
}

//action on enter
function onKeyDown(){
    document.addEventListener("keydown",function(key){
        if(key.which === 13){
            sendMessage();
            // console.log(key)
        }
    })
}
//calling send message
function sendMessage(){
    var message = `<div class="row justify-content-end">
    <div class="col-4 col-sm-7 col-md-7 ">
        <p class="send float-right">${document.getElementById('txtMessage').value}
            <span class="time float-right">1:28 PM</span>
        </p>
    </div>
    <div class="col-2 col-sm-1 col-md-1">
        <img src="./Passport Pic.jpg" alt="Personal Pic" class="chat-pic">
    </div>
</div>`

document.getElementById('messages').innerHTML += message;
document.getElementById('txtMessage').value = "";
document.getElementById('txtMessage').focus();

document.getElementById('messages').scrollTo(0,document.getElementById('messages').clientHeight);
}


///Firebase Authentication

function signIn(){
    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider)
    var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        alert(firebase.auth().currentUser.email + '\n' + firebase.auth().currentUser.displayName )
        document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL;
        document.getElementById('imgProfile').title = firebase.auth().currentUser.displayName;
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error)
      });
      firebase.auth().signOut();
}

function signOut(){
    firebase.auth().signOut()
}

// function onFirebaseStateChanged(){
//     firebase.auth().onAuthStateChanged(onStateChanged);
// }


// function onStateChanged(user){
//     if(user){
//         alert(firebase.auth().currentUser.email + '\n' + firebase.auth().currentUser.displayName )
//     }
// }

// ///////
// //call auth state change
// onFirebaseStateChanged();