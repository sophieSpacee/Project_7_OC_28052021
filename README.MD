# Groupomania

## Launch Groupomania application

1. From your terminal, clone this repository :
   `git clone https://github.com/sophieSpacee/SophieGauthier_7_28052021.git`
2. With your terminal, go to SophieGauthier_7_front folder
   `cd SophieGauthier_7_280521` and then `cd SophieGauthier_7_front`
3. Type `git submodule update --init`to clone the frontend repository
4. Type `npm install`or `sudo npm install`
5. Type `npm start`
   <br/>
   You now have the front end up and running, now for the backend :
   <br/>

6. In a new terminal window, Go to SophieGauthier_7_280521 folder
7. Type `npm install` or `sudo npm install`
8. Install nodemon, `npm install nodemon`
9. Close this terminal window, you will not need it anymore
   <br/>

You are almost ready, now we need to set up the database
<br/>

11. In a third terminal, install Mysql (if you don't already have it installed), you can use this link https://dev.mysql.com/downloads/mysql/#downloads
12. Type `mysql`and choose a username and password `mysql --host=localhost --user=root --password=motdepassetopsecret`
13. Connect to mysql `mysql -h localhost -u root -p`
14. Create a new Database called Groupomania `CREATE DATABASE groupomania;`
15. Type `USE groupomania;`
16. In your editor, in the root of Sophie_Gauthier_7_280521, create a .env file <br/>

Follow this model : <br/>
DB_User="root"<br/>
DB_Password="your mysql root password"<br/>
DB_AdminEmail="admin@groupomania.com"<br/>
DB_AdminPassword="groupomania"<br/>

DB_User and DB_Password allow your application to connect to your local database, do not forget to change your username and password <br/>
DB_AdminEmail and DB_AdminPassword will allow you to access the admin panel at this address : http://localhost:3001/admin/

17. Save your .env file
18. Open a terminal in your editor and Type `nodemon server.js`

Your application is now running on http://localhost:3000

## Create User

POST `/api/users`

| Parameters | Type |                               Conditions |
| ---------- | :--: | ---------------------------------------: |
| email      | body | email must be valid and unique, required |
| password   | body |               6 min characters, required |
| first_name | body |                                 required |
| last_name  | body |                                 required |

---

| Error Code       |              Description               |
| ---------------- | :------------------------------------: |
| MISSINGFIELDS    |        all fields are required         |
| EMAILNOTUNIQUE   |          email must be unique          |
| PASSWORDTOOSHORT | password must be at least 6 characters |
| EMAILNOTVALID    |          email must be valid           |

## Login

POST `/api/users/login`

| Parameters | Type | Conditions |
| ---------- | :--: | ---------: |
| email      | body |   required |
| password   | body |   required |

---

| Error Code  | Description  |
| ----------- | :----------: |
| LOGINFAILED | login failed |

## Modify User

PUT `/api/users/:id`

| Parameters    |  Type  | Conditions |
| ------------- | :----: | ---------: |
| first_name    |  body  |   optional |
| last_name     |  body  |   optional |
| id            |  path  |   required |
| authorization | header |   required |

---

| Error Code   |  Description  |
| ------------ | :-----------: |
| UPDATEFAILED | update failed |

## Create Gif

POST `/api/gifs`

| Parameters | Type | Conditions |
| ---------- | :--: | ---------: |
| title      | body |   required |
| image      | file |   required |

---

| Error Code    |                  Description                  |
| ------------- | :-------------------------------------------: |
| MISSINGFIELDS |            all fields are required            |
| WRONGFORMAT   | Wrong image format, must be in jpg, jpeg, png |

## Get all Gifs

GET `/api/gifs`

| Parameters | Type  | Conditions |
| ---------- | :---: | ---------: |
| page       | query |   required |

## Delete Gif

DELETE `/api/gifs/:id`

| Parameters |  Type  | Conditions |
| ---------- | :----: | ---------: |
| id         | params |   required |

## Create Comment

POST `/api/comments`

| Parameters | Type | Conditions |
| ---------- | :--: | ---------: |
| content    | body |   required |

---

| Error Code   |                  Description                  |
| ------------ | :-------------------------------------------: |
| EMPTYCONTENT |            all fields are required            |
| WRONGFORMAT  | Wrong image format, must be in jpg, jpeg, png |
