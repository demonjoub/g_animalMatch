var GameScene = cc.Scene.extend({ 
	
	onStart:false,
	cardArr:null,

	chkPointTAG: 11,
	flowerTAG:12,
	progressBarTAG:13,
	scoreTAG:14,

	mathing:[],
	mmm:[],
	chkcard:null,
	map:[2, 2, 4, 4, 6, 6],
	cardTypr:[0,1,2,3,4,5,6,7,8,9],
	mt:0,
	chkType:null,
	chkCnt:0,
	c_flag:false,
	hasTouch:false,

	allscore:0,

	ctor:function() {
		this._super();
	}, 

	onEnter:function() {
		this._super();
		var that = this;
		var bg = new cc.Sprite();
		bg.setTextureRect(cc.rect(0,0,GAME_DESIGN_SCREEN_WIDTH, GAME_DESIGN_SCREEN_HEIGHT));
		bg.setColor(new cc.Color(0,0,0));
		bg.x = GAME_DESIGN_SCREEN_WIDTH/2;
		bg.y = GAME_DESIGN_SCREEN_HEIGHT/2;
		this.addChild(bg);

		var space = 20;
		this.cardArr = new Array();
		var _cnt = 0;
		for(var i = 0 ; i < 3 ; i++) {
			for(var j = 0 ; j < 4 ; j++) {
				var card = new Card();
				card.x = (GAME_DESIGN_SCREEN_WIDTH/2-(card.width+space)) + ((card.width+space) * i);
				card.y = 100 + ((card.height+space) * j);
				card.pt = _cnt;
				this.addChild(card);
				this.cardArr.push(card);
				_cnt++;
			}
		}

		// set ui
		/*var flower = new ProgressFlower();
		this.addChild(flower);
		flower.setTag(this.flowerTAG);
		flower.x = 60;
		flower.y = GAME_DESIGN_SCREEN_HEIGHT - 10;*/

		var score = new NumberSprite(this.allscore,3);
		score.x = 50;
		score.y = GAME_DESIGN_SCREEN_HEIGHT - 40;
		score.setTag(this.scoreTAG);
		this.addChild(score);

		var bar = new ProgressBar();
		bar.setScale((GAME_DESIGN_SCREEN_WIDTH-20)/bar.width,1);
		bar.x = GAME_DESIGN_SCREEN_WIDTH/2;
		bar.y = GAME_DESIGN_SCREEN_HEIGHT - 85;
		bar.setTag(this.progressBarTAG);
		this.addChild(bar);


		var spr = new cc.Sprite();
       	spr.setTextureRect(cc.rect(0, 0, 5, 5));
       	spr.setTag(this.chkPointTAG);
       	that.addChild(spr);

		var touchPoint = new cc.Sprite();
		touchPoint.setTextureRect(cc.rect(0,0,GAME_DESIGN_SCREEN_WIDTH,GAME_DESIGN_SCREEN_HEIGHT));
		touchPoint.x = GAME_DESIGN_SCREEN_WIDTH/2;
		touchPoint.y = GAME_DESIGN_SCREEN_HEIGHT/2;
		touchPoint.setOpacity(0);
		this.addChild(touchPoint);

		var listener = new cc.EventListener.create({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch, event) {
	           	if(that.onStart == false) return;
	           	if(that.hasTouch == false) return;

	           	var point = touch.getLocation();
	           	//------------
	           	var spr = that.getChildByTag(that.chkPointTAG);
	           	spr.x = point.x;
       			spr.y = point.y; 
				//------------

	           	for(var i = 0 ; i < that.cardArr.length; i++) {
            		if(cc.rectIntersectsRect(that.cardArr[i].getBoundingBox(), spr.getBoundingBox())) {
            			// that.cardArr[i].onOpenFlipCard();
            			/*console.log(that.cardArr[i].pt)
            			console.log(that.cardArr[i].type);*/
            			that.onMathCard(that.cardArr[i]);
            			break;
            		}
            	}

            	return true;
            },
            onTouchMoved:function(touch, event) {
            	if(that.onStart == false) return;
            	if(that.hasTouch == false) return;

            	var point = touch.getLocation();
	           	//------------
	           	var spr = that.getChildByTag(that.chkPointTAG);
	           	spr.x = point.x;
       			spr.y = point.y; 
       			//------------
       			
       			for(var i = 0 ; i < that.cardArr.length; i++) {
            		if(cc.rectIntersectsRect(that.cardArr[i].getBoundingBox(), spr.getBoundingBox())) {
            			// that.cardArr[i].onOpenFlipCard();
            			// that.onMathCard(that.cardArr[i]);
            			break;
            		}
            	}

            },
            onTouchEnded:function(touch, event) {

            }
		});
		cc.eventManager.addListener(listener, touchPoint);


		var ready_png  = new cc.Sprite(res.ready_png);
		ready_png.x = GAME_DESIGN_SCREEN_WIDTH/2;
		ready_png.y = (GAME_DESIGN_SCREEN_HEIGHT - 150)/2;
		this.addChild(ready_png);
		ready_png.setOpacity(0);
		ready_png.setScale(0.1);

		
		var actionDone =  cc.CallFunc.create(function(pSender){
			ready_png.texture = res.start_png;
		}, this);
		var actionDone2 = cc.CallFunc.create(function(pSender){
			that.onStart = true;

			

			that.removeChild(ready_png);

			that.onGameStart();
		}, this);

		ready_png.runAction(
			new cc.Sequence(
				new cc.Spawn(
					new cc.FadeIn(0.2),
					new cc.ScaleTo(0.2,1)
				),
				new cc.ScaleTo(0.1,0.8),
				new cc.DelayTime(0.4), 
				new cc.FadeOut(0.1),
				actionDone,
				new cc.FadeIn(0.1),
				new cc.DelayTime(0.4),
				new cc.FadeOut(0.1),
				actionDone2
			)
		);
	},

	addScore:function(sc) {
		var score = this.getChildByTag(this.scoreTAG);
		this.allscore += sc;
		score.setScore(this.allscore);
	},

	onMathCard:function(card) {
		
		var that = this;
		if(card.type == null) {
			this.hasTouch = false;
			var _fail = new cc.Sprite(res.false_png);
			_fail.setScale(0.8);
			this.addChild(_fail);
			_fail.x = GAME_DESIGN_SCREEN_WIDTH/2;
			_fail.y = GAME_DESIGN_SCREEN_HEIGHT/2;

			var actionDone = cc.CallFunc.create(function() {
				that.removeChild(_fail);

				for(var i = 0 ; i < that.cardArr.length; i++) {
					if(that.cardArr[i].type != null) {
						that.cardArr[i].clicked = false;
						that.cardArr[i].onCloseFlipCard();
					}
				}
				that.chkCnt = 0;
				that.scheduleOnce(function() {
					that.mt = 0;
					that.setRandomOpenFlipCard(that.mt);
				},0.45);

			}, this);

			_fail.runAction(
				new cc.Sequence(
					new cc.DelayTime(0.2),
					actionDone
				)
			);
			this.chkcard = null
			return;
		}
		else {

			this.chkCnt++;
			if(card.clicked == true) {
				return;
			}
			card.clicked = true;
			card.onOpenFlipCard();

			var len = this.mathing.length;  
			// checkMath
			var ctype = card.type;

			// chk pos number 
			if(this.chkcard == null) {
				var pos = 0;
				for(var i = 0 ; i < this.mmm.length ; i++) {
					if(ctype == this.mmm[i]) {
						this.chkcard = ctype;
						pos = i;
						break;
					}
				}
				this.mmm.splice(pos, 1);
			}
			else {
				var pos = 0;
				for(var i = 0 ; i < this.mmm.length ; i++) {
					if(this.chkcard == this.mmm[i]) {
						pos = i;
						break;
					}
				}
				this.mmm.splice(pos, 1);
			}

			// search has pos num 
			var flag = false;
			for(var i = 0 ; i < this.mmm.length ; i++) {
				if(ctype == this.mmm[i]) {
					flag = true;
					break;
				}
			}
			if(flag == false) {
				this.chkcard = null;
			}
			
			if(this.chkcard == null) {
				// return;
			}
			else {
				console.log(this.chkcard , ctype);
				if(this.chkcard != ctype) {
					// fail 
					this.hasTouch = false;
					var _fail = new cc.Sprite(res.false_png);
					_fail.setScale(0.8);
					this.addChild(_fail);
					_fail.x = GAME_DESIGN_SCREEN_WIDTH/2;
					_fail.y = GAME_DESIGN_SCREEN_HEIGHT/2;
					var actionDone = cc.CallFunc.create(function() {
						that.removeChild(_fail);

						for(var i = 0 ; i < that.cardArr.length; i++) {
							if(that.cardArr[i].type != null) {
								that.cardArr[i].clicked = false;
								that.cardArr[i].onCloseFlipCard();
							}
						}
						that.chkCnt = 0;

						that.scheduleOnce(function() {
							that.mt = 0;
							that.setRandomOpenFlipCard(that.mt);
						},0.45);

					}, this);

					_fail.runAction(
						new cc.Sequence(
							new cc.DelayTime(0.2),
							actionDone
						)
					);
					this.chkcard = null;
					return;
				}
				else {
					//return;
				}
			}

			if(len == this.chkCnt) {
				this.hasTouch = false;
				var _true = new cc.Sprite(res.true_png);
				_true.setScale(0.8);
				this.addChild(_true);
				_true.x = GAME_DESIGN_SCREEN_WIDTH/2;
				_true.y = GAME_DESIGN_SCREEN_HEIGHT/2;
				var actionDone = cc.CallFunc.create(function() {
					that.removeChild(_true);
					that.chkCnt = 0;
					for(var i = 0 ; i < that.cardArr.length; i++) {
						if(that.cardArr[i].type != null) {
							that.cardArr[i].clicked = false;
							that.cardArr[i].onCloseFlipCard();
						}
					}
					that.scheduleOnce(function() {
						that.mt++;
						that.setRandomOpenFlipCard(that.mt);
					},0.45);
				}, this);
				_true.runAction(
					new cc.Sequence(
						new cc.DelayTime(0.5),

						actionDone
					)
				);
				this.chkcard = null;
				// add flower 
				/*var flowerBar = that.getChildByTag(that.flowerTAG);
				flowerBar.addProgress();*/

				this.addScore(50);
				return;
			}
			
		}
	},

	onGameStart:function() {
		var bar = this.getChildByTag(this.progressBarTAG);
		bar.startCount();

		this.hasTouch = false;

		this.setRandomOpenFlipCard(this.mt);
	}, 

	timeUp: function() {
		var that = this;

		var time_up = new cc.Sprite(res.time_up_png);
		time_up.x = GAME_DESIGN_SCREEN_WIDTH/2;
		time_up.y = GAME_DESIGN_SCREEN_HEIGHT/2;
		time_up.setOpacity(0);
		time_up.setScale(0.1);
		
		var actionDone = cc.CallFunc.create(function(){
			that.removeChild(time_up);
			that.EndScene();
		},this);

		time_up.runAction(
			new cc.Sequence(
				new cc.Spawn(
					new cc.FadeIn(0.2),
					new cc.ScaleTo(0.2,1)
				),
				new cc.DelayTime(0.05),
				new cc.ScaleTo(0.1,0.8),
				new cc.DelayTime(1),
				actionDone
			)
		);

		this.addChild(time_up);
	},

	EndScene:function() {
		var blackColor = new cc.Color(0,0,0);        
        cc.director.runScene(new cc.TransitionFade(0.2, new OverScene(this.allscore), blackColor));
	},

	setRandomOpenFlipCard:function(nn) {
		this.hasTouch = false;

		var tr = [1,2,3,4,5,6,7,8,9];
		var table = [0,1,2,3,4,5,6,7,8,9,10,11];
		var pCard = 2;
		var sec = 1;
		if(nn > 3) pCard = 6;
		else if(nn > 1) pCard = 4;

		// random table  
		table = Shuffle(table);
		var ppp = new Array(pCard);
		for(var i = 0; i < pCard; i++) {
			ppp[i] = table[i];
		}		


		ppp = this.setCardType(ppp);
		this.mathing = ppp;
		// reset card type 
		for(var i = 0 ; i < this.cardArr.length; i++) {
			this.cardArr[i].type = null;
			this.cardArr[i].clicked = false;
		}
		this.mmm = new Array();
		for(var i = 0; i < ppp.length; i++) {
			var flip = ppp[i].pt;
			var type = ppp[i].type;
			var pname = ppp[i].pname;
			var card = this.cardArr[flip];
			this.cardArr[flip].setCardType(type, pname);
			card.onOpenFlipCard();
			this.mmm.push(type);
		}

		this.scheduleOnce(this.closeCard,0.88);

	}, 

	closeCard:function() {
		for(var i = 0 ;  i < this.cardArr.length; i++) {
			if(this.cardArr[i].type != null) {
				this.cardArr[i].onCloseFlipCard();	
			}
		}

		this.hasTouch = true;
	},

	setSpacialEvent:function() {
		console.log("spacial event");
		var flower = this.getChildByTag(this.flowerTAG);
		// flower.startEvent();
	},

	setCardType:function(arr) {
		var type = 0;
		var c_arr = new Array();
		var len = arr.length; // 2 ,4 ,6 
		var m = 2;
		/*if(len > 2) {
			m = RandomRange(2,3);
		}*/
		var t_card = RandomRange(1,9);
		var count = RandomRange(2,3);
		var bonus = false;
		var pname = "type";

		if(m == 2) {
			if(this.getRandomBonus() == true) {
				pname = "bonustype";
				var bpoint = 0;
				for(var i = 0 ; i < 8 ; i++) {
					bpoint += RandomRange(0, 8);
				}
				if(bpoint > 50) {
					console.log("+500");
					t_card = 3;
				}
				else if(bpoint > 39) {
					console.log("+200");
					t_card = 2;
				}
				else {
					console.log("+100");
					t_card = 1;
				}
			}
		}
		
		
		


		
		var cc = 0;
		for(var i = 0 ; i < arr.length; i++) {
			// 2 3 4
			if(cc % m == 0 && i != 0) {
				t_card = RandomRange(1,9);
				pname = "type";
			}
			var obj = {
				type:t_card, pt:arr[i], pname:pname
			};
			c_arr.push(obj);
			cc++;
			
		}
		return c_arr;
	},

	getRandomBonus:function() {
		var pp = 0;
		var flag = false;
		for(var i = 0 ; i < 8; i++) {
			pp += RandomRange(0,2);
		}
		if(pp > 10 )  {
			flag = true;
		}
		// console.log("flag", flag , pp)
		return flag;
		
	}
});