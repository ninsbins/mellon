# Mellon

This app is a Springboot MVC Application with a MySQL server on Google Cloud Platform. The client side is in Javascript using the React framework with Bootstrap.

## Libraries

Client side:
* Axios (v0.21.4)
* Bootstrap (v4.1.3)
* React (v17.0.2)
* React Bootstrap (v1.6.3)
* React Router (v5.2.0)
* React Spotify Web Playback (v0.8.2)
* React Validation (v3.0.7)
* Material UI (v4.11.2)
* Stream Chat React (v6.10.0)
* Testing Library Jest Dom (v5.11.4)
* Testing Library React (v11.1.0)
* Testing Library User Event (v12.1.10)

Server side:
* Javax (v2.3.0)
* Java Assist (v3.23.1-GA)
* MySQL
* Spring Framework
* Spring Framework Security

## Functionalities

Users are able to:
* Sign in using their email and password.
* Sign up, by creating an account via entering their email, name, and password.
* Log out of their account.
* Edit their profile details. 
* Reset their password in the Update Profile page.
* View all other User's Profiles and see their posts.
* Search for books, movies and recipes.
* Provide their social media account details such as Spotify to search for Music and Playlists.
* Follow and unfollow other users.
* View all posts or posts of users they are following on their home feed.
* Create and publish posts containing recommendations of their liked or disliked movies, music, books, etc.
* Chat with all other Users in the Chat page.

## Running the project

### Installing client side dependencies

Navigate to the client folder and install dependencies

> `cd app && npm install`
> 
> `npm start`

> Open at [http://localhost:3000](http://localhost:3000) to view in browser.


To build for production.

> `npm run build`

> Open at [http://localhost:9000](http://localhost:9000) to view in browser.


### Booting up server

Run Springboot Application from main function in the Springboot2WebappJspApplication class.
