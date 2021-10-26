#### Setup

```terminal
npm install && npm start        //it will install all the required modules from package.json
```

#### Database Connection

1. Go to .env 
2. In MONGO_URI fill in your mongoDB cloud Username and Password

#### JWT Token

- setup your JWT_SECRET_KEY in .env     (you can type anything as key for testing purpose)


#### Routers

- user_register&login    // for registering user
- user_vaccination       // for loggin in user if already registered and allowing him to add vaccination entries

- public_api             // where entries of all the users are hosted



#### ------------------How it works----------------------------------

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token


#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User with email in the database
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- NOTE : if someone comes to know about our jwt_secret_key and forges a token, we have also provided a check for that
- Send Response with Token

#### -----------------------WHAT PROGRESS-REPORT SHOWS IN PUBLIC API---------------------------

- Total vaccination done so far i.e total of gujrat and maharashtra
- Daily vaccination shows average of vaccines administered in last 7 days  
- Weekly vaccination shows average of vaccines administered in last 4 weeks i.e 28 days
- Monthly vaccination shows average of vaccines administered in last 3 months i.e 90 days

- NOTE: If you filter the location the REPORT will show PROGRESS for the filtered location

#### Mongoose Errors

- Validation Errors
- Duplicate (Aadhaar, Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit


#### ---------------------------FOR TESTING------------------------------

- import the JSON file given in the TestingWithPostman folder in your postman app, rest is already set up
- remember to remove all the comments inside body in Postman Collection before sending requests