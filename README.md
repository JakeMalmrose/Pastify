# Pastify
Definitely not spotify, or even close to it

## Description
Pastify is a full stack web application built on the following technologies:
- Node.js
- MySQL
- Svelte
- CSS
- Tailwind CSS
- HTML
- Javascript

## Features
- User authentication
- User registration
- User profiles
- User playlists
- User playlist creation
- User playlist editing
- Music search
- Music playback media controls
- Beautiful responsive design

## Team Members
Backend Team:
- Jake Malmrose
- Christian McCulley

Frontend Team:
- Dylan Martinez
- Dominick Krzysztofiak

## Installation and Usage
To be able to successfully run and install this project, you will need to have the following installed:
Node package manager (npm)
Node.js
Git

### Backend installation and team lessons
To install the required packages for the backend, You will need to do the following:
``` Open a terminal and navigate to the databse directory of the project
    Run the command npm install
    Navigate to the mainframe directory of the project
    Run the command npm install
    Run the command npm start
```
The backend is built on Node.js, running the command npm start will start a local server which the frontend will be able to communicate with through API calls.
These calls handle all of the database interactions and user authentication and handle all of the playlist information
music search and more. The backend is built on a MySQL database, running locally in conjunction with the backend server.

### Frontend installation and team lessons
To install the required packages for the frontend, You will need to do the following:
``` Open a terminal and navigate to the pastifyFrontend directory of the project
    Run the command npm install
    Run the command npm run dev
```
The front end is built on Svelte, running the command run dev will start a local server which 
can be accessed at localhost and the port specified in the terminal. Running the application in run dev mode
will allow for hot reloading of the application, meaning that any changes made to the code will be reflected live 
in the browser. While developing the front end we ended up using a UI component library known as shadcn-svelte, a port by 
huntabyte of the shadcn library for react. This library allowed us to create a beautiful and responsive UI. This library can be found at
this link: https://www.shadcn-svelte.com/ or at this github repository: https://github.com/huntabyte/shadcn-svelte

The combination of this library and tailwind css allowed us to accerlerate the development of the front end. Since we were tackling a
new framework, we wanted to make sure that we were able to get a working product out in time. This library allowed us to do just that and allowed us
through pair programming to learn the ins and outs of svelte and how to use it effectively. There are things we would have done 
different if we had more time, but we are happy with what we have so far. The challenges we faced were mainly due to the fact that we were
self teaching ourselves a new framework and had to learn how to use it effectively, additionally fragmenting the team into two groups was a challenge
as we had to make sure that the front end and back end were able to communicate effectively. We were able to overcome these challenges though through
effective communication and pair programming - additionally we were able to learn a lot about real world software development and how to work in a team, and the
importance of effective documentation.
