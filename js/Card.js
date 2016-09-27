var Card = cc.Sprite.extend({
	
	flip:false, 
	pt:null,
	type:null,
	ppname:"type",
	sub_type:0,
	clicked:false,

	ctor:function() {

		cc.spriteFrameCache.addSpriteFrames(res.panel_plist);
		this._super(cc.spriteFrameCache.getSpriteFrame("panel_type_close.png"));
	},

	setCardType:function(ty, pname) {
		this.type = ty;
		this.ppname = pname;
	},

	setBonus:function() {

	},

	changeCardType:function(pSender) {

		var kkk = cc.spriteFrameCache.getSpriteFrame("panel_" + this.ppname + "_0" + this.type + ".png");
		// console.log("panel_" + this.ppname + "_0" + this.type + ".png")
		var spr = new cc.Sprite(kkk);
		this.texture = spr.texture;
		this.initWithSpriteFrame(kkk);

		this.flip = true;
	},
	
	// open 
	onOpenFlipCard:function(sec) {
		
		/**/

		if(this.flip == true) return;
		var that = this;
		
		var actionDone =  cc.CallFunc.create(this.changeCardType, this);

		var actionDone2 = cc.CallFunc.create(function(){
			that.onCloseFlipCard();
		},this);
		if(sec != null) {
			this.runAction(
	            new cc.Sequence(
	        		new cc.ScaleTo(0.05,0,1),
	        		actionDone, 
	        		new cc.ScaleTo(0.05,1,1),
	        		new cc.DelayTime(sec),
	        		actionDone2
	            )
	        );
		}
		else {
			this.runAction(
	            new cc.Sequence(
	        		new cc.ScaleTo(0.05,0,1),
	        		actionDone, 
	        		new cc.ScaleTo(0.05,1,1)
	            )
	        );
		}
	},

	// close
	onCloseFlipCard:function() {
		if(this.flip == false ) return;
		if(this.clicked == true) return;
		var that = this;
		var actionDone = cc.CallFunc.create(function(pSender){
			var kkk = cc.spriteFrameCache.getSpriteFrame("panel_type_close.png");
			var spr = new cc.Sprite(kkk);
			that.texture = spr.texture;
			that.initWithSpriteFrame(kkk);
			that.flip = false;
		});

		this.runAction(
            new cc.Sequence(
        		new cc.ScaleTo(0.05,0,1),
        		actionDone, 
        		new cc.ScaleTo(0.05,1,1)
            )
        );
	}
});

