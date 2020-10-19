# Library Application

Library Application is simplified prototype of management system for a library. Project consists of frontend and backend part. Also mysql database dump with sample data is provided.


## Frontend
Frontend application is written in Typescript and ReactJS. It provides two view modes: Client mode and Librarian mode. Mode selection is based on user role stored in a database. Frontend uses [JWT](https://jwt.io/) for authentication, althought implementation of authentication mechanism is simplified.

### Client mode
Client mode is enabled when user has role 'client'. provides 4 different views: Search view, Favourite Books view, Borrowed view and My profile view.

#### Search view
Search view allows to browse and filter books available in the library. When user selects book entry, control panel is displayed which allows to borrow book or add it to favourites list. **Note: currently favourites list feature is not yet implemented!** User can select only books that are not borrowed.

#### Favourite Books view
This view allows to browse and filter books added to favourites list. **Note: currently favourites list feature is not yet implemented!** 

#### Borrowed view
This view allows to browse and filter borrowed books. When user selects book entry, control panel is displayed which allows to return selected book.


### Librarian mode
Librarian mode is enabled when user has role 'librarian'. It provides 2 view: Books view and Clients view. 

#### Books view
Books view allows to browse and filter all available books. There is no control panel provided for this view in librarian mode.

#### Clients view
Clients view allows to browse and filter all library clients. When client is selected, control panel is displayed which provides following function:
* Display list of books borrowed by selected user.
* Contact selected user (using mailto: link).
* Suspend selected user. **Note! Susped feature is not yet implemented!**


## Backend

Backend application uses following frameworks and libraries:
*[Express web framework](https://expressjs.com/): it provides simple RESTful API. 
*[knex framework](http://knexjs.org/): it allows to build and execute SQL queries.
*[JWT](https://jwt.io/): it is used to create and verify user tokens.


## Running Frontend application

1. Go to `lib-frontend\` directory and install all required dependencies by typing:

	`npm install`

2. Run application by typing:

	`npm run start`

## Running Backend application

1. Go to `lib-backend\` directory and install all required dependencies by typing:

	`npm install`

2. In `lib-backend\resources` folder create `jwt_secret.txt` file with random secret string that will be used by JWT to create user token.
3. Install and start mysql server. 
4. Adjust mysql connection configuration in `lib-backend\src\index.ts` line 16:
	```javascript
	const conn = knex({
    client: 'mysql',
    connection: {
        host: host_ip,
        port: port_number,
        user: user,
        password: password,
        database: database_name
    },
    debug: true
	})
	```
5. By default, backend runs on port 4000. If you want to change that, update line 14: 
	```javacript
	const port = 4000;
	```
6. Import database dump from `db_dump\lib_db.sql` to you mysql server
7. Build backend application by typing:
	
	`npm run build`
7. Run backend by typing:
	
	`npm run start`
