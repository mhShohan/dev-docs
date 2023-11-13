# MongoDB Native driver

```bash
show dbs # Show All Databases
db # Show Current Database
use database_name # Create Or Switch Database
db.dropDatabase() # Remove database
db.createCollection('posts') # Create Collection
show collections # Show Collections
```

### Insert Documents

```bash
db.posts.insertOne({
  title: 'Post One',
  body: 'Body of post one',
  category: 'News',
  tags: ['news', 'events'],
  user: {
    name: 'John Doe',
    status: 'author'
  },
  date: Date()
})
```

### Insert Multiple Documents

```bash
db.posts.insertMany([
  {
    title: 'Post Two',
    body: 'Body of post two',
    category: 'Technology',
    date: Date()
  },
  {
    title: 'Post Three',
    body: 'Body of post three',
    category: 'News',
    date: Date()
  },
  {
    title: 'Post Four',
    body: 'Body of post three',
    category: 'Entertainment',
    date: Date()
  }
])
```

### Get All Documents

```bash
db.posts.find()
```

### Get All Documents Formatted

```bash
db.posts.find().pretty()
```

### Find Documents

```bash
db.posts.find({ category: 'News' })
```

### Sort Documents

```bash
# asc
db.posts.find().sort({ title: 1 }).pretty()
# desc
db.posts.find().sort({ title: -1 }).pretty()
```

### Count Documents

```bash
db.posts.find().count()
db.posts.find({ category: 'news' }).count()
```

### Limit Documents

```bash
db.posts.find().limit(2).pretty()
```

### Chaining

```bash
db.posts.find().limit(2).sort({ title: 1 }).pretty()
```

### Foreach

```bash
db.posts.find().forEach(function(doc) {
  print("Blog Post: " + doc.title)
})
```

### Find One Document

```bash
db.posts.findOne({ category: 'News' })
```

### Find Document on Specific Fields

```bash
db.posts.findOne({ title: 'Post One' }, {
  title: 1,
  author: 1
})
```

### Update Document

```bash
db.posts.update({ title: 'Post Two' },
{
  title: 'Post Two',
  body: 'New body for post 2',
  date: Date()
},
{
  upsert: true
})
```

### Update Specific Field

```bash
db.posts.update({ title: 'Post Two' },
{
  $set: {
    body: 'Body for post 2',
    category: 'Technology'
  }
})
```

### Increment Field (\$inc)

```bash
db.posts.update({ title: 'Post Two' },
{
  $inc: {
    likes: 5
  }
})
```

### Rename Field

```bash
db.posts.update({ title: 'Post Two' },
{
  $rename: {
    likes: 'views'
  }
})
```

### Delete Document

```bash
db.posts.remove({ title: 'Post Four' })
```

### Sub-Documents

```bash
db.posts.update({ title: 'Post One' },
{
  $set: {
    comments: [
      {
        body: 'Comment One',
        user: 'Mary Williams',
        date: Date()
      },
      {
        body: 'Comment Two',
        user: 'Harry White',
        date: Date()
      }
    ]
  }
})
```

### Find By Element in Array (\$elemMatch)

```bash
db.posts.find({
  comments: {
     $elemMatch: {
       user: 'Mary Williams'
       }
    }
  }
)
```

### Add Index

```bash
db.posts.createIndex({ title: 'text' })
```

### Text Search

```bash
db.posts.find({
  $text: {
    $search: "\"Post O\""
    }
})
```

## Operator

- Compression query Operator

  ```bash
  db.collection_name.find({ age: { $eq: 30 }}) # Equal to value
  db.collection_name.find({ age: { $ne: 30 }}) # Not Equal to value
  db.collection_name.find({ age: { $gt: 18 }}) # Greater than to value
  db.collection_name.find({ age: { $gte: 18 }}) # Greater than or Equal to value
  db.collection_name.find({ age: { $lt: 50 }}) # Less than to value
  db.collection_name.find({ age: { $lte: 50 }}) # less than or Equal to value

  # implicit and
  db.collection_name.find({ age: { $gte: 18, $lte: 30 }})
  db.collection_name.find({ age: { $in: [18 , 30 ] }})


  ```

- logical query Operator

  ```bash
  # explicit and
  db.collection_name.find({ $and: [{ $ne: 30 }, { $gte: 18 }] })

  # explicit or
  db.collection_name.find({ $or: [{ $ne: 30 }, { $gte: 18 }] })

  ```

- element query Operator

  ```bash
  db.collection_name.find({ name: { $exist: true } })
  db.collection_name.find({ age: { $type: "string" } })

  ```

# MongoDB Aggregation Framework

- [Studio 3T Documentation](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-aggregate-pipeline-syntax)

```bash
# Aggregation pipeline
db.collection_name.aggregate(
    [
        { }, # stage 1
        { }, # stage 2
        { }, # stage 3
        { }, # ....
    ]
)
```

- $match - query the documents

  ```js
      {
          $match: {
              gender: "Male",
              age: { $lt: 5 },
          }
      }
  ```

- $project - select the field which is show or not

  ```js
      {
          $project: {
                name: 1,
                age: 1,
                gender: 1
            }
      }
  ```

- $addFields - add new field to return document

  ```js
  {
    $addFields: {
      field: 'hello';
    }
  }
  ```

- $out - create new collection with the pipeline document fields

  ```js
  {
    $out: 'test';
  }
  ```

- $merge - merger into existing collection

  ```js
  {
    $merge: 'test'; // value must be a existing collection name
  }
  ```

- $group - group by fields
  ```js
  {
    $group: {
            _id: "$gender",
            count:{ $sum: 1 }, // accumulator object
            existedUser: { $push: "$$ROOT" } // accumulator object
        }
  }
  ```
- $unwind - create separate fields from array
  ```js
  {
    $unwind: '$interests';
  }
  ```
- $bucket - create group between the boundaries and return the docs in that boundary
  ```js
  {
    $bucket:{
            groupBy: "$age",
            boundaries: [ 30,60,90],
            default: "lastValue",
            output: {
                count:{$sum:1} ,
                name: {$push: "$name.firstName"}
            }
        }
  }
  ```
- $sort - sort documents

  ```js
  {
    $sort: {
      age: 1;
    }
  }
  ```

- $limit - limit doc
  ```js
  {
    $limit: 10;
  }
  ```
- $facet - use multiple pipelines parallel
  ```js
      db.collection_name.aggregate(
        [
            {
              $facet: {
                [
                  {}, //state 1
                  {}, //state 2
                  {}, // ......
                ], // pipeline 1
                [], // pipeline 2
                [], // pipeline 3
                [], // ....
              }
            }
        ]
    )
  ```
- $lookup - join two collection
  ```js
  {
    $lookup: {
      from: "collection_name", // target collection
      localField: "userId", // local field what need to join
      foreignField: "_id", // target field to join
      as: "user" // name of the result
    }
  }
  ```
