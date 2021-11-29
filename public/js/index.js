document.getElementById("secret_id").value = Math.round(Math.random() * 999999);
const room_id = document.getElementById("room_id");
const generate = document.getElementById("generate");
const from = document.getElementById("form");
const name =document.getElementById("name");

from.addEventListener('submit', (e) => {
    let value = room_id.value;
    let username = name.value;
    if(value.length > 4){
        Swal.fire({
            title: 'Room ID too long!',
            icon: 'error'
        })
        e.preventDefault()
    } else if(value < 0){
        Swal.fire({
            title: 'Room ID is invalid!',
            icon: 'error'
        })
        e.preventDefault()
    }else if (username.length > 12){
        Swal.fire({
            title: 'Nickname too long!',
            icon: 'error'
        })
        name.value = "";
        e.preventDefault()
    } else {
        return true;
    }
})
generate.addEventListener('click', e => {
    e.preventDefault()
    let random = Math.round(Math.random() * 9999);
    room_id.value = random;
});