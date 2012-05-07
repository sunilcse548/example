// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();
var tweeterid,tweet;

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tweets',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tweets',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Enter Search term:',
	font:{fontSize:10,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',	
	top:10,
	left:10,
	 
});
var searchbutton = Ti.UI.createButton({
    title: 'Search',
    height: '30dp',
    width: '100dp',
    top:10,
    right:10
});
var searchterm = Ti.UI.createTextField({
   top:10,
   left:100,
   height: '40dp',
   width: '100dp',  
});

Ti.App.addEventListener('app:fromWebView', function(e) {
    
    tweet = e.message;
    tweeterid = e.user_ID;
    tweetid = e.tweetid; 
    category = e.category;
    
Titanium.API.info('File system !');
        	var tweetsfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/tweeters.txt');
            var delimiter= '|~*##*~|';
            var msgdelimiter= '|~*#%&%#*~|';
                tweetsfile.write(tweetid + " " + msgdelimiter+tweeterid+": "+msgdelimiter+tweet+" "+msgdelimiter+category +delimiter,true);
                Ti.API.info('tweetsfile: '+tweetsfile.read());
                          
                        
});

var webview = Titanium.UI.createWebView({
   width: 320,
   height: 367,
   top: 10,
   left: 10,
   url: 'simple.html'
});
win1.add(webview);
 
//
var win2 = Titanium.UI.createWindow({  
    title:'favorites',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'favorites',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

 

var view1 = Titanium.UI.createView({
	 borderRadius:10,
	 
	 width:380, 
	 height:180 
});
Ti.App.addEventListener('app:fromWebViewforchangecategory', function(e) {
	var content = e.content;
	var tweetsfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/tweeters.txt');
	
	tweetsfile.write(content);
	alert("saved to file");
	 
});
 
	
	
	
	
	 
tabGroup.addEventListener('focus', function(e) {
	if (e.previousIndex == 0) {
		 
		var tweetsfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/tweeters.txt');
        var text = tweetsfile.read().text;
        var webview2 = Titanium.UI.createWebView({url:'displayPage.html'});
        webview2.addEventListener('load', function() {
        Ti.App.fireEvent('pageReady',{tweets:text});
	});
	win2.add(webview2);
		
		
		}
	});
	 
	
	 

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
