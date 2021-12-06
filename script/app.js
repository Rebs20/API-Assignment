let postTitle = document.getElementById("post-title");
let postBody = document.getElementById("post-body");
let postForm = document.querySelector("#post-form");
let userPost = [];

postForm.addEventListener("submit", createPost);

function getPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let postLayout = document.getElementById("post-layout");
      userPost = data;
      let html = "";
      data.forEach((e) => {
        // console.log(element)
        html += `
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-body">
                <div class="d-flex justify-content-end">
                    <h6 class="text-danger">${e.id}</h6>
                </div>
                    <h5 class="post-title mb-4" id="my-post-title">${e.title}</h5>
                    <p class="post-body" id="my-post-body">${e.body}</p>
                </div>
            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-danger" onClick="deletePost(${e.id})">delete</
                button>
            </div>
            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-warning" onClick="updatePost(${e.id})">Update</
                button>
            </div>
            </div>
        </div>
        `;
        postLayout.innerHTML = html;
      });
    });
}
getPosts();

function createPost(e) {
  e.preventDefault();
  let pTitle = postTitle.value;
  let pBody = postBody.value;
  console.log("post-title", pTitle);
  console.log(pTitle, pBody);
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: pTitle,
      body: pBody,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("posts", data);
      console.log(userPost);
      userPost.push(data);
      // userPost = data;
      console.log(userPost);
      let postLayout = document.getElementById("post-layout");
      // userPost(data)
      let html = "";
      userPost.forEach((e) => {
        // console.log(element)
        html += `
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-body">
                <div class="d-flex justify-content-end">
                    <h6 class="text-danger">${e.id}</h6>
                </div>
                    <h5 class="post-title mb-4">${e.title}</h5>
                    <p class="post-body">${e.body}</p>
                </div>
                <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-danger" onClick="deletePost(${e.id})">delete</
                button>
            </div>
            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-warning" onClick="updatePost(${e.id})">Update</
                button>
            </div>
            </div>
        </div>
        `;
      });
      postLayout.innerHTML = html;
      alert("posts created successfully");
    });
}

function deletePost(postId) {
  console.log(postId);
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(userPost);
      userPost = userPost.filter((post) => {
        //
        return post.id !== postId;
        // post.id === postId;
      });
      console.log(userPost);

      console.log(userPost);
      let postLayout = document.getElementById("post-layout");
      console.log("post", data);
      let html = "";
      userPost.forEach((e) => {
        // console.log(element)
        html += `
        <div class="col-md-4 mb-3">
            <div class="card h-100">
                <div class="card-body">
                <div class="d-flex justify-content-end">
                    <h6 class="text-danger">${e.id}</h6>
                </div>
                    <h5 class="post-title mb-4">${e.title}</h5>
                    <p class="post-body">${e.body}</p>
                </div>
            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-danger" onClick="deletePost(${e.id})">delete</
                button>
            </div>
            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-warning" onClick="updatePost(${e.id})">Update</
                button>
            </div>
            </div>
        </div>
        `;
        postLayout.innerHTML = html;
      });
      alert("posts successfully deleted");
    });
}

function updatePost(postId) {
  let pTitle = postTitle.value;
  let pBody = postBody.value;
  console.log(postId);
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      id: postId,
      title: pTitle,
      body: pBody,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let myPostTitle = document.querySelectorAll(".post-title");
      console.log(myPostTitle);
      let myPostBody = document.querySelectorAll(".post-body");
      myPostTitle.forEach((title, index) => {
        if (index + 1 === postId) {
          title.textContent = data.title;
        }
      });
      myPostBody.forEach((body, index) => {
        if (index + 1 === postId) {
          body.textContent = data.body;
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
}
