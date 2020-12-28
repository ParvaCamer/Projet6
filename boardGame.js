function randomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Board {
    constructor(player1, player2) {
        this.players = [player1, player2]
        this.setBoard()
        this.setPlayers()
        // this.randomSpot()
    }

    // Génération du plateau
    setBoard() {
        let chanceToGetObstacle = 0
        document.write('<div id ="boardgame">');
        document.write('<table>');
        for (let x = 0; x < 10; x++) // CREER 10 LIGNES
        {
            document.write('<tr>');
            for (let y = 0; y < 10; y++) // CREER 10 CASES PAR LIGNE
            {
                chanceToGetObstacle = randomIndex(11)
                if (chanceToGetObstacle > 8) {
                    document.write('<td><a><div id="' + x + '-' + y + '" class="anotherObstacle"></div></a></td>');
                } else {
                    document.write('<td><a><div id="' + x + '-' + y + '" class="caseBlanc"></div></a></td>');
                }
            }
            document.write('</tr>');
        }
        document.write('</table>');
        document.write('</div>');
    }

    setPlayers() {
        // On défini les coordonnées du joueur 1 et on le pose sur le plateau
        let coordPlayer1 = this.players[0].GetCoords() // x et y du perso1
        $('#' + coordPlayer1[0] + '-' + coordPlayer1[1]).addClass(this.players[0].nameClass)

        // On défini les coordonnées du joueur 2 et on le pose sur le plateau
        let coordPlayer2 = this.players[1].GetCoords() // x et y du perso 2
        $('#' + coordPlayer2[0] + '-' + coordPlayer2[1]).addClass(this.players[1].nameClass)
    }


    randomSpot() {
        let random_x = randomIndex(10), // x joueur 1
            random_y = randomIndex(10), // y joueur 1
            random_v = randomIndex(10), // x joueur 2
            random_w = randomIndex(10); // y joueur 2
        console.log("On test les positions : ")
        console.log("[", random_x, random_y, "]")
        console.log("[", random_v, random_w, "]")
        while (this.checkObstacle(random_x, random_y) === true || this.checkObstacle(random_x - 1, random_y) === true || this.checkObstacle(random_x + 1, random_y) === true || this.checkObstacle(random_x, random_y - 1) === true || this.checkObstacle(random_x, random_y + 1) === true) { // replace le joueur 1 si présence d'obstacle
            random_x = randomIndex(10) // x joueur 1
            random_y = randomIndex(10)// y joueur 1
        }
        while (this.checkObstacle(random_v, random_w) === true || this.checkObstacle(random_v - 1, random_w) === true || this.checkObstacle(random_v + 1, random_w) === true || this.checkObstacle(random_v, random_w - 1) === true || this.checkObstacle(random_v, random_w + 1) === true) { // replace le joueur 2 si présence d'obstacle
            random_v = randomIndex(10) // x joueur 2
            random_w = randomIndex(10)// y joueur 2
        }

        this.moovePlayer(0, random_x, random_y)
        this.moovePlayer(1, random_v, random_w)

    }

    hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    // Vérifie la présence d'obstacle
    checkObstacle(x, y) {
        let className = ["anotherObstacle"]
        let anotherObstacle = document.getElementById(x + '-' + y)
        console.log(anotherObstacle)
        if (this.hasClass(anotherObstacle, className)){
            console.log("Un obstacle est posé, on change de coordonnées")
            return true
        }
        console.log("Pas d'obstacle")
        return false
    }

    // Bouge le personnage de case
    moovePlayer(playerNumber, x, y) {
        let playerToMoove = this.players[playerNumber]
        let actualPosition = playerToMoove.GetCoords() //les coordonnées x et y du joueur choisi
        $('#' + actualPosition[0] + '-' + actualPosition[1]).removeClass(playerToMoove.nameClass) //enlève la position du joueur de la case
        $('#' + x + '-' + y).addClass(playerToMoove.nameClass) //ajout des nouvelles coordonnées du perso
        playerToMoove.Moove(x, y) //bouge le perso dans la nouvelle case
    }

    // addFight(fight) {
    //     this.fight = fight
    // }

    // goRight(playerNumber){
    //     x= x + 1
    //     moovePlayer(playerNumber, x, y)
    // }
}

// // ne pas mettre dans le fichier generation de carte. plutôt dans un fichier jeu
// // pour bouger dans la direction voulue, faire 4 fonctions : haut - bas - gauche - droite. deux variables : x (axe horizontale) y (axe vertical). exemple :
// // this.x = x. x = 0. on veut bouger à droite alors this.x = x + 1
// // pour bouger à gauche this.x = x - 1


