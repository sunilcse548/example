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
   // alert(e.message);
   // alert(e.user_ID);
    tweet = e.message;
    tweeterid = e.user_ID;
    
   // alert(tweet);
    Titanium.API.info('File system !');
        	var newfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/tweeters.txt');
        	var b = Titanium.Filesystem.resourcesDirectory;
        	 
                       //alert(newfile.resolve());
                           var delimiter= '|~*##*~|';
                         newfile.write(tweeterid+": "+tweet+delimiter,true);
                         Ti.API.info('newfile: '+newfile.read());
           var catfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/category+.txt');
                 catfile.write(e.category+'\n',true);
                 Ti.API.info('category file: '+catfile.read());
                        
});
var webview = Titanium.UI.createWebView({
   width: 320,
   height: 367,
   top: 10,
   left: 10,
   url: 'simple.html'
});
win1.add(webview);
/*
win1.add(label1);
win1.add(searchbutton);
win1.add(searchterm);
 */
 /*

  searchbutton.addEventListener('click',function(e) { 
	var searchvalue = searchterm.value;
	Titanium.API.info(searchvalue);
    var xhr = Ti.Network.createHTTPClient();
     

    xhr.open("POST","http://search.twitter.com/search.json?q="+searchvalue+"&callback=?");
    xhr.setRequestHeader('Content-type','application/json');
    xhr.setRequestHeader('Accept','application/json');
    xhr.onload = function(data) {
     
     xhr.setRequestHeader("X_REQUESTED_WITH", "JSON");

     Titanium.API.info("Ok");
        }
        
   });

*/
//win1.add(label1);

//
// create controls tab and root window
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

//win2.add(label2);

var view1 = Titanium.UI.createView({
	 borderRadius:10,
	 
	 width:380, 
	 height:180 
});

//win2.add(view1);
 
 

	//win2.add(favbutton);
	
	
	
	
	 
	 tabGroup.addEventListener('focus', function(e) {
		if (e.previousIndex == 0) {
		 
		var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+'/tweeters.txt');
    var t = file.read().text;
  
    var webview2 = Titanium.UI.createWebView({url:'displayPage.html'});
    webview2.addEventListener('load', function() {
    Ti.App.fireEvent('pageReady',{tweets:t});
	});
	win2.add(webview2);
		
		
		}
	});
	//win2.add(favbutton); 
	
	 

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
