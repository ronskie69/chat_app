class Rooms {

    state = []// 1, 2, 3

    getRoomList(){
        return this.state.length
    }

    addNewRoom(room){
        this.state.push(room)
    }

    isDuplicateRoom(room){
        return this.state.find(roomId => roomId === room) ? 1 : 0
    }

    removeRoom(room){
        this.state.splice(this.state.find(roomId => roomId === room), 1)
    }

}

module.exports = Rooms