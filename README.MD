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
