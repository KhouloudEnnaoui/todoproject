export class Todo{
    constructor(
        public _id?:String,
        public text?:String,
        public completed?:Boolean ,
        public completedAt?:Number, 
        public creator?:String,
    ){

    }
}