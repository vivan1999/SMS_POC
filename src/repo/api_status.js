export class Success{
    constructor(code,response){
        this.code=code;
        this.response=response;
    }
    
  }
  
  export class Failure{
    constructor(code,errorResponse){
        this.code=code;
        this.errorResponse=errorResponse;
    }
    
  }