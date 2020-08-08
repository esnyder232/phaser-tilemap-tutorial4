const {Engine, Render, World, Bodies, Body} = Phaser.Physics.Matter.Matter;

export default class MainScene extends Phaser.Scene {
	constructor(config) {
		super(config);

		//this.engine = Phaser.Physics.Matter.Matter.Engine;
		console.log(Engine);
	}

	init() {
		console.log('init on ' + this.scene.key + ' start');

	}

	preload() {
		console.log('preload on ' + this.scene.key + ' start');

		this.load.tilemapTiledJSON("map", "assets/tilemaps/simple-map.json");
		this.load.image("kenney-tileset-64px-extruded", "assets/tilesets/kenney-tileset-64px-extruded.png");

		// An atlas is a way to pack multiple images together into one texture. For more info see:
		//  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
		this.load.atlas("emoji", "assets/atlases/emoji.png", "assets/atlases/emoji.json");

	}
	  
	create() {
		console.log('create on ' + this.scene.key + ' start');

		//create the 2-layer map
		var map = this.make.tilemap({key: "map"});
		var tileset = map.addTilesetImage("kenney-tileset-64px-extruded");
		var groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
		var lavaLayer = map.createStaticLayer("Lava", tileset, 0, 0);


		// Set colliding tiles before converting the layer to Matter bodies - same as we've done before
		// with AP. See post #1 for more on setCollisionByProperty.
		groundLayer.setCollisionByProperty({collides: true});
		lavaLayer.setCollisionByProperty({collides: true});
		

		// Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We
		// haven't mapped out custom collision shapes in Tiled so each colliding tile will get a default
		// rectangle body (similar to AP).
		this.matter.world.convertTilemapLayer(groundLayer);
		this.matter.world.convertTilemapLayer(lavaLayer);



		// Drop a couple matter-enabled emoji images into the world. (Note, the frame names come from
		// twemoji - they are the unicode values of the emoji.)

		// Create a physics-enabled image
		var image1 = this.matter.add.image(275, 100, "emoji", "1f92c");
		
		// Change it's body to a circle and configure its body parameters
		image1.setCircle(image1.width / 2, {restitution: 1, friction: 0.25});
		image1.setScale(0.5);

		var image2 = this.matter.add.image(300, 75, "emoji", "1f60d");
		image2.setCircle(image2.width / 2, {restitution: 0.25});
		image2.setScale(0.5);

		// We can also pass in our Matter body options directly into to this.matter.add.image, along with
		// a Phaser "shape" property for controlling the type & size of the body
		var image3 = this.matter.add.image(325, 100, "emoji", "1f4a9", {restitution: 1, friction: 0, shape: "circle"});
		image3.setScale(0.5);



		//clicking
		var frameNames = Object.keys(this.cache.json.get("emoji").frames);
		
		this.input.on("pointerdown", (a, b, c) => {
			var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
			for(var i = 0; i < 5; i++)
			{
				var x = worldPoint.x + Phaser.Math.RND.integerInRange(-10, 10);
				var y = worldPoint.y + Phaser.Math.RND.integerInRange(-10, 10);
				var frame = Phaser.Utils.Array.GetRandom(frameNames);

				var temp = this.matter.add.image(x, y, "emoji", frame, {restitution: 0.5, friction: 0, shape: "circle"});
				temp.setScale(0.5);
			}
		})
		
		//custom cursor
		this.input.setDefaultCursor("url(assets/cursors/pointer.cur), pointer");


		//camera controls
		var cursors = this.input.keyboard.createCursorKeys();
		var camControlsConfig = {
			camera: this.cameras.main,
			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			speed:0.5,
		}
		this.controls = new Phaser.Cameras.Controls.FixedKeyControl(camControlsConfig)
	}
	  
	update(timeElapsed, dt) {
		this.controls.update(dt);
	}
}

