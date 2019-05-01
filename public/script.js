function itemToHtml(item){
  let newItemHtml = `
    <li>
      ${item.title}
      <ul>
        <li>Id: ${item.id}</li>
        <li>Content: ${item.content}</li>
        <li>Author: ${item.author}</li>
        <li>Date: ${item.publishDate}</li>
      </ul>
    </li>
  `;
  return newItemHtml;
}

function displayBlogList(data){
  data.blogs.forEach(item => {
    $('.listOfBlogs').append(itemToHtml(item));
  });
}
function displayBlogListByName(data){
  $('.listOfBlogs-searchByName').html("");
  data.blogs.forEach(item => {
    $('.listOfBlogs-searchByName').append(itemToHtml(item));
  });
}

function onLoad(){
  let url="./blogposts/api/blog-posts";
  let settings = {
    method : "GET",
    headers : {
      //The way we receive the things from the get or fetch call
      'Content-Type' : 'application/json'
    }
  };
  fetch(url, settings)
  .then(response => {
    //Check the status of the response
    if(response.ok){
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJSON => {
    displayBlogList(responseJSON);
  });
}

$('#listedByName').on('submit', function(event){
  event.preventDefault();
  let blogName = $('#authorNameSearch').val();
  if(blogName != ""){
    getByName(blogName);
  }
});

function getByName(blogName){
  let url=`./blogposts/api/blog-posts/${blogName}`;
  let settings = {
    method : "GET",
    headers : {
      //The way we receive the things from the get or fetch call
      'Content-Type' : 'application/json'
    }
  };
  fetch(url, settings)
  .then(response => {
    //Check the status of the response
    if(response.ok){
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJSON => {
    displayBlogListByName(responseJSON);
  });
}

$('.deleteForm').on('submit', event => {
  event.preventDefault();
  let idToDelete = $("#delete-form-id").val();
  if(idToDelete != ""){
    deleteById(idToDelete);
  }
});

function deleteById(idToDelete){
  let url=`./blogposts/api/blog-posts/${idToDelete}`;
  let settings = {
    method : "DELETE",
    headers : {
      //The way we receive the things from the get or fetch call
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({id : idToDelete})
  };
  fetch(url, settings)
  .then(response => {
    //Check the status of the response
    console.log(response);
    if(response.ok){
      return response.ok;
    }
    throw new Error(response.statusText);
  })
  .then(responseJSON => {
    $('.delete-form-response').html(
      `
      <h3> Successfully Deleted with the id: ${idToDelete} </h3>
      `);
  });
}

$('.postForm').on("submit", event => {
  event.preventDefault();
  let userTitle = $("#post-form-title").val();
  let userContent = $("#post-form-content").val();
  let userAuthor = $("#post-form-author").val();
  let userDate = $("#post-form-date").val();

  if( userTitle != "" && userContent != "" && userAuthor != "" && userDate != ""){
    postBlog(userTitle, userContent, userAuthor, userDate);
  }
});

function postBlog(userTitle, userContent, userAuthor, userDate){
  let url="./blogposts/api/blog-posts";
  let settings = {
    method : "POST",
    headers : {
      //The way we receive the things from the get or fetch call
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({title : userTitle, content : userContent, author : userAuthor ,publishDate : userDate})
  };
  console.log(settings);
  fetch(url, settings)
  .then(response => {
    //Check the status of the response
    if(response.ok){
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJSON => {
    console.log(responseJSON);
    successPostBlog(responseJSON);
  });
}

function successPostBlog(data){
  $('#post-form-response').html('');
  $('#post-form-response').append(itemToHtml(data.blog));
}

$('.updateForm').on("submit", event => {
  event.preventDefault();
  let blogId = $("#update-form-id").val();
  let userTitle = $("#update-form-title").val();
  let userContent = $("#update-form-content").val();
  let userAuthor = $("#update-form-author").val();
  let userDate = $("#update-form-date").val();

  if(blogId != "" && (userTitle != "" || userContent != "" || userAuthor != "" || userDate != "")){
    updateBlog(blogId, userTitle, userContent, userAuthor, userDate);
  }
});

function updateBlog(blogId, userTitle, userContent, userAuthor, userDate){
  let url=`./blogposts/api/blog-posts/${blogId}`;
  let settings = {
    method : "PUT",
    headers : {
      //The way we receive the things from the get or fetch call
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({title : userTitle, content : userContent, author : userAuthor ,publishDate : userDate})
  };
  console.log(settings);
  fetch(url, settings)
  .then(response => {
    //Check the status of the response
    console.log(response);
    if(response.ok){
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJSON => {
    console.log(responseJSON);
    successUpdateBlog(responseJSON);
  });
}

function successUpdateBlog(data){
  $('.update-form-response').html('');
  $('.update-form-response').append(itemToHtml(data.updatedBlog));
}

//Call the function cuando carga la pagina la primera vez
$(onLoad);
