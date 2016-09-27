/*window.onload = function(){
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload(["HelloWorld.png"], function () {
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var size = cc.director.getWinSize();
                    console.log(size);
                    var sprite = cc.Sprite.create("HelloWorld.png");
                    sprite.setPosition(size.width / 2, size.height / 2);
                    sprite.setScale(0.8);
                    this.addChild(sprite, 0);

                    var label = cc.LabelTTF.create("Hello World", "Arial", 40);
                    label.setPosition(size.width / 2, size.height / 2);
                    this.addChild(label, 1);
                }
            });
            cc.director.runScene(new MyScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};*/

var GAME_DESIGN_SCREEN_WIDTH = 640;
var GAME_DESIGN_SCREEN_HEIGHT = 840;

window.onload = function() {
  cc.game.onStart = function() {
    cc.view.adjustViewPort(true);
    cc.view.resizeWithBrowserSize(true);
    cc.view.setDesignResolutionSize(
      GAME_DESIGN_SCREEN_WIDTH, GAME_DESIGN_SCREEN_HEIGHT,
      cc.ResolutionPolicy.SHOW_ALL
    );

    cc.LoaderScene.preload(g_resources, function () {
        // cc.director.runScene(new OverScene());
        cc.director.runScene(new GameScene());
    }, this);
  }
  cc.game.run("gameCanvas");
};



function Shuffle(list) {
    var n = list.length;
    while(n > 1) {
        n--;
        var k = RandomRange(0, n);
        var value = list[k];
        list[k] = list[n];
        list[n] = value;
    }
    return list;
}
function RandomRange(min , max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
