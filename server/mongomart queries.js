db.item.aggregate([        
    {$match : { $or: [  { category: {$eq: "Electronics"} } ] }},             {$limit: 5},             {$skip:0}      
    
    ]);
    
db.item.aggregate([  
    {$limit: 5},{$skip:5}   
]);
    
    db.item.aggregate([{$skip:10},{$limit: 5}  ]);
    
db.item.find([        
    {$match : { category : "Books" }},
    {$group: {_id : "$category"}}
    
    ]);
    
    
    db.item.aggregate([
        {   $match  : { category : "Electronics"}},
        {   $group  : { _id     : "category", count: { $sum: 1 } }}
    ]);
    
    db.item.aggregate([
        {   $match  : { category : "Electronics"}},
        {   $group  : { _id     : "category", count: { $sum: 1 } }},
        {$project : {_id:0,count:1}}
    ]);
    
    
    db.item.update(
                {_id:17},
                {$addToSet: {"reviews":[{"name":"Donald Trump5","comment":"This is the best umbrella you will ever use4.","stars":4,"date":1.456270097364e+12}]}},
                {$upsert: true}
);


db.cart.findOne({userId:"558098a65133816958968d88"});