# Groupomania

## Launch Groupomania application

1. Clone this repository : https://github.com/sophieSpacee/SophieGauthier_7_28052021.git
2. With your terminal, go to Sophie_Gauthier_7_front folder 
3. Write "git submodule update --init"
4. Write "npm install"
5. Write "npm start"
6. In a new terminal window, Go to Sophie_Gauthier_7_280521 folder
8. Write "npm install"
9. Write "nodemon"
10. In the root of Sophie_Gauthier_7_280521, create a .env file <br/>

Follow this model : <br/>
DB_User="root"<br/>
DB_Password="your password"<br/>
DB_AdminEmail="admin@groupomania.com"<br/>
DB_AdminPassword="groupomania"<br/>

DB_User and DB_Password allow your application to connect to your local database <br/>
DB_AdminEmail and DB_AdminPassword will allow you to access the admin panel at this address : http://localhost:3001/admin/


Your application is now running on http://localhost:3000

## Create User

POST ```/api/users```

| Parameters   | Type |     Conditions  |    
|----------|:-------------:| ----: |
| email | body |email must be valid and unique, required| 
| password |  body |  6 min characters, required  |  
| first_name | body |required | 
| last_name | body |required | 

---

| Error Code  |      Description  |    
|----------|:-------------:|
| MISSINGFIELDS | all fields are required| 
| EMAILNOTUNIQUE |    email must be unique  |  
| PASSWORDTOOSHORT | password must be at least 6 characters | 
| EMAILNOTVALID | email must be valid | 

## Login 

POST ```/api/users/login```

| Parameters   | Type |     Conditions  |    
|----------|:-------------:| ----: |
| email | body |required| 
| password |  body |  required  |  


---

| Error Code  |      Description  |    
|----------|:-------------:|
| LOGINFAILED |login failed| 

## Modify User 

PUT ```/api/users/:id```

| Parameters   | Type |     Conditions  |    
|----------|:-------------:| ----: |
| first_name | body | optional | 
| last_name | body |optional  | 
| id | path |required  | 
| authorization | header |required  | 

---

| Error Code  |      Description  |    
|----------|:-------------:|
| UPDATEFAILED |update failed| 


## Create Gif

POST ```/api/gifs```

| Parameters   | Type |     Conditions  |    
|----------|:-------------:| ----: |
| title | body | required| 
| image |  file |  required  |  


---

| Error Code  |      Description  |    
|----------|:-------------:|
| MISSINGFIELDS | all fields are required| 
| WRONGFORMAT |    Wrong image format, must be in jpg, jpeg, png  |  


## Get all Gifs 

GET ```/api/gifs```

| Parameters   | Type |     Conditions  |    
|----------|:-------------:| ----: |
| page | query |required| 




## Delete Gif 

DELETE ```/api/gifs/:id```

| Parameters   | Type |     Conditions  |    
|----------|:-------------:| ----: |
| id | params | required | 


## Create Comment

POST ```/api/comments```

| Parameters   | Type |     Conditions  |    
|----------|:-------------:| ----: |
| content | body | required| 



---

| Error Code  |      Description  |    
|----------|:-------------:|
| EMPTYCONTENT | all fields are required| 
| WRONGFORMAT |    Wrong image format, must be in jpg, jpeg, png  |  
