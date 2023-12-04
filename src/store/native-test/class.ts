import './prototype'
interface DeleteUserInterface {
    type: string
    payload: {
        userId: string
    }

}

class DeleteUser implements DeleteUserInterface{

    payload: { userId: string };
    type: string;

   constructor(type: string, payload: {userId: string}) {
       this.type = type
       this.payload = payload
   }


}

const action = new DeleteUser('DELETE-USER', {
    userId: '2222'
})

