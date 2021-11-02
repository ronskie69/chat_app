document.getElementById("secret_id").value = Math.round(Math.random() * 999999);
const room_id = document.getElementById("room_id");
const generate = document.getElementById("generate"); 
generate.addEventListener('click', e => {
    e.preventDefault()
    let random = Math.round(Math.random() * 9999);
    room_id.value = random;
});