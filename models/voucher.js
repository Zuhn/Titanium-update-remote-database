exports.definition = {
	config: {
		columns: {
		    "id": "int",
		    "name": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "vouchers"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			deleteAll : function() {
				 
                var collection = this;
 
                var sql = "DELETE FROM " + collection.config.adapter.collection_name;
                db = Ti.Database.open(collection.config.adapter.db_name);
                db.execute(sql);
                db.close();
 
                collection.trigger('sync');
 
            }
            
		});

		return Collection;
	}
};