var pjaxBinded = false;
var disqus_shortname = 'garyblog';
jQuery(document).ready(function($){
	afterLoaded();
	bindPjax();
});

function afterLoaded(){
	bindSlimBox();
	$.getScript('http://garyblog.disqus.com/embed.js',function(data){eval(data);});
	$.getScript('http://garyblog.disqus.com/count.js',function(data){eval(data);});
}

function bindSlimBox(){
	if($('.postContent a[rel!=link]:has(img)').length > 0){
		$.getScript("{{ ASSET_PATH }}/js/slimbox2.js");
	};
}

function bindPjax(){
	$('a').live('click',function(event){
		var link = event.currentTarget;
		var url = link.href;
		// Middle click, cmd click, and ctrl click should open
		// links in a new tab as normal.
		if ( event.which > 1 || event.metaKey || event.ctrlKey )
			return

		// Ignore cross origin links
		if ( location.protocol !== link.protocol || location.host !== link.host ){
			return;
		}
		
		  // Ignore anchors on the same page
		if (link.hash && link.href.replace(link.hash, '') === location.href.replace(location.hash, ''))
			return

		// Ignore empty anchor "foo.html#"
		if (link.href === location.href + '#')
			return
		loadData(url,true);
		event.preventDefault();
	});
	
	
}

function loadData(url,toPush){
	$.ajax({
		url:url,
		beforeSend:function(jqXHR, settings){
			$('#content').fadeTo(300,0.3);
		},
		complete:function(){
			$('#content').fadeTo(200,1);
		},
		success:function(data){
			data = $(data);
			var title = data.filter('title').text();
			var category = data.find('.category').html();
			var content = data.find('#content').html();
			caculateCategory(category);
			$('#content').html(content);
			$('#content').fadeTo(200,1);
			if(toPush){
				window.history.pushState(null, title, url);
			}
			afterLoaded();
			document.title = title;
			if(!pjaxBinded){
				pjaxBinded = true;
				$(window).bind('popstate', function(e){
					loadData(location.pathname,false);
					return false;
				});
			}
		},
	});
}

function caculateCategory(category){
	$('#nav .menu-item').each(function(index,item){
		if($(item).find('a').html() == category){
			$(item).addClass('current-menu-item');
		}else{
			$(item).removeClass('current-menu-item');
		}
	});
}