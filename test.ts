// pense-bête TypeScript
//1ere partie
// Déclarations de base
let bool: boolean;
let num: number;
let str: string;
let tab: string[];
let obj: object;
let undef: undefined;
let nul: null;
let nimporteQuoi: any; // à éviter si possible

// Fonction qui ne retourne rien
const fonction = (): void => {
  console.log("je ne retourne rien");
};

fonction();

// Types simples
let alive: boolean = false;
let count: number = 3;
let text: string = "waouh";

// Tableaux
let letters: string[] = ["a", "b", "c"];
let letters1: Array<string> = ["a", "b", "c", "d"];

// Type implicite
let text1 = "lorem ipsum";

// Remplacement de texte
let resultat = text1.replace(/l/g, "1");

console.log(resultat);
console.log(letters);
console.log(count);
console.log(alive);
console.log(letters1);

// Fonction avec any
function test(valeur: any): any {
  return valeur;
}

console.log(typeof test(false));

// Fonction avec paramètres typés et retour typé
function add(x: number, y: number): number {
  return x + y;
}

console.log(add(5, 63));

// Fonction qui prend un tableau de string et retourne un number
let test2 = function(param: string[]): number {
  return param.length;
};

let result = test2(letters1);
console.log(result);


//2eme partie


//les classes 

class pet {
    private name:string ; 
    private breed:string ; 
    constructor(name:string , breed:string) {
        this.name = name ; 
        this.breed = breed ; 
    }
}

let rex = new pet("rex" , "dog") ; 

/* 
// maniere plus concise 
class pet {
constructor(private name:string ,private breed:string){}
}
*/


class vehicule {
    constructor(
        public brand: string ,
        protected model : string , 
        private milestone:number)  {}
    }
    class car extends vehicule {
        print():void {
            console.log(`${this.brand} ${this.model}`);
        }
    }
    
    let kia = new vehicule('kia', 'sportage' ,0 ) ; 
    let vehiculBrand = kia.brand ;
    let renault = new car('renault' , "r5" , 0) ;
    renault.print() ;

    // interface 

    interface Person {
        name:string;
        birthday:Date ;

        getAge: () => number ;
    }

    class Student implements Person {

        name: string; 
        birthday: Date; 
        schoolName:string ;

        constructor(name: string, birthday: Date, schoolName:string)
        {
            this.name = name ; 
            this.birthday = birthday ; 
            this.schoolName = schoolName ;
        }
        getAge(): any{
            const annee = this.birthday.getFullYear() ;
          let date = new Date();
          let age = date.getFullYear() - annee ;
          return age  ; 
        }
    }

    let etudiant = new Student('julien' , new Date(1985 ,10,17), 'cfigambeta') ;

    console.log(etudiant.getAge()) ;