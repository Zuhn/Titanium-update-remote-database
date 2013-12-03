var header_loader = null;
//Définition du chemin de stocage de la db
var path_to_remote_file = 'http://www.mondomaine.com/mytest.sql';
var path_to_doc = Titanium.Filesystem.applicationDataDirectory;
var xhr;
function reloadData(e)
{
	xhr = Titanium.Network.createHTTPClient({
	    onload: function() {
	    	
	    	//SUpression de la base local existante
	    	var db = Ti.Database.open('mydb1Installed');
	        db.remove();
	
	        // delete all items
	    	Alloy.Collections.voucher.deleteAll();
	
	        //var db1 = Ti.Database.install(Ti.Filesystem.getFile(path_to_doc+'myalloy.sql'),'mydb1Installed');
	        var dbInstall = Ti.Database.install(path_to_doc+'/myalloy.sql', 'mydb1Installed');
	
	        //suppression du fichier temporaire
	        var file = Titanium.Filesystem.getFile(path_to_doc,'myalloy.sql');
			if (file.exists()) file.deleteFile(); 
	
			displayData()
			xhr = null;
	
	    },
	    timeout: 10000
	
	});

	header_loader = e;
	xhr.open('GET',path_to_remote_file);
	xhr.file = Titanium.Filesystem.getFile(path_to_doc,'myalloy.sql');
	xhr.send();
}

function displayData()
{
	var db = Ti.Database.open('mydb1Installed');

    //Récupération des données SQLite
   var product = db.execute("SELECT * FROM voucher" );
	
   //Insertion des nouvelles données dans la base
	while (product.isValidRow())
	{
		var new_voucher = Alloy.createModel('voucher', {name:product.fieldByName('name')}); 
		new_voucher.save();

		product.next();
	}
	//Mise à jour de a collection voucher
	Alloy.Collections.voucher.fetch();
	if(header_loader != null) header_loader.hide();
	
	db.close();
}

displayData()
$.index.open();