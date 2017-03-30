class GameCharacter {
  constructor(id, healthPoints, attackPoints, counterAttackPoints, image) {
    this.id = id;
    this.healthPoints = healthPoints;
    this.attackPoints = attackPoints;
    this.counterAttackPoints = counterAttackPoints;
    this.image = image;
    this.isMainCharacter = false;
    this.isEnemyCharacter = false;
  }

  incrementAttackPower() {
    return attackPoints += attackPoints;
  }

  isAlive() {
    return this.healthPoints > 0 ? true : false;
  }
}

var game = {
  lukeSkywalker: undefined,
  obiWanKenobi: undefined,
  darthSidious: undefined,
  darthMaul: undefined,
  characters: [],
  chosenCharacter: undefined,
  chosenEnemy: undefined,

  initGame: function() {
    this.lukeSkywalker = new GameCharacter("Luke", 140, 20, 40, "./assets/images/luke.jpg");
    this.obiWanKenobi = new GameCharacter("Obi-Wan", 120, 20, 40, "./assets/images/obi-wan.jpg");
    this.darthVader = new GameCharacter("Vader", 150, 20, 40, "./assets/images/darth-vader.jpg");
    this.darthSidious = new GameCharacter("Sidious", 180, 20, 40, "./assets/images/darth-sidious.jpg");
    this.characters.push(this.lukeSkywalker);
    this.characters.push(this.obiWanKenobi);
    this.characters.push(this.darthVader);
    this.characters.push(this.darthSidious);
  },

  populateChooseCharacterArea: function() {
    // Iterate through characters and create divs to display
    $.each(this.characters, function(i, character) {
      var characterElement = $("<div id=" + character.id.toLowerCase() + ">");
      var imgElement = $("<img>");
      var captionElement = $('<div class="caption">');
      var characterNameElement = $('<span class="character-name">');
      var characterHPElement = $('<p>');

      characterElement.addClass("col-xs-12 col-sm-3 thumbnail");

      imgElement.attr('src', character.image);
      imgElement.addClass("green");
      imgElement.appendTo(characterElement);

      characterNameElement.html(character.id);
      characterNameElement.appendTo(characterElement);
      characterHPElement.html(character.healthPoints);
      characterHPElement.appendTo(characterElement);

      $("#choose-character").append(characterElement);

      // character div on click event handler
      characterElement.on("click", function() {
        // get character from div id
        var characterSelected = game.getCharacterWithId(this.attributes.id.value);
        var targetDiv = "#" + characterSelected.id.toLowerCase();
        var targetImg = targetDiv + " > img";

        if (game.chosenCharacter === undefined) {
          game.chosenCharacter = characterSelected;
          $(targetDiv).toggleClass("locked");
          $(targetDiv).toggleClass("grayed-out");
          $(targetImg).toggleClass("green");
          $("#choose-character-label").html("Choose your enemy");

          $.each(game.characters, function(i, character) {
            if (character.id != game.chosenCharacter.id) {
              targetImg = "#" + character.id.toLowerCase() + " > img";
              $(targetImg).toggleClass("green");
              $(targetImg).toggleClass("red");
            }
          });
        } else if (game.chosenEnemy === undefined) {
          // choose enemy
          game.chosenEnemy = characterSelected;
          $(targetDiv).toggleClass("locked");
          $(targetDiv).toggleClass("grayed-out");
          $(targetImg).toggleClass("red");
          $("#choose-character-label").html("May the force be with you");

          $.each(game.characters, function(i, character) {
            if (character.id != game.chosenCharacter.id &&
                character.id != game.chosenEnemy.id) {
              targetDiv = "#" + character.id.toLowerCase();
              targetImg = targetDiv + " > img";
              $(targetDiv).toggleClass("locked");
              $(targetDiv).toggleClass("grayed-out");
              $(targetImg).toggleClass("red");
            }
          });
        }

        game.populateVersusArea();
      });
    });
  },

  populateVersusArea: function() {
    
  },

  getCharacterWithId: function(characterId) {
    var characterWithId = undefined;
    $.each(game.characters, function(i, character) {
      if (character.id.toLowerCase() === characterId) {
        characterWithId = character;
        return false;
      }
    });
    return characterWithId;
  }
}

game.initGame();
game.populateChooseCharacterArea();
