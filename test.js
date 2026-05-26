"use strict";
// pense-bête TypeScript
//1ere partie
// Déclarations de base
let bool;
let num;
let str;
let tab;
let obj;
let undef;
let nul;
let nimporteQuoi; // à éviter si possible
// Fonction qui ne retourne rien
const fonction = () => {
    console.log("je ne retourne rien");
};
fonction();
// Types simples
let alive = false;
let count = 3;
let text = "waouh";
// Tableaux
let letters = ["a", "b", "c"];
let letters1 = ["a", "b", "c", "d"];
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
function test(valeur) {
    return valeur;
}
console.log(typeof test(false));
// Fonction avec paramètres typés et retour typé
function add(x, y) {
    return x + y;
}
console.log(add(5, 63));
// Fonction qui prend un tableau de string et retourne un number
let test2 = function (param) {
    return param.length;
};
let result = test2(letters1);
console.log(result);
//2eme partie
//les classes 
class pet {
    name;
    breed;
    constructor(name, breed) {
        this.name = name;
        this.breed = breed;
    }
}
let rex = new pet("rex", "dog");
/*
// maniere plus concise
class pet {
constructor(private name:string ,private breed:string){}
}
*/
class vehicule {
    brand;
    model;
    milestone;
    constructor(brand, model, milestone) {
        this.brand = brand;
        this.model = model;
        this.milestone = milestone;
    }
}
class car extends vehicule {
    print() {
        console.log(`${this.brand} ${this.model}`);
    }
}
let kia = new vehicule('kia', 'sportage', 0);
let vehiculBrand = kia.brand;
let renault = new car('renault', "r5", 0);
renault.print();
class Student {
    name;
    birthday;
    schoolName;
    constructor(name, birthday, schoolName) {
        this.name = name;
        this.birthday = birthday;
        this.schoolName = schoolName;
    }
    getAge() {
        const annee = this.birthday.getFullYear();
        let date = new Date();
        let age = date.getFullYear() - annee;
        return age;
    }
}
let etudiant = new Student('julien', new Date(1985, 10, 17), 'cfigambeta');
console.log(etudiant.getAge());
