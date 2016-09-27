var ComboSprite = cc.Sprite.extend({

	comboTxt:null, 
	numOfCombo0:null,
	numOfCombo1:null,
	num:0,

	ctor:function(num) {
		
		cc.spriteFrameCache.addSpriteFrames(res.number_plist);
		
		

		// this._super(res.combo_png);
		this._super();
		this.setTextureRect(cc.rect(0, 0, 340, 70));
		this.setOpacity(0);
		this.comboTxt = new cc.Sprite(res.combo_png);
		this.comboTxt.x = this.width - this.comboTxt.width/2;
		this.comboTxt.y = this.height/2;
		this.addChild(this.comboTxt);

		if(num < 10) {
			this.numOfCombo0 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(this.getNumberURI(num)));	
			
			this.addChild(this.numOfCombo0);
			this.comboTxt.x  = this.width/2 + this.numOfCombo0.width;

			this.numOfCombo0.x = this.width/2 - 90;
			this.numOfCombo0.y = this.height/2;// + (this.numOfCombo0.height-20);
		}
		else {
			var strNum = num + "";
			var num0 = strNum.substring(0, 1);
			var num1 = strNum.substring(1, 2);

			this.numOfCombo0 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(this.getNumberURI(num0)));	
			this.numOfCombo0.x = this.numOfCombo0.width/2;
			this.numOfCombo0.y = this.height/2;// + (this.numOfCombo0.height-20);
			this.addChild(this.numOfCombo0);

			this.numOfCombo1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(this.getNumberURI(num1)));
			this.numOfCombo1.x = this.numOfCombo0.x + this.numOfCombo1.width - 10;
			this.numOfCombo1.y = this.height/2;
			this.addChild(this.numOfCombo1);
		}
		this.num = num;
		this.setAnimation();

	}, 

	setAnimation:function() {
		
		var that = this;
		var actionDone =  cc.CallFunc.create(function(pSender){
			var game = pSender.parent;
			game.removeChild(that);
		}, this);

		this.runAction(
            new cc.Sequence(
            	new cc.MoveBy(0.3,0,108), 
            	actionDone
            )
        );
	},

	getNumberURI:function(num) {
		var str = "b" + num + "_1.png";
		return str;
	}
});