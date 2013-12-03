var xhr = Titanium.Network.createHTTPClient({
    onload: function() {
        var db = Ti.Database.open('mydb1Installed');
    	db.remove();
        var newdatabase = Ti.Database.install(Titanium.Filesystem.applicationSupportDirectory+'/myalloy.sql', 'mydb1Installed');
        var db = Ti.Database.open('mydb1Installed');
    },
    timeout: 10000
});
xhr.open('GET','http://www.processmx.com/alloy.sql');
xhr.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationSupportDirectory,'myalloy.sql');
xhr.send();

/*
function reloadData()
{
	xhr.file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationSupportDirectory,'myalloy.sql');
	xhr.send();
}
$.index.addEventListener('click', reloadData);
*/



$.index.open();