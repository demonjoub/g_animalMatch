var ProgressFlower = cc.Sprite.extend({

	prog:null,
	full:0,
	count:10,
	less:0,

	etime:5,

	ctor:function() {
		this._super(res.flower_png);
		this.prog = new cc.Sprite(res.flower2_png);
		this.prog.setAnchorPoint(0,0);
		
		this.addChild(this.prog);
		
		this.full = this.height;
		

		this.init();
	},

	init:function() {
		this.setProgress();
		
		// this.schedule(this.GameControll,1);
	},

	addProgress:function() {
		this.less += (this.full/this.count);
		if(this.less >= this.full) {
			this.less = this.full;

			this.onProgressFull();
		}
		this.setProgress();
	}, 

	lessProgress:function() {
		this.less -= (this.full/this.count);
		if(this.less <= 0) {
			this.less = 0;
		}
		this.setProgress();
	},

	setProgress:function() {

		// this.less += (this.full/this.count);

		this.prog.setTextureRect(cc.rect(0, 0,this.width, this.height - this.less));
		this.prog.x = this.width/2 - this.prog.width/2;
		this.prog.y = this.height/2 - (this.prog.height-this.less)/2;
	},

	onProgressFull:function() {
		var game = this.parent;
		game.setSpacialEvent();
	},

	startEvent:function() {
		this.schedule(this.GameEventLess);
	},

	GameEventLess:function(dt) {
		this.etime += (dt)*-1;
		console.log(this.etime);
		// this.lessProgress();
	},

	GameControll:function() {
		this.addProgress();
	}
});