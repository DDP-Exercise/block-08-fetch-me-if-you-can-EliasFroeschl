"use strict";

/*******************************************************
 *  Users
 *
 *  See: https://jsonplaceholder.typicode.com/users
 *
 *  Your users should have:
 *      -id
 *      -name
 *      -username
 *      -email
 *      -website
 *
 *  You can skip address, phone and company.
 *
 *  users should also have posts[] (see main.js).
 *
 *  When printing a user, don't forget to make
 *      - href="mailto:.." for the email and
 *      - href=".." target="_blank" for the website.
 *  *******************************************************/

export default class User {
    constructor(userInfo) {
        this.id = userInfo.id;
        this.name = userInfo.name;
        this.username = userInfo.username;
        this.email = userInfo.email;
        this.website = userInfo.website;
        this.posts = [];
    }

    addPost(post) {
        this.posts.push(post);
    }
}