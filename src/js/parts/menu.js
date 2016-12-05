var menu_links = $('.menu-links'),
	burger = $('.link_burger p:first-child');
	var buttons = $('button');
	var li =$('li.limenu');
var tl = new TimelineLite();

$('.link_burger').on('click', function(e){
	if(burger.text() == 'X'){
		//menu_links.removeClass('active');
		burger.html('&#9776');
		console.log($('.menu-links'));
		//$('.menu-links ul li').removeClass('active');
		tl
			.staggerFromTo(li, 0.2, {autoAlpha: 1, y:0},
				{y: 20, autoAlpha: 0, ease:Power1.easeIn}, 0.1)
			.to(menu_links, 0.2,{x: 10, autoAlpha: 0, ease:Power1.easeIn}, 0.1);
	}
	else{
		//menu_links.addClass('active');
		burger.text('X');
		console.log($('.menu-links'));
		//$('.menu-links ul li').addClass('active');
		tl
			.to(menu_links, 0.2, {x: 20, autoAlpha: 1, ease:Power1.easeOut})
			.staggerFromTo(li, 0.1, {autoAlpha: 0, y:20},
				{y: 0, autoAlpha: 1,  ease: Power0.easeNone}, 0.1);
		//tl.staggerFromTo(buttons,0.2, {autoAlpha: 0, x:10},
		//{x: -20, autoAlpha: 1, ease:Power1.easeOut}, 0.1);
	
	}
	// menu_links.addClass('active');
	// $('.link_burger p').text('X');
	// 	$(this).on('click', function(e){
	// 		menu_links.removeClass('active');
	// 	});		
});


//tl.staggerFrom(li, 0.2, {x: 200, ease:Power1.easeOut}, 0.1);
