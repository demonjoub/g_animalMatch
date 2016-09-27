var ProgressBar = cc.Sprite.extend({
	
	prog:null,

	less:0,
	count:0,
	timer:0,

	px:0,
	full:0,

	endTime:60,

	s0:null, 
	s1:null, 

	ctor:function() {
		
		cc.spriteFrameCache.addSpriteFrames(res.number_plist);

		this._super(res.progress_bar_bg);

		this.prog = new cc.Sprite(res.progress_bar_blue);
		this.prog.setAnchorPoint(0,0);
		this.px = this.width/2 - this.prog.width/2;
		this.full = this.prog.width;
		this.prog.x = this.px;
		this.prog.y = this.height/2 - this.prog.height/2;
		this.addChild(this.prog);

		var num1 = "b6_3.png"
		var num2 = "b0_3.png"
		this.s0 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(num1));
		this.s0.x = this.width/2 - this.s0.width/2 + 2;
		this.s1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(num2));
		this.s1.x = this.width/2 + this.s1.width/2 - 2;
		this.s1.y = this.height/2 + 3;
		this.s0.y = this.s1.y;
		this.addChild(this.s0);
		this.addChild(this.s1);
		this.init();
	}, 

	startCount:function() {
		this.schedule(this.updateTimer , 1);
	},

	init:function() {

		// this.schedule(this.updateTimer , 1);
	},

	setProgress:function(del) {
		this.prog.setTextureRect(cc.rect(0, 0, (this.full - del), this.prog.height));
		this.prog.x = this.px; 
		this.prog.y = this.height/2 - this.prog.height/2;
	},

	updateTimer:function(dt) {
		this.timer += 1;

 		
 		var percent = (this.timer / this.endTime * 100) | 0;
		// console.log(percent, "time:" + this.timer);
		this.less = (percent/100) *  this.full;
		
		this.setProgress(this.less);
		if(this.timer >= this.endTime) {
			this.unschedule(this.updateTimer);
			var _scene = this.parent;
			_scene.timeUp();
		}
		this.setNumberOfTime(this.timer);
	},

	setNumberOfTime:function(tt) {
		var _time = this.endTime - tt;
		var strtime = _time + "";
		if(_time < 10) {
			strtime = "0" + _time;
		}

		var num1 = strtime.substr(0, 1);
		var num2 = strtime.substr(1, 1);
		var sss0 = cc.spriteFrameCache.getSpriteFrame("b" + num1 + "_3.png");
		var sss1 = cc.spriteFrameCache.getSpriteFrame("b" + num2 + "_3.png");
		var spr1 = new cc.Sprite(sss0);
		var spr1 = new cc.Sprite(sss1);
		this.s0.texture = sss0.texture;
		this.s0.initWithSpriteFrame(sss0);
		this.s1.texture = sss1.texture;		
		this.s1.initWithSpriteFrame(sss1);
	}






});