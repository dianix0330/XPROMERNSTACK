# XPRO Fintech Full Stack Developer Project

## Overview

### Scope
This project is to create ReactJS spa & API Service that will display a list of user and detail information that consists of username, first & last name, email, and contact information. Along with a User List page there needs to be a Login page that will allow existing user to login and a SignUp to create new user. User Login should also be role based. The project should have a server folder to house the user objects.

### User Interface
    • Login & SignUp page.
    • Role Based Authorization (Admin, Client, User).
        ◦ Admin: can view all users & details regards of clients.
        ◦ Client: can only view user & detail of that belong to client.
        ◦ User: can only view own detail information.
    • Create a user List/Detail page with User information drilldown 
    • Client & Admin Role based users can add new users in their List/Detail page

### API Service 
Create a service application interface that offers User Profile data to the UI application.

### Expectations: 
    • Request to /users will return a list of users
    • Request to /users?search=fred would return a list of users that contain username or first name or email LIKE fred
    • Request to /users?id={id} will return a single user that has that id
    • Request to /users/create will create new user from provide information

**Dataset Examples:**

### User Model
    • Object id
    • Username
    • First Name
    • Last Name
    • Email
    • Phone
    • Address
    • Role