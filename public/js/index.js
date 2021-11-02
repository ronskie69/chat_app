document.getElementById("secret_id").value = Math.round(Math.random() * 999999);
const room_id = document.getElementById("room_id");
const generate = document.getElementById("generate");
const from = document.getElementById("form");

from.addEventListener('submit', (e) => {
    let value = room_id.value;
    if(value.length > 4){
        alert("Room ID must not exceed to 4 digits!");
        e.preventDefault()
        return false;
    } else {
        return true;
    }
})
generate.addEventListener('click', e => {
    e.preventDefault()
    let random = Math.round(Math.random() * 9999);
    room_id.value = random;
});