const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let blogSchema = mongoose.Schema({
  id : {type : String, required: true, unique : true},
  title : {type : String, required: true},
  content : {type : String, required: true},
  author : {type : String, required: true},
  publishDate : {type : Date, required: true}
});

let Blogs = mongoose.model('Blogs', blogSchema);

function populateBlogArray() {
  let blogsArray = [
    {
      id: uuidv4(),
      title: "Blog title 1",
      content: "Interesting blog content",
      author: "JustName",
      publishDate: new Date()
    },
    {
      id: uuidv4(),
      title: "Blog title 2",
      content: "Even more interesting blog content",
      author: "FancyAuthor",
      publishDate: new Date()
    },
    {
      id: uuidv4(),
      title: "Blog title 3",
      content: "Such an amazing blog content",
      author: "FancyName",
      publishDate: new Date()
    },
    {
      id: uuidv4(),
      title: "Blog title 4",
      content: "How to make cookies while being sleep",
      author: "Roger",
      publishDate: new Date()
    },
    {
      id: uuidv4(),
      title: "Blog title 5",
      content: "How to make cookies while being awake",
      author: "Roger",
      publishDate: new Date()
    }
  ];

  for(i=0; i<blogsArray.length; i++){
    ListBlogs.post(blogsArray[i]);
  }
}


//Simulate querys
const ListBlogs = {
  get : function(){
    return Blogs.find()
      .then(blogs => {
        return blogs;
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  getByName : function(authorName){
    return Blogs.find({author : authorName})
      .then(blogs => {
        return blogs;
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  post : function(newBlog){
    return Blogs.create(newBlog)
      .then(blog => {
        return blog;
      })
      .catch(err => {
        throw new Error(err);
      })
  },

  delete : function(idToDelete){
    return Blogs.findOneAndDelete({id: idToDelete})
		.then(blog => {
			//Returns the deleted sport finded by find one
			return blog;
		})
		.catch(err => {
			throw new Error(err);
		});
  },

  put : function(idToUpdate, updateBlog){
    return Blogs.findOneAndUpdate({id : idToUpdate}, {$set:updateBlog}, {new: true})
		.then(blog => {
			return blog;
		})
		.catch(err => {
			throw new Error(err);
		});
  }
}

//WARNING: This creates several times the same set of blogs, each time the server is run, so just use one time and comment it when restarting the server
//populateBlogArray();
module.exports = {ListBlogs};
