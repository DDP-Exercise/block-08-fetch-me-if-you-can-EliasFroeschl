"use strict";

/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/

export default class Post {
    constructor(postInfo) {
        this.id = postInfo.id;
        this.title = postInfo.title;
        this.body = postInfo.body;
        this.comments = [];
    }

    addComments(comments) {
        this.comments = comments;
    }
}
