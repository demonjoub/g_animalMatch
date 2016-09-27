var MainScene = cc.Scene.extend({
	ctor:function() {
		this._super();
		this.init();
	}, 


	init:function() {
		console.log("dd");
		// draw bg 
		var bg_title = new cc.Sprite(res.bg_title);
		bg_title.x = GAME_DESIGN_SCREEN_WIDTH/2;
		bg_title.y = GAME_DESIGN_SCREEN_HEIGHT/2;
		this.addChild(bg_title);
		// draw btn start game
		var btn_bg = new cc.Sprite();
		btn_bg.opacity = 0;
		btn_bg.setTextureRect(cc.rect(0,0,392+(392*0.1),90+(90*0.1)));
		var btn_start = new cc.Sprite(res.btn_start);	
		btn_start.x = btn_bg.width/2;
		btn_start.y = btn_bg.height/2;
		btn_start.setScale(1.1);
		btn_bg.addChild(btn_start);
		
		var btn_bg2 = new cc.Sprite();
		btn_bg2.opacity = 0;
		btn_bg2.setTextureRect(cc.rect(0,0,392+(392*0.1),90+(90*0.1)));
		var btn_start2 = new cc.Sprite(res.btn_start);	
		btn_start2.x = btn_bg2.width/2;
		btn_start2.y = btn_bg2.height/2;
		btn_bg2.addChild(btn_start2);

		var btnStart = new cc.MenuItemSprite(
			btn_bg ,
			btn_bg2,
			null,
			this.startGame,
			this
		);

		var btn_menu = new cc.Menu(btnStart);
        btn_menu.x = GAME_DESIGN_SCREEN_WIDTH/2;// - btn_bg2.width/2;
        btn_menu.y = GAME_DESIGN_SCREEN_HEIGHT/2;
        this.addChild(btn_menu); 
	}, 

	startGame:function(pSender) {
		var blackColor = new cc.Color(0,0,0);        
        cc.director.runScene(new cc.TransitionFade(0.2, new GameScene(), blackColor));
	}
});