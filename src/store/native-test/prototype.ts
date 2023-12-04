function User(this: any, name: string, site: string, dob: string){

    this.name = name;
    this.site = site;
    this.dob = dob
}

User.prototype.hello = function (){
    console.log(`Hello i am ${this.name} from ${this.site}`)
}

// @ts-ignore
const user1 = new User('Farid', 'https://cd.by', new Date(1997, 6, 12))
console.log(user1)