class Chat {

    state= [];

    addUsers(user){
        if(this.checkDuplicateName(user.name)){
            user.name = user.name + "" + Math.floor(Math.random() * 9)
        }
        this.state.push(user)
        return user
    }

    removeUser(id){
        let index = this.state.findIndex(user => user.id === id);
        console.log(index)
        if(index > 0 || index !== -1){
            return this.state.splice(index, 1)[0];
        }
    }

    getUsersLength(id){
        let users = this.state.filter(user => user.room_id === id);
        return users.length
    }

    checkDuplicateName(name){
        return this.state.filter(user => user.name === name);
    }

}

module.exports = new Chat();