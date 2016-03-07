/*
  Copyright (c) 2008 - 2016 MongoDB, Inc. <http://mongodb.com>

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function ItemDAO(database) {
    "use strict";

    this.db = database;

    this.getCategories = function(callback) {
        "use strict";
        
        /*
        * TODO-lab1A
        *
        * LAB #1A: 
        * Create an aggregation query to return the total number of items in each category. The
        * documents in the array output by your aggregation should contain fields for 
        * "_id" and "num". HINT: Test your mongodb query in the shell first before implementing 
        * it in JavaScript.
        *
        * Ensure categories are organized in alphabetical order before passing to the callback.
        *
        * Include a document for category "All" in the categories to pass to the callback. All
        * should identify the total number of documents across all categories.
        *
        */

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
        
        /*
         * TODO-lab1B
         *
         * LAB #1B: 
         * Create a query to select only the items that should be displayed for a particular
         * page. For example, on the first page, only the first itemsPerPage should be displayed. 
         * Use limit() and skip() and the method parameters: page and itemsPerPage to identify 
         * the appropriate products. Pass these items to the callback function. 
         *
         * Do NOT sort items. 
         *
         */
        
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
        /*db.item.aggregate([
            {$match : { category: {$ne: "All"}}},
            {$limit:itemsPerPage},
            {$skip:page * itemsPerPage}
        ]);*/
        /*for (var i=0; i<5; i++) {
            pageItems.push(pageItem);
        }*/

        // TODO-lab1B Replace all code above (in this method).

        //callback(pageItems);
    }


    this.getNumItems = function(category, callback) {
        "use strict";
        
        var numItems = 0;

        /*
         * TODO-lab1C
         *
         * LAB #1C: Write a query that determines the number of items in a category and pass the
         * count to the callback function. The count is used in the mongomart application for
         * pagination. The category is passed as a parameter to this method.
         *
         * See the route handler for the root path (i.e. "/") for an example of a call to the
         * getNumItems() method.
         *
         */
        
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
                /*db.item.aggregate([
                    {   $match  : { category : "Electronics"}},
                    {   $group  : { _id     : "category", count: { $sum: 1 } }}
                ]);*/

        /*}else {
            numItems = this.db.collection('item').count();
            console.log('count of all items is '+numItems[0]);
        }*/
        
        
    }


    this.searchItems = function(query, page, itemsPerPage, callback) {
        "use strict";
        
        /*
         * TODO-lab2A
         *
         * LAB #2A: Using the value of the query parameter passed to this method, perform
         * a text search against the item collection. Do not sort the results. Select only 
         * the items that should be displayed for a particular page. For example, on the 
         * first page, only the first itemsPerPage matching the query should be displayed. 
         * Use limit() and skip() and the method parameters: page and itemsPerPage to 
         * select the appropriate matching products. Pass these items to the callback 
         * function. 
         *
         * You will need to create a single text index on title, slogan, and description.
         *
         */
        /*db.item.find({$text: {$search:"sporty"}});*/
        
        
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

        /*
         * TODO-lab3
         *
         * LAB #3: Query the "item" collection by _id and pass the matching item
         * to the callback function.
         *
         */
        var collectionItem = this.db.collection('items');
        var item = {};
        collectionItem.findOne({_id: itemId},function(err,result){
            //collection.findOne({a:2}, {fields:{b:1}}, function(err, doc) 
            console.log('result length is '+result.length);
            if(err){
                console.log(err);
            }else if(result.length){
               item = result;
                console.log('individual item is'+JSON.stringify(result));
            }
            callback(result);
        });
        //var item = this.createDummyItem();

        // TODO-lab3 Replace all code above (in this method).

        //callback(item);
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
