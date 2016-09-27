var NumberSprite = cc.Sprite.extend({
	size: 1, // 1-> big, 2-> medium , 3-> smail 
	_width:0,
	_height:0,
	_spr:null,
	_space:-1,
	num:0,
	sprArr:null,

	ctor:function( num, size ) {
		cc.spriteFrameCache.addSpriteFrames(res.number_plist);
		this.size = size;
		this.num = num;
		this._super();
		this.init();
	},

	init:function() {
		var len = (this.num.toString()).length;
		this.sprArr = new Array();
		for(var i = 0 ; i < len; i++) {
			var nn = (this.num.toString()).substring(i, i+1);
			var nspr = cc.spriteFrameCache.getSpriteFrame("b" + nn + "_" + this.size + ".png");
			var spr = new cc.Sprite(nspr);
			spr.setAnchorPoint(0,0);
			spr.x = this._width;
			this._width += spr.width + this._space;
			this._height = spr.height;
			this.sprArr.push(spr);
			this.addChild(spr);
		}
	},

	setScore:function(score) {
		// remove 
		for(var i = 0 ; i < this.sprArr.length; i++) {
			this.removeChild(this.sprArr[i]);
		}
		this._width = 0;
		this._height = 0;
		// new score
		this.num = score;
		this.init();
	},

	_getHeight:function() {
		return this.height;
	},

	_getWidth:function() {
		return this._width;
	},


});