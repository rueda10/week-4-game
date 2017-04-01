class GameCharacter {
  constructor(name, id, healthPoints, baseAttackPoints, counterAttackPoints, image) {
    this.name = name;
    this.id = id;
    this.healthPoints = healthPoints;
    this.baseAttackPoints = baseAttackPoints;
    this.attackPoints = 0;
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

  initGame: function() {;
    this.resetDOM();
    this.lukeSkywalker = new GameCharacter("Luke Skywalker", "luke", 120, 6, 5, "./assets/images/luke.jpg");
    this.obiWanKenobi = new GameCharacter("Obi-Wan Kenobi", "obi-wan", 140, 12, 8, "./assets/images/obi-wan.jpg");
    this.darthVader = new GameCharacter("Darth Vader", "vader", 150, 18, 12, "./assets/images/darth-vader.jpg");
    this.darthSidious = new GameCharacter("Darth Sidious", "sidious", 180, 22, 25, "./assets/images/darth-sidious.jpg");
    this.characters = [];
    this.chosenCharacter = undefined;
    this.chosenEnemy = undefined;
    this.characters.push(this.lukeSkywalker);
    this.characters.push(this.obiWanKenobi);
    this.characters.push(this.darthVader);
    this.characters.push(this.darthSidious)
  },

  populateChooseCharacterArea: function() {
    $("#choose-character").html('<div class="col-xs-12 col-sm-2"></div>');
    // Iterate through characters and create divs to display
    $.each(this.characters, function(i, character) {
      var characterElement = $("<div id=" + character.id + ">");
      var imgElement = $("<img>");
      var captionElement = $('<div class="caption">');
      var characterNameElement = $("<div>");
      var characterHPElement = $('<div>');

      characterElement.addClass("col-xs-12 col-sm-2 thumbnail");

      imgElement.attr('src', character.image);

      // color borders and gray out depending on status
      if (game.chosenCharacter === undefined) {
        imgElement.addClass("green");
        $("#choose-character-label").html("Choose your character");
      } else if (game.chosenCharacter != undefined &&
                 game.chosenEnemy === undefined) {
        $("#choose-character-label").html("Choose your enemy");
        if (character.id === game.chosenCharacter.id ||
            !character.isAlive()) {
          imgElement.toggleClass("locked grayed-out");
        } else {
          imgElement.addClass("red");
        }
      } else {
        $("#choose-character-label").html("May the force be with you");
        if (character.id === game.chosenCharacter.id ||
            character.id === game.chosenEnemy.id ||
            !character.isAlive()) {
          imgElement.toggleClass("locked grayed-out");
        } else {
          imgElement.addClass("red");
        }
      }

      imgElement.appendTo(characterElement);

      characterNameElement.html('<span class="name">' + character.name + '</span>');
      characterNameElement.appendTo(captionElement);
      characterHPElement.html('<span class="title">HP:</span> ' + character.healthPoints);
      characterHPElement.appendTo(captionElement);
      captionElement.appendTo(characterElement);

      $("#choose-character").append(characterElement);

      // choose character div on click event handler
      characterElement.on("click", function() {
        // get character from div id
        var characterSelected = game.getCharacterWithId(this.attributes.id.value);
        var targetDiv = "#" + characterSelected.id;
        var targetImg = targetDiv + " > img";

        if (game.chosenCharacter === undefined) {
          game.chosenCharacter = characterSelected;
          $(targetDiv).toggleClass("locked grayed-out");
          $(targetImg).toggleClass("green");

          game.populateChooseCharacterArea();

          game.displayCharacter();
        } else if (game.chosenEnemy === undefined) {
          // choose enemy
          game.chosenEnemy = characterSelected;
          $(targetDiv).toggleClass("locked grayed-out");
          $(targetImg).toggleClass("red");

          game.populateChooseCharacterArea();

          game.displayEnemy();
        }
      });
    });
    var extraElement = $("<div>");
    extraElement.addClass("col-xs-12 col-sm-2 thumbnail");
    $("choose-character").append(extraElement);
  },

  displayCharacter: function() {
    $("#chosen-character").html("");

    var chosenCharacterElement = $("#chosen-character");
    var imgElement = $("<img>");
    var captionElement = $('<div class="caption">');
    var characterNameElement = $("<div>");
    var characterHPElement = $("<div>");

    imgElement.attr('src', this.chosenCharacter.image);
    imgElement.addClass("green");
    imgElement.appendTo(chosenCharacterElement);

    characterNameElement.html('<span class="name">' + this.chosenCharacter.name + '</span>');
    characterNameElement.appendTo(captionElement);
    characterHPElement.html('<span class="title">HP:</span> <span id="character-hp">' + this.chosenCharacter.healthPoints + "</span>");
    characterHPElement.appendTo(captionElement);
    captionElement.appendTo(chosenCharacterElement);

    if (chosenCharacterElement.hasClass("hidden")) {
      chosenCharacterElement.toggleClass("hidden");
    }
  },

  displayEnemy: function() {
    $("#enemy-character").html("");

    var enemyCharacterElement = $("#enemy-character");
    var imgElement = $("<img>");
    var captionElement = $('<div class="caption">');
    var characterNameElement = $("<div>");
    var characterHPElement = $("<div>");

    imgElement.attr('src', this.chosenEnemy.image);
    imgElement.addClass("red");
    imgElement.appendTo(enemyCharacterElement);

    characterNameElement.html('<span class="name">' + this.chosenEnemy.name + '</span>');
    characterNameElement.appendTo(captionElement);
    characterHPElement.html('<span class="title">HP:</span> <span id="enemy-hp">' + this.chosenEnemy.healthPoints + "</span>");
    characterHPElement.appendTo(captionElement);
    captionElement.appendTo(enemyCharacterElement);

    if (enemyCharacterElement.hasClass("hidden")) {
      enemyCharacterElement.toggleClass("hidden");
    }
    if ($("#versus").hasClass("hidden")) {
      $("#versus").toggleClass("hidden");
    }
    if ($("#attack-button").hasClass("locked")) {
      $("#attack-button").toggleClass("locked");
    }
    if ($("#enemy-character").hasClass("grayed-out")) {
      $("#enemy-character").toggleClass("grayed-out");
    }
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
  },

  resetDOM: function() {
    $("#choose-character-label").attr("class","").html("Choose your character");
    $("#chosen-character").attr("class", "col-xs-12 col-sm-5ths thumbnail hidden locked");
    $("#versus").attr("class", "col-xs-12 col-sm-5ths hidden");
    $("#restart-button").attr("class", "btn btn-default");
    $("#attack-button").attr("class", "btn btn-success");
    $("#enemy-character").attr("class", "col-xs-12 col-sm-5ths thumbnail hidden locked");
    $("#attack-gameplay-messages").html("");
    $("#counter-attack-gameplay-messages").html("");
  },

  areEnemiesDefeated: function() {
    var areEnemiesDefeated = true;

    $.each(game.characters, function(i, character) {
      if (character.id != game.chosenCharacter.id &&
          character.isAlive()) {
        areEnemiesDefeated = false;
        return false;
      }
    });

    return areEnemiesDefeated;
  }
}

game.initGame();
game.populateChooseCharacterArea();

$("#attack-button").on("click", function() {
  game.chosenCharacter.attackPoints += game.chosenCharacter.baseAttackPoints;
  game.chosenCharacter.healthPoints -= game.chosenEnemy.counterAttackPoints;
  game.chosenEnemy.healthPoints -= game.chosenCharacter.attackPoints;

  $("#character-hp").html(game.chosenCharacter.healthPoints);
  $("#enemy-hp").html(game.chosenEnemy.healthPoints);

  if (!game.chosenCharacter.isAlive()) {
    $("#chosen-character > img").toggleClass("grayed-out");
    $("#attack-button").toggleClass("locked");
    $("#attack-gameplay-messages").html(game.chosenEnemy.name + " defeated you.");
    $("#counter-attack-gameplay-messages").html("Please restart the game.");
  } else if (!game.chosenEnemy.isAlive()) {
    $("#enemy-character > img").toggleClass("grayed-out");
    $("#attack-button").toggleClass("locked");
    $("#attack-gameplay-messages").html("You defeated " + game.chosenEnemy.name);
    if (game.areEnemiesDefeated()) {
      $("#counter-attack-gameplay-messages").html("YOU WIN! YOU ARE A JEDI MASTER");
    } else {
      $("#counter-attack-gameplay-messages").html("Choose your next enemy.");
    }
    game.chosenEnemy = undefined;
  } else {
    $("#attack-gameplay-messages").html("You attacked " + game.chosenEnemy.name + " for " + game.chosenCharacter.attackPoints + " damage.");
    $("#counter-attack-gameplay-messages").html(game.chosenEnemy.name + " attacked you for " + game.chosenEnemy.counterAttackPoints + " damage.");
  }
  game.populateChooseCharacterArea();
});

$("#restart-button").on("click", function() {
  game.initGame();
  game.populateChooseCharacterArea();
});
