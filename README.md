# Pokemon Go clone

The goal of this project is to create a fullstack application that has the same concept as a pokemon go game.
a player looks on the map for available spawning and tries to go to their locations and capture them.

this application is created using symfony for the backend, reactjs and typescript for the frontend and mysql for the database.
it also aims to have many features such as Progressive enhancement and installability ( PWA ), Realtime communication with the backend, webmapping and 3d world using THREEJS library.

## this project is created by:
#### Amina Ghannem
#### Malek ben Senoussi
#### Mohamed Rebai
#### Skander Tebourbi
#### Yasmine Kharrat

## Note:
in order to get the full features of this project, you must have docker installed.

## Setup:
head over to the frontend directory and in the src folder insert the env.ts file which contains the google maps api key.  
run npm install.  
run npm run dev while being in the frontend directory.  
head over to the backend directory and insert the proper env file that creates the connection to the mysql database ( note you must have composer and symfony installed ).  
run composer install and create a database and a database migration, do the migration then.  
while being in the backend directory run these three commands:
symfony server:ca:install
docker-composer up
symfony server:start
All set, you should have a working version of this application.  
