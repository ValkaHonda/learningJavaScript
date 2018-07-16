class Car{
    constructor(model){
        this.model = model;
    }
    sendData() {
        console.log("Thi is car class")
    }

    
}
class Bike extends Car{
    constructor(model, color){
        super(model)
        this.color = color;
    }
    sendData() {
        console.log("Thi is Bike class")
    }
}

let bike = new Bike("x5","green");

console.log(Bike.prototype.prototype);