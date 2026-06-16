"use strict";

/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    Elias Fröschl - 2026-06-09
 *  *******************************************************/

"use strict";

import User from "./class.user.js";
import Post from "./class.post.js";

const statusText = document.getElementById("statusText");
const userBoard = document.getElementById("userBoard");
const userUrl = "https://jsonplaceholder.typicode.com/users";
const postUrl = "https://jsonplaceholder.typicode.com/posts";

let allUsers = [];

async function startProgram() {
    const users = await loadUsers();
    const posts = await loadPosts();
    givePostsToUsers(users, posts);
    allUsers = users;
    console.log(allUsers);
    statusText.textContent = users.length + " users and " + posts.length + " posts loaded.";
    printUsers(allUsers);
}

async function loadUsers() {
    const response = await fetch(userUrl);
    const userData = await response.json();

    const finishedUsers = [];

    for (const singleUser of userData) {
        const newUser = new User(singleUser);
        finishedUsers.push(newUser);
    }

    return finishedUsers;
}

async function loadPosts() {
    const response = await fetch(postUrl);
    const postData = await response.json();

    const finishedPosts = [];

    for (const singlePost of postData) {
        const newPost = new Post(singlePost);
        newPost.userId = singlePost.userId;

        finishedPosts.push(newPost);
    }

    return finishedPosts;
}

function givePostsToUsers(users, posts) {
    for (const post of posts) {
        for (const user of users) {
            if (post.userId === user.id) {
                user.addPost(post);
            }
        }
    }
}

function printUsers(users) {
    userBoard.innerHTML = "";

    for (const user of users) {
        const userBox = document.createElement("article");
        userBox.classList.add("user-box");

        userBox.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
            <p><strong>Website:</strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
            <p><strong>Posts:</strong> ${user.posts.length}</p>

            <button class="user-post-button" data-user-id="${user.id}">
                Show posts
            </button>

            <div class="post-place" id="posts-for-user-${user.id}"></div>
        `;

        userBoard.append(userBox);
    }
}

function showOrHidePosts(userId, clickedButton) {
    const postPlace = document.getElementById("posts-for-user-" + userId);
    const clickedUser = findUserById(userId);

    if (postPlace.innerHTML !== "") {
        postPlace.innerHTML = "";
        clickedButton.textContent = "Show posts";
        return;
    }

    clickedButton.textContent = "Hide posts";

    for (const post of clickedUser.posts) {
        const postBox = document.createElement("section");
        postBox.classList.add("post-box");

        postBox.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>

            <button class="comment-button" data-post-id="${post.id}">
                Load comments
            </button>

            <div class="comment-place" id="comments-for-post-${post.id}"></div>
        `;

        postPlace.append(postBox);
    }
}

function findUserById(userId) {
    for (const user of allUsers) {
        if (user.id === userId) {
            return user;
        }
    }
}
function findPostById(postId) {
    for (const user of allUsers) {
        for (const post of user.posts) {
            if (post.id === postId) {
                return post;
            }
        }
    }
}

async function loadAndPrintComments(postId, clickedButton) {
    const commentPlace = document.getElementById("comments-for-post-" + postId);
    const selectedPost = findPostById(postId);

    if (commentPlace.innerHTML !== "") {
        commentPlace.innerHTML = "";
        clickedButton.textContent = "Load comments";
        return;
    }

    clickedButton.textContent = "Hide comments";

    if (selectedPost.comments.length === 0) {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postId);
        const comments = await response.json();

        selectedPost.addComments(comments);
    }
    for (const comment of selectedPost.comments) {
        const commentBox = document.createElement("article");
        commentBox.classList.add("comment-box");

        commentBox.innerHTML = `
            <h4>${comment.name}</h4>
            <p><strong>Email:</strong> ${comment.email}</p>
            <p>${comment.body}</p>
        `;

        commentPlace.append(commentBox);
    }
}
userBoard.addEventListener("click", function(event) {
    if (event.target.classList.contains("user-post-button")) {
        const userId = Number(event.target.dataset.userId);
        showOrHidePosts(userId, event.target);
    }
    if (event.target.classList.contains("comment-button")) {
        const postId = Number(event.target.dataset.postId);
        loadAndPrintComments(postId, event.target);
    }
});

startProgram();