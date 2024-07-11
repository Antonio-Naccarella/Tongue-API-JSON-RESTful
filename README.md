## Tongue API

The "Tongue Api" is a web application that provides the API for imaginary company called Tongue.
Tongue wants to propose a model of rapid information accessible to all from smartphones.

### Built With

- Node.js
- Express
- MongoDB
- Mongoose
- Date-fns
- Dotenv

## Prerequisites

- Node.js, MongoDB and npm installed on your machine.

## Installation

1.  Clone the repository

    ```sh
    git clone https://github.com/Antonio-Naccarella/Tongue-API-JSON-RESTful.git

    ```

2.  Install NPM packages

    ```
    npm install
    ```

3.  Replace the mongoDB url in the connect function with your own.

    ```
    mongoose.connect(process.env.MONGODB_URI)
    ```

4.  Start application
    ```
    node app
    ```

 <!-- USAGE -->

## Usage

To use the "Tongue Api," follow these simple steps:

1.Make API requests to create, retrieve, update, or delete users, posts and interactions.

<!-- API DOCUMENTATION -->

## API Documentation

The "Tongue Api" provides the following APIs:

### Users API

- **Create a New User**

  - Endpoint: `/users/`
  - Method: `POST`
  - Description: Create a new user.
    - Request Body:
    - **name**: User's name.
    - **age**: User's age.
    - **city**: User's city.

- **Get All Users**

  - Endpoint: `/users/`
  - Method: `GET`
  - Description: Retrieve a list of all registered users.

- **Get User by ID**

  - Endpoint: `/users/:userID`
  - Method: `GET`
  - Description: Retrieve user information based on their ID.

- **Update User by ID**

  - Endpoint: `/users/:userID`
  - Method: `PATCH`
  - Description: Update user information based on their ID.
    - Request Body:
    - **name**: User's name.
    - **age**: User's age.
    - **city**: User's city.

- **Delete User by ID**
  - Endpoint: `/users/:userID`
  - Method: `DELETE`
  - Description: Delete a user based on their email.

### Posts API

- **Create a New Post**

  - Endpoint: `/posts/`
  - Method: `POST`
  - Description: Create a new post.
    - Request Body:
    - **title**: Post's title.
    - **user**: Post's user maker.

- **Get All Posts**

  - Endpoint: `/posts/`
  - Method: `GET`
  - Description: Retrieve a list of all posts.

- **Get Post by date**

  - Endpoint: `/posts/?date=2024-07-08`
  - Method: `GET`
  - Description: Retrieve interactions filtered by a specific date.

- **Get Post by ID**

  - Endpoint: `/posts/:postId`
  - Method: `GET`
  - Description: Retrieve post information based on its postId.

- **Update Post by ID**

  - Endpoint: `/posts/:postId`
  - Method: `PATCH`
  - Description: Update post information based on its postId.
  - Request Body:
    - **title**: Post's title.
    - **user**: Post's user maker.

- **Delete post by ID**
  - Endpoint: `/posts/:postId`
  - Method: `DELETE`
  - Description: Delete a post based on its postId.

### Interactions API

- **Create a New Interaction**

  - Endpoint: `/interactions/`
  - Method: `POST`
  - Description: Create a new order.
  - Request Body:
    - **type**: Could be a "like" or a "comment".
    - **post**: The post to witch the interaction refers.
    - **user**: Interaction's user maker.

- **Get All Interactions**

  - Endpoint: `/interactions/`
  - Method: `GET`
  - Description: Retrieve a list of all interactions.

- **Get All Interactions by Date**

  - Endpoint: `/interactions/?date=2024-07-08`
  - Method: `GET`
  - Description: Retrieve interactions filtered by a specific date.

- **Get All Interactions by the user's city**

  - Endpoint: `/interactions/?city=milano`
  - Method: `GET`
  - Description: Retrieve interactions filtered by a specific city.

- **Get Interactions by ID**

  - Endpoint: `/interactions/:orderId`
  - Method: `GET`
  - Description: Retrieve interactions for a specific interactionId.

- **Update interaction by ID**

  - Endpoint: `/interactions/:interactionId`
  - Method: `PATCH`
  - Description: Update an interaction based on its ID.
  - Request Body:
    - **type**: Could be a "like" or a "comment".
    - **post**: The post to witch the interaction refers.
    - **user**: Interaction's user maker.

- **Delete interaction by ID**
  - Endpoint: `/interactions/:interactionId`
  - Method: `DELETE`
  - Description: Delete an interaction based on its ID.

<!-- CONTACT -->

## Contact

Get in touch

- [Linkedin](https://www.linkedin.com/in/antonio-naccarella-31976725a/)
- E-mail: naccarellaantonio25@gmail.com
