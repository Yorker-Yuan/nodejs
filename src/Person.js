class Person{
    constructor(name=''){
        this.name = name;
    }
    toJSON(){
        const obj = {
            name:this.name
        }
        return JSON.stringify(obj);
    }
}

const f = a=>a*a;
module.exports = {
    Person,
    f
};