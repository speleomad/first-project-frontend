export class Comment {
    id: number;
    date: Date;
    message:string
    constructor(id:number,date:Date, message: string){
        this.id=id;
        this.date=date;
        this.message=message
    }
}
