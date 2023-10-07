import MathModel from '../models/maths.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathModel()));
    }
    base() {

    }

    help() {
        let helpPagePath = path.join(process.cwd(), wwwroot, 'API-Help-Pages/API-Maths/Help.html');
        this.HttpContext.response.HTML(fs.readFileSync(helpPagePath));
    }

    get() {
        if (this.HttpContext.path.queryString == "?")
            this.help();
        else
            this.doOperation();


    }
    doOperation() {

        let op = this.HttpContext.path.params["op"];
        let x = parseInt(this.HttpContext.path.params["x"]);
        let y = parseInt(this.HttpContext.path.params["y"]);
        let n = parseInt(this.HttpContext.path.params["n"]);


        if (op == " ") {
            this.HttpContext.response.JSON({ op: "+", x: x, y: y, value: (x + y) })
        }
        else if (op == "-") {
            this.HttpContext.response.JSON({ op: op, x: x, y: y, value: (x - y) })
        }
        else if (op == "*") {
            this.HttpContext.response.JSON({ op: op, x: x, y: y, value: (x * y) })
        }
        else if (op == "/") {
            if (y == 0 && x == 0) {

                this.HttpContext.response.JSON({ op: op, x: x, y: y, value: "NaN" })
            } else if (y == 0) {
                this.HttpContext.response.JSON({ op: op, x: x, y: y, value: "Infinity" })
            }
            else {
                this.HttpContext.response.JSON({ op: op, x: x, y: y, value: (x / y) })
            }
        }
        if (op == "%") {
            if(y == 0){
                this.HttpContext.response.JSON({ op: op, x: x, y: y, value: "NaN" })
            }
            else{
                this.HttpContext.response.JSON({ op: op, x: x, y: y, value: (x % y) })
            }
           
        }


    }

}