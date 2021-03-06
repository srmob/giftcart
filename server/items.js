var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function ItemDAO(database) {
    "use strict";

    this.db = database;

    this.getCategories = function(callback) {
        "use strict";

       var query=[
           {
                $group : {
                    _id: "$category",
                    num : {$sum : 1}
                },
           },
           {$sort : {_id :1}}
       ];
        
        var categories = [];
        var collectionItem = this.db.collection('items');
        collectionItem.aggregate(query).toArray(function(err,result){
            var totalCount = 0;
            if (err){
                console.log(err);
            }else if(result.length){
                for (var i = 0 ; i < result.length ; i++){
                    categories.push(result[i]);
                    totalCount+= result[i].num;
                }
                categories.splice(0,0,{_id:"All",num:totalCount});
            }
            callback(categories);
        });

        // TODO-lab1A Replace all code above (in this method).
        
        
    }


    this.getItems = function(category, page, itemsPerPage, callback) {
        "use strict";
        
        //var pageItem = this.createDummyItem();
        var pageItems = [];
        console.log('category invoked '+category+' for page '+page+' and number of items per page '+itemsPerPage);
        var a = [
            /*{$match : { category: {$ne: "All"}}},*/
            
            {$skip:page * itemsPerPage},{$limit:itemsPerPage}
        ];
        
        var b = [
            {$match : { "category": category }},
            
            {$skip:page * itemsPerPage},{$limit:itemsPerPage},
        ];
        
        var query="";
        
        if (category=="All"){
            query=a;
        }else {    
            query=b;
        }
        
        var collectionItem = this.db.collection('items');
        
        collectionItem.aggregate(query).toArray(function(err,result){
            if(err){
                console.log(err);
            }else if(result.length){
                for (var i = 0 ; i < result.length ; i++){
                    pageItems.push(result[i]);
                }
            }
            callback(pageItems);
        })
        
    }


    this.getNumItems = function(category, callback) {
        "use strict";
        
        var numItems = 0;

        
        
        console.log('get num items category is'+category);
        
        //if (category !=='All') {
            var query = [
                {   $match  : { category : category}},
                {   $group  : { _id     : category, count: { $sum: 1 } }},
                {   $project: {_id      :   0,     count:1}}
            ];
        
        
            var collectionItem = this.db.collection('items');

            collectionItem.aggregate(query).toArray(function(err,result){
               if(err){
                   console.log(err);
               } else if(result.length){
                   console.log('result number is '+result[0].count);
                   numItems = result[0].count;
                   console.log('num items'+numItems);
               }
                callback(numItems);
            });
        
        
    }


    this.searchItems = function(query, page, itemsPerPage, callback) {
        "use strict";
        console.log('search item is'+query);
         var items = [];
        var collectionItem = this.db.collection('items');
        
        collectionItem.find({$text: {$search:query}}).limit(itemsPerPage).skip(page*itemsPerPage).toArray(function(err,result){
            if(err){
                console.log(err);
            }else if(result.length){
               for (var i=0; i<5; i++) {
                    items.push(result[i]);
                }

            }
            callback(items);
        })
        /*var item = this.createDummyItem();
        var items = [];
        for (var i=0; i<5; i++) {
            items.push(item);
        }

        // TODO-lab2A Replace all code above (in this method).

        callback(items);*/
    }


    this.getNumSearchItems = function(query, callback) {
        "use strict";

        var numItems = 0;
        
        /*
        * TODO-lab2B
        *
        * LAB #2B: Using the value of the query parameter passed to this method, count the
        * number of items in the "item" collection matching a text search. Pass the count
        * to the callback function.
        *
        */
        var collectionItem = this.db.collection('items');
        
        collectionItem.find({$text:{$search:query}}).count(function(err,result){
            
            console.log('item count is '+result);
            numItems=result;
            callback(numItems);
        });
        
    }


    this.getItem = function(itemId, callback) {
        "use strict";

        
        var collectionItem = this.db.collection('items');
        var item = [];
        console.log("item id in items.js is "+itemId);
        collectionItem.findOne({_id: itemId},function(err,result){
            console.log('result in findOne is '+JSON.stringify(result));
            //console.log('result length* in findOne is '+result.length);
            if(err){
                console.log(err);
            }else if(result){
               item = result;
                console.log('individual item is'+JSON.stringify(result));
            }
            callback(result);
        });
    }


    this.getRelatedItems = function(callback) {
        "use strict";

        this.db.collection("items").find({})
            .limit(4)
            .toArray(function(err, relatedItems) {
                assert.equal(null, err);
                callback(relatedItems);
            });
    };


    this.addReview = function(itemId, comment, name, stars, callback) {
        "use strict";

        /*
         * TODO-lab4
         *
         * LAB #4: Add a review to an item document. Reviews are stored as an 
         * array value for the key "reviews". Each review has the fields: "name", "comment", 
         * "stars", and "date".
         *
         */

        var reviewDoc = {
            name: name,
            comment: comment,
            stars: stars,
            date: Date.now()
        }
        console.log(' reviews to be added'+reviewDoc);
        //var dummyItem = this.createDummyItem();
        
        var collectionItem = this.db.collection('items');
        
        collectionItem.updateOne({_id:itemId},{$addToSet: {"reviews": reviewDoc}},{$upsert:true},function(err,doc){
            if(err){
                console.log(err);
            }else if(doc.length > 1){
                console.log(JSON.stringify(doc));
            }
            callback(doc);
        })
        /*dummyItem.reviews = [reviewDoc];
        callback(dummyItem);*/
    }


    /*this.createDummyItem = function() {
        "use strict";

        var item = {
            _id: 1,
            title: "Gray Hooded Sweatshirt",
            description: "The top hooded sweatshirt we offer",
            slogan: "Made of 100% cotton",
            stars: 0,
            category: "Apparel",
            img_url: "/img/products/hoodie.jpg",
            price: 29.99,
            reviews: []
        };

        return item;
    }*/
}


module.exports.ItemDAO = ItemDAO;
