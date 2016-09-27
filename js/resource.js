var res = {
	// bg
	bg_title : "assets/bg/title.png",
	bg_Game  : "assets/bg/bg1.png",
	// ui 
	btn_start : "assets/ui/btn_start.png",
	progress_bar_blue : "assets/ui/progress_bar_blue.png", 
	progress_bar_bg   : "assets/ui/progress_bar_bg.png",
	combo_png : "assets/ui/combo.png",
	ready_png : "assets/ui/ready.png",
	start_png : "assets/ui/start.png",
	time_up_png : "assets/ui/time_up.png",
	false_png : "assets/ui/false.png",
	true_png : "assets/ui/true.png",
	butretry : "assets/ui/butretry.png", 
	butstart : "assets/ui/butstart.png",
	// font & number 
	number_plist : "assets/font/number.plist",
	number_png   : "assets/font/number.png",
	// game 	
	// card_png : "assets/card.png",
	// card_plist : "assets/card.plist",
	panel_plist : "assets/panel.plist",
	panel_png : "assets/panel.png",


	flower_png : "assets/flower.png",
	flower2_png : "assets/flower2.png", 

}

var g_resources = [];
for(res_key in res) {
    if(res.hasOwnProperty(res_key)) {
        g_resources.push(res[res_key]);
    }
}