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

        if(parseFloat(this.HttpContext.path.params["x"]) == null){
            console.log("rwewerwer");
        }
        let op = this.HttpContext.path.params["op"];
        let x = parseFloat(this.HttpContext.path.params["x"]);
        let y = parseFloat(this.HttpContext.path.params["y"]);
        let n = parseFloat(this.HttpContext.path.params["n"]);
        


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
            if (y == 0) {
                this.HttpContext.response.JSON({ op: op, x: x, y: y, value: "NaN" })
            }
            else {
                this.HttpContext.response.JSON({ op: op, x: x, y: y, value: (x % y) })
            }

        }
        if (op == "!") {
            
            if(n == 0){
                this.HttpContext.response.JSON({ op: op, n: n, error: "Impossible with 0" })
            }
            else if(n < 0){
                this.HttpContext.response.JSON({ op: op, n: n, error: "Numbers needs to be above 0" })
            }else if (!Number.isInteger(n)){
                this.HttpContext.response.JSON({ op: op, n: n, error:"n needs to be an Integer" })
            }
            else{
                this.HttpContext.response.JSON({ op: op, n: n, value: (factorial(n)) })
            }
            
        }
        if (op == "p") {
            if (n == 0) {
                this.HttpContext.response.JSON({ op: op, n: n, error: "Impossible with 0" })
            }
            else if(!Number.isInteger(n)){
                this.HttpContext.response.JSON({ op: op, n: n, error:"n needs to be an Integer" })
            }
            else{
                this.HttpContext.response.JSON({ op: op, n: n, value: (isPrime(n)) })
            }

        }
        if (op == "np") {


            if (n == 0) {
                this.HttpContext.response.JSON({ op: op, n: n, error: "Impossible with 0" })
            }
            else if(!Number.isInteger(n)){
                this.HttpContext.response.JSON({ op: op, n: n, error:"n needs to be an Integer" })
            }
            else{
                this.HttpContext.response.JSON({ op: op, n: n, value: (findPrime(n)) })
            }


        }


    }


}

function findPrime(n) {
    let primeNumer = 0;
    for (let i = 0; i < n; i++) {
        primeNumer++;
        while (!isPrime(primeNumer)) {
            primeNumer++;
        }
    }
    return primeNumer;
}
function factorial(n) {
    if (n == 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}