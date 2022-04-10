class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        // Images
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("spaceship", "assets/spaceship.png");
        this.load.image("starfield", "assets/starfield.png");

        // Explosion Animation
        this.load.spritesheet("explosion", "assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
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
            new Ship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0),
            new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0),
            new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        );

        // UI Borders
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0,0);

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xffffff).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, game.config.height, 0xffffff).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, game.config.width, game.config.height, 0xffffff).setOrigin(0,0);

        // Animation Setup
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })
    }

    update() {
        // Movement
        this.background.tilePositionX -= 3;
        this.p1Rocket.update();
        for(let ship of this.ships){ship.update()};

        // Collision Handling
        for(let ship of this.ships) {
            for(let rocket of [this.p1Rocket]) {
                if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship. y) {
                    this.detonate(rocket, ship);
                }
            }
        }
    }

    // Carries out the actions that go along with a rocket-ship collision
    detonate(rocket, ship) {
        // Reset Rocket
        rocket.resetPos();
        
        // Hide Ship
        ship.alpha = 0;
        // Play explosion animation
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0,0);
        boom.anims.play('explode');
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
    }
}