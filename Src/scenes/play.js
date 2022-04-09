class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image("starfield", "assets/starfield.png");
    }

    create() {

        // Input Keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield").setOrigin(0,0);

        // Rockets
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, "rocket").setOrigin(0.5, 0);

        // Ships
        this.ships = new Array(
            new Ship(this, 100, 120, 'spaceship', 0, 1).setOrigin(0,0),
            new Ship(this, 200, 200, 'spaceship', 0, 1).setOrigin(0,0),
            new Ship(this, 300, 240, 'spaceship', 0, 1).setOrigin(0,0)
        );

        // UI Borders
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0,0);

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xffffff).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, game.config.height, 0xffffff).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, game.config.width, game.config.height, 0xffffff).setOrigin(0,0);
    }

    update() {
        this.background.tilePositionX -= 3;
        this.p1Rocket.update();
        for(let ship of this.ships){ship.update()};
    }
}