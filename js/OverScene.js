var OverScene = cc.Scene.extend({

	final_score:0,
	allscore:0,

	ctor:function(allscore) {
		this.allscore = allscore;
		this._super();
		this.init();
	},

	init:function() {

		var spr_retry0 = new cc.Sprite(res.butstart);
		spr_retry0.setTextureRect(cc.rect(0, 0, spr_retry0.width/2, spr_retry0.height));	
		var spr_retry1 = new cc.Sprite(res.butstart);
		spr_retry1.setTextureRect(cc.rect(spr_retry1.width/2, 0, spr_retry1.width/2, spr_retry1.height));
		var butretry = new cc.MenuItemSprite(
			spr_retry0 ,
			spr_retry1,
			null,
			this.startGame,
			this
		);
		var butretry_menu = new cc.Menu(butretry);
        butretry_menu.x = GAME_DESIGN_SCREEN_WIDTH/2;// - btn_bg2.width/2;
        butretry_menu.y = GAME_DESIGN_SCREEN_HEIGHT/2 + butretry.height/2 + 5;
        this.addChild(butretry_menu); 

        var spr_title0 = new cc.Sprite(res.butretry);
        spr_title0.setTextureRect(cc.rect(0, 0, spr_title0.width/2, spr_title0.height));
        var spr_title1 = new cc.Sprite(res.butretry);
		spr_title1.setTextureRect(cc.rect(spr_title1.width/2, 0, spr_title1.width/2, spr_title1.height));
		var buttop = new cc.MenuItemSprite(
			spr_title0 ,
			spr_title1,
			null,
			this.topGame,
			this
		);
		var buttop_menu = new cc.Menu(buttop);
        buttop_menu.x = GAME_DESIGN_SCREEN_WIDTH/2;// - btn_bg2.width/2;
        buttop_menu.y = GAME_DESIGN_SCREEN_HEIGHT/2 - buttop.height/2 - 5;
        this.addChild(buttop_menu); 	

        // score 
        var sc = new NumberSprite(this.allscore, 1);
        this.addChild(sc);
        sc.x = GAME_DESIGN_SCREEN_WIDTH/2 - sc._getWidth()/2;
        sc.y = GAME_DESIGN_SCREEN_HEIGHT/2 + 100;


	},

	topGame:function(pSender) {
		var blackColor = new cc.Color(0,0,0);        
        cc.director.runScene(new cc.TransitionFade(0.2, new MainScene(), blackColor));
	},

	startGame:function(pSender) {
		var blackColor = new cc.Color(0,0,0);        
        cc.director.runScene(new cc.TransitionFade(0.2, new GameScene(), blackColor));
	},
});