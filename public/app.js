var currentUserKey = ''

function StartChat(friendKey, friendName, FriendPhoto) {

    var db = firebase.database().ref('friend_list');
    var flag = false;
    db.on('value', function (friends) {
        friends.forEach(function () {
            var user = data.val;
            if ((user.friendId === frinedList.friendId && user.userId === frinedList.userId) || (user.friendId === frinedList.userId && user.userId === frinedList.friendId)) {
                flag = true;
            }
        })
        if (flag === false) {

            firebase.database().ref('friend_list').push(frinedList, function (error) {
                if (error) alert(error)
                else {
                    document.getElementById("chatPanel").removeAttribute('style');
                    document.getElementById("divStart").setAttribute('style', "display:none");
                    hideChatList();
                }
            })
        } else {
            document.getElementById("chatPanel").removeAttribute('style');
            document.getElementById("divStart").setAttribute('style', "display:none");
            hideChatList();
        }
        ///////////
        //display feind name photo
    })

    var frinedList = { friendId: friendKey, userId: currentUserKey }


}

///////

function populateFriendList() {
    document.getElementById('lstFriend').innerHTML = `<div class="text-center"> 
        <span class="spinner-border text-primary mt-5" style="width:7rem; height:7rem"></span>
        </div>`



    var db = firebase.database().ref('users');
    var lst = '';
    db.on('value', function (users) {
        // if (user.hasChildren()) {
        lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
            <input type="text" placeholder="Search or new chat" class="form-control form-rounded">
        </li>`
        // }
        users.forEach(function (data) {
            var user = data.val();
            if (user.email != firebase.auth().currentUser.email) {
                lst += `<li class="list-group-item list-group-item-action" data-dismiss="modal" onclick="StartChat('${data.key}','${user.name}','${user.photoURL}')">
                <div class="row">
                <div class="col-md-2">
                <img src="${user.photoURL}"
                alt="Personal Pic" class="friend-pic">
                </div>
                <div class="col-md-10" style="cursor: pointer;">
                <div class="name">
                ${user.name}
                </div>
                </div>
                </div>
            </li>`;
            }
        });
        document.getElementById('lstFriend').innerHTML = lst;
    });


}


function showChatList() {
    document.getElementById('side-1').classList.remove(`d-none`, `d-md-block`);
    document.getElementById('side-2').classList.add(`d-none`);
}
function hideChatList() {
    document.getElementById('side-2').classList.remove(`d-none`);
    document.getElementById('side-1').classList.add(`d-none`, `d-md-block`);
}

//action on enter
function onKeyDown() {
    document.addEventListener("keydown", function (key) {
        if (key.which === 13) {
            sendMessage();
            // console.log(key)
        }
    })
}
//calling send message
function sendMessage() {
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

    document.getElementById('messages').scrollTo(0, document.getElementById('messages').clientHeight);
}


///Firebase Authentication

function signIn() {
    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider)
    var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // alert(firebase.auth().currentUser.email + '\n' + firebase.auth().currentUser.displayName )
        var userProfile = { emial: '', name: '', photoURL: '' };
        userProfile.emial = firebase.auth().currentUser.email;
        userProfile.name = firebase.auth().currentUser.displayName;
        userProfile.photoURL = firebase.auth().currentUser.photoURL;

        var db = firebase.database().ref('users');
        var flag = false;
        db.on('value', function (users) {
            users.forEach(function (data) {
                var user = data.val();
                if (user.email === userProfile.email) {
                    flag = true;
                    currentUserKey = data.key;
                }
            });
            if (flag === false) {

                firebase.database().ref('users').push(userProfile, callback);
            } else {
                document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL;
                document.getElementById('imgProfile').title = firebase.auth().currentUser.displayName;

                document.getElementById('lnkSignIn').style = 'display:none';
                document.getElementById('lnkSignOut').style = '';
            }
        })
        document.getElementById('lnkNewChat').classList.remove("disabled");
        document.getElementById('lnkNewChat').classList.remove(`d-none`);


    }).catch(function (error) {
        // Handle Errors here.
        document.getElementById('lnkNewChat').classList.add("disabled");

        console.log(error)

    });
}

function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        document.getElementById('imgProfile').src = './Passport Pic.jpg';
        document.getElementById('imgProfile').title = '';

        document.getElementById('lnkSignIn').style = '';
        document.getElementById('lnkSignOut').style = 'display:none';

        document.getElementById('lnkNewChat').classList.add("disabled");
    }).catch(function (error) {
        akert(error);
    });
}

function callback(error) {
    if (error) {
        alert(error);
    } else {
        document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL;
        document.getElementById('imgProfile').title = firebase.auth().currentUser.displayName;

        document.getElementById('lnkSignIn').style = 'display:none';
        document.getElementById('lnkSignOut').style = '';
    }
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