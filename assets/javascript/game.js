class GameCharacter {
  constructor(name, id, healthPoints, attackPoints, counterAttackPoints, image) {
    this.name = name;
    this.id = id;
    this.healthPoints = healthPoints;
    this.attackPoints = attackPoints;
    this.counterAttackPoints = counterAttackPoints;
    this.image = image;
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
  attack: 0,

  initGame: function() {
    this.lukeSkywalker = new GameCharacter("Luke Skywalker", "luke", 140, 6, 5, "./assets/images/luke.jpg");
    this.obiWanKenobi = new GameCharacter("Obi-Wan Kenobi", "obi-wan", 120, 12, 8, "./assets/images/obi-wan.jpg");
    this.darthVader = new GameCharacter("Darth Vader", "vader", 150, 18, 12, "./assets/images/darth-vader.jpg");
    this.darthSidious = new GameCharacter("Darth Sidious", "sidious", 180, 22, 25, "./assets/images/darth-sidious.jpg");
    this.characters.push(this.lukeSkywalker);
    this.characters.push(this.obiWanKenobi);
    this.characters.push(this.darthVader);
    this.characters.push(this.darthSidious);
  },

  populateChooseCharacterArea: function() {
    // Iterate through characters and create divs to display
    $.each(this.characters, function(i, character) {
      var characterElement = $("<div id=" + character.id + ">");
      var imgElement = $("<img>");
      var captionElement = $('<div class="caption">');
      var characterNameElement = $("<div>");
      var characterHPElement = $('<div>');

      characterElement.addClass("col-xs-12 col-sm-3 thumbnail");

      imgElement.attr('src', character.image);
      imgElement.addClass("green");
      imgElement.appendTo(characterElement);

      characterNameElement.html('<span class="title">Name:</span> ' + character.name);
      characterNameElement.appendTo(captionElement);
      characterHPElement.html('<span class="title">HP:</span> ' + character.healthPoints);
      characterHPElement.appendTo(captionElement);
      captionElement.appendTo(characterElement);

      $("#choose-character").append(characterElement);

      // character div on click event handler
      characterElement.on("click", function() {
        // get character from div id
        var characterSelected = game.getCharacterWithId(this.attributes.id.value);
        var targetDiv = "#" + characterSelected.id;
        var targetImg = targetDiv + " > img";

        if (game.chosenCharacter === undefined) {
          game.chosenCharacter = characterSelected;
          $(targetDiv).toggleClass("locked");
          $(targetDiv).toggleClass("grayed-out");
          $(targetImg).toggleClass("green");
          $("#choose-character-label").html("Choose your enemy");

          $.each(game.characters, function(i, character) {
            if (character.id != game.chosenCharacter.id) {
              targetImg = "#" + character.id + " > img";
              $(targetImg).toggleClass("green");
              $(targetImg).toggleClass("red");
            }
          });

          game.displayCharacter();
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
              targetDiv = "#" + character.id;
              targetImg = targetDiv + " > img";
              $(targetDiv).toggleClass("locked");
              $(targetDiv).toggleClass("grayed-out");
              $(targetImg).toggleClass("red");
            }
          });

          game.displayEnemy();
        }
      });
    });
  },

  displayCharacter: function() {
    var chosenCharacterElement = $("#chosen-character");
    var imgElement = $("<img>");
    var captionElement = $('<div class="caption">');
    var characterNameElement = $("<div>");
    var characterHPElement = $("<div>");

    imgElement.attr('src', this.chosenCharacter.image);
    imgElement.addClass("green");
    imgElement.appendTo(chosenCharacterElement);

    characterNameElement.html('<span class="title">Name:</span> ' + this.chosenCharacter.name);
    characterNameElement.appendTo(captionElement);
    characterHPElement.html('<span class="title">HP:</span> <span id="character-hp">' + this.chosenCharacter.healthPoints + "</span>");
    characterHPElement.appendTo(captionElement);
    captionElement.appendTo(chosenCharacterElement);

    chosenCharacterElement.toggleClass("hidden");
  },

  displayEnemy: function() {
    var enemyCharacterElement = $("#enemy-character");
    var imgElement = $("<img>");
    var captionElement = $('<div class="caption">');
    var characterNameElement = $("<div>");
    var characterHPElement = $("<div>");

    imgElement.attr('src', this.chosenEnemy.image);
    imgElement.addClass("red");
    imgElement.appendTo(enemyCharacterElement);

    characterNameElement.html('<span class="title">Name:</span> ' + this.chosenEnemy.name);
    characterNameElement.appendTo(captionElement);
    characterHPElement.html('<span class="title">HP:</span> <span id="enemy-hp">' + this.chosenEnemy.healthPoints + "</span>");
    characterHPElement.appendTo(captionElement);
    captionElement.appendTo(enemyCharacterElement);

    enemyCharacterElement.toggleClass("hidden");
    $("#versus").toggleClass("hidden");
    $("#attack-button").toggleClass("locked");

    $("#attack-button").on("click", function() {
      console.log("here");
      game.attack += game.chosenCharacter.attackPoints;
      game.chosenCharacter.healthPoints -= game.chosenEnemy.counterAttackPoints;
      game.chosenEnemy.healthPoints -= game.attack;
      $("#character-hp").html(game.chosenCharacter.healthPoints);
      $("#enemy-hp").html(game.chosenEnemy.healthPoints);
    });
  },

  getCharacterWithId: function(characterId) {
    var characterWithId = undefined;
    $.each(game.characters, function(i, character) {
      if (character.id === characterId) {
        characterWithId = character;
        return false;
      }
    });
    return characterWithId;
  }
}

game.initGame();
game.populateChooseCharacterArea();
