const socket = io();
const send_message = document.getElementById("send-message");
const input_msg = document.getElementById("input-msg");
const chat_container = document.querySelector(".chat-container");
const currentRoom  = document.getElementById("room_id");
const leave = document.getElementById("leave");
const color_picker = document.getElementById("color-picker");

let newUser = Object.fromEntries(new URLSearchParams(location.search))

displayROOMInfo(newUser.room_id);
initColors();

function displayROOMInfo(roomID){
    currentRoom.innerHTML = roomID;
}

socket.emit('join', newUser );

socket.on('announcement', user => {
    var p = document.createElement("p")
    p.innerHTML = user;
    p.className ="announcement";
    chat_container.appendChild(p);
    chat_container.scrollTop = chat_container.scrollHeight
});

socket.on('active-users', ({active}) => {
    document.getElementById("active-users").innerHTML = active
})

leave.addEventListener('click', () => {
    if(confirm("Are you leaving the chat?")){
        window.location.href = "/";
    } else {
        return;
    }
});

document.querySelector('#send-message').addEventListener('submit', e => {
    e.preventDefault();
    if(input_msg.value === ""){
        return;
    }
    socket.emit('chat', 
    { 
        from: newUser.name, 
        message: input_msg.value,
        secret_id: newUser.secret_id
    });
    input_msg.value = "";
    return false;
});

socket.on('chat', chat => {
    var newChat = document.createElement("div");
    var clearFix = document.createElement("div");
    var h5 = document.createElement("h5");
    var p = document.createElement("p");

    clearFix.className = "clearfix";
    if(chat.from === newUser.name && chat.secret_id === newUser.secret_id){
        h5.innerHTML = "You";
        newChat.className = "current-user";
    } else {
        h5.innerHTML = cap(chat.from);
        newChat.className ="other-user"
    }
    p.innerHTML = chat.message;
    newChat.id = "current-user";
    newChat.appendChild(h5);
    newChat.appendChild(p);

  
    chat_container.appendChild(newChat);
    chat_container.appendChild(clearFix)
    initColors()
    chat_container.scrollTop = chat_container.scrollHeight
});

function cap(name){
    return name.charAt(0).toUpperCase() + name.substr(1);
}

color_picker.addEventListener('change', (e) => {
    saveColors(e.target.value);
})

function saveColors(color){
    localStorage.setItem("colors", color);
    initColors()
}

function initColors(){
    let color = localStorage.getItem("colors");
    let currentUserChildren = chat_container.childNodes;

    
    if(color || color !== null){
        document.querySelector("input[type=color]").value = color
        document.querySelector(".btn-leave").style.backgroundColor = color
        document.getElementById("send-msg").style.backgroundColor = color;
        if(currentUserChildren.length > 0){
            for(let i =0; i < currentUserChildren.length; i++){
                if(currentUserChildren[i].className === "current-user"){
                    currentUserChildren[i].style.backgroundColor = color;
                }
            }
        }
    }
}