import {Constantes} from "../../util/Constantes";

class Pagination {
	
	skip
    limit

    constructor() {
        this.skip=0
        this.limit=Constantes.LIMIT
    }

    clone(){
        return new Pagination()
    }

    copy(pagination0:Pagination){
        this.skip=pagination0.skip
        this.limit=pagination0.limit
    }
}

export {Pagination};