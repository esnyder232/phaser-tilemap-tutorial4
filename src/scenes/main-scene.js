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

	}
	  
	create() {
		console.log('create on ' + this.scene.key + ' start');

	}
	  
	update(timeElapsed, dt) {
	
	}
}

