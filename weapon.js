class Weapon {

    constructor(name, damage, range, category, awake) {
        this.name = name
        this.damage = damage
        this.range = range
        this.category = category
        this.awake = awake
        // console.log("Arme", this.name, "crée. Dêgats :", this.damage, ". Portée :", this.range, ". Enchantement :", this.awake, ".")
    }

    // //sert pour la portée des attaques et bonus des persos
    describeCategory() {
        if (this.category === 1) {
            this.category = "Épée"
        } else if (this.category === 2) {
            this.category = "Doloire"
        } else {
            this.category = "Lance"
        } 
    }

    // sert pour la description de l'éveil des armes
    getSpecialAttack(i) {
        let specialAwake = ["permet d'annuler l'attaque ennemie. ",
            "soigne de 5 PV par tour.",
            "ajoute 10% de Coup Critique.",
            "peut augmenter l'armure du joueur.",
            "ajoute un point de mouvement",
            "permet de One-shot !",
            "a une chance d'endormir l'ennemi."
        ];
        this.name = i;
        return (this.name + " "+ specialAwake[i])
    }

    // ajoute les caractéristiques du personnage désigné
    addOwner(character) {
        this.character = character
    }

    // active l'éveil de l'arme voulue si le random est bon
    awakening() {
        let random = this.randomIndex(99)
        console.log(random)
        if (this.awake === 1) {
            if (random > 0 && random < 11) {
                this.character.attack = 0;
                console.log("Effet d'enchantement 1 activé :", this.character.name, "ne peut plus attaquer")
            }
        }
        if (this.awake === 2) {
            this.character.Heal(5)  //par tour
            console.log("Effet d'enchantement 2 activé :", this.name, "soigne de 5 PDV")
        }
        if (this.awake === 3) {
            if (random > 0 && random < 11) {
                this.character.attack = this.character.attack * 1.5;
                console.log("Effet d'enchantement 3 activé : coup critique !")
            };
        };
        if (this.awake === 4) {
            if (random > 0 && random < 31) {
                this.character.defense = this.character.defense + 30;
                console.log("Effet d'enchantement 4 activé : l'armure de", this.character.name, " augmente de 30")
            }
        }
        if (this.awake === 5) {
                this.character.moovementPoint = this.character.moovementPoint + 1;
                console.log("Effet d'enchantement 5 activé :", this.character.name, " gagnge un point de mouvement ")
        }
        if (this.awake === 6) {
            if (random === 1) { // character ennemi donc character2
                this.character.lifepoints = 0;
                console.log("Effet d'enchantement 6 activé : ", this.name, " a One-shot.")
            }
        }
        if (this.awake === 7) {
            if (random > 0 && random < 34) { // character ennemi donc character2
                this.character.attack = 0;
                this.character.defense = 0;
                console.log("Effet d'enchantement 7 activé : ", this.character.name, " dort.")
            }
        }

    }
    randomIndex(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

let weapon0 = new Weapon("Épée de vagabond", 10, 1, 1, 0)
let weapon1 = new Weapon("Ombre immaculée", 40, 1, 2, 1)
let weapon2 = new Weapon("Épée du faucon", 28, 1, 1, 2)
let weapon3 = new Weapon("Lance de jade ailée", 30, 2, 3, 3)
let weapon4 = new Weapon("Lance de chasse royale", 32, 2, 3, 4)
let weapon5 = new Weapon("Lance de la voûte d'Azur", 24, 1, 3, 5)
let weapon6 = new Weapon("Mort-du-loup", 36, 1, 2, 6)
let weapon7 = new Weapon("La Flûte", 14, 1, 1, 7)


class Character {

    constructor(name, lifepoints, attack, defense, moovementPoint, bonus, x, y, nameClass) {
        this.name = name
        this.lifepoints = lifepoints
        this.attack = attack
        this.defense = defense
        this.moovementPoint = moovementPoint
        this.bonus = bonus
        this.x = x
        this.y = y
        this.nameClass = nameClass
    }

    //ajout d'un pourcentage d'atq au personnage selon la spécialisation du perso et la catégorie de l'arme
    describePower() {
        if (this.bonus === 1 && this.weapon.category === 2) {
            this.attack = this.attack * 1.06;
            console.log(this.name, "gagne 6% d'ATQ avec une glaive")
        }
        if (this.bonus === 2 && this.weapon.category === 3) {
            this.attack = this.attack * 1.14;
            console.log(this.name, "gagne 14% d'ATQ avec une lance")
        }
        if (this.bonus === 3 && this.weapon.category === 2) {
            this.attack = this.attack * 1.09;
            console.log(this.name, "gagne 9% d'ATQ avec une glaive")
        }
        if (this.bonus === 4 && this.weapon.category === 1) {
            this.attack = this.attack * 1.13;
            console.log(this.name, "gagne 13% d'ATQ avec une épée")
        }
        if (this.bonus === 5 && this.weapon.category === 2) {
            this.attack = this.attack * 1.15;
            console.log(this.name, "gagne 15% d'ATQ avec une glaive")
        }
        if (this.bonus === 6 && this.weapon.category === 3) {
            this.attack = this.attack * 1.1;
            console.log(this.name, "gagne 10% d'ATQ avec une lance")
        }
        if (this.bonus === 7 && this.weapon.category === 1) {
            this.attack = this.attack * 1.18;
            console.log(this.name, "gagne 18% d'ATQ avec une épée")
        }
    }

    // ajout de l'arme dans la classe Character. Càd les propriétés de l'arme
    addWeapon(weapon) {
        this.weapon = weapon
        this.attack = this.weapon.attack //l'attaque du personnage obtient celle de l'arme
        console.log(this.name, "a récupéré", this.weapon.name)
        this.weapon.addOwner(this) //ajout de l'arme au personnage désigné
    }

    // donne l'éveil de l'arme au personnage
    getWeaponSpecialAttack(i) {
        this.weapon.getSpecialAttack(i)
    }

    // obtient le changement de caractéristiques après l'enchantement de l'arme
    awakening() {
        this.weapon.awakening()
    }

    // éveil de l'arme 2. ajoute +5 à la vie du personnage
    Heal(count) {
        this.lifepoints = this.lifepoints + count
    }

    GetCoords() {
        return [this.x,this.y]
    }

    Moove(x, y){
        this.x = x
        this.y = y
    }
}

let character1 = new Character("Diluc", 200, 0, 100, 3, 1, 0, 1, "caseCharacter1")
let character2 = new Character("Childe", 180, 0, 100, 3, 2, 0, 2, "caseCharacter2")
let character3 = new Character("Razor", 192, 0, 100, 3, 3, 0, 3, "caseCharacter3")
let character4 = new Character("Jean", 170, 0, 100, 3, 4, 0, 4, "caseCharacter4")
let character5 = new Character("Chongyun", 166, 0, 100, 3, 5, 0, 5, "caseCharacter5")
let character6 = new Character("Xiangling", 176, 0, 100, 3, 6, 0, 6, "caseCharacter6")
let character7 = new Character("Parva", 160, 0, 100, 3, 7, 0, 7, "caseCharacter7")

character4.addWeapon(weapon1)
character4.describePower()
character4.getWeaponSpecialAttack(1)
character4.awakening()

let myBoard = new Board(character1, character2)
// weapon1.getSpecialAttack()
// weapon2.getSpecialAttack()
// weapon3.getSpecialAttack()

myBoard.randomSpot()