# Clinic appointments application

1. Functional requirements: 

	The front-end and backend communication should not cause any delay. The front end should display
	the needed information and allow the user to enter or select their infromation. The front end data 
	should be targetted and send to the backend to be stored into the user account. The user 
	should be able to access their account and view their appointment details in a specific time frame.
	The admin should have access of all the appointments made even if the appointment doesnt display 
	for patients anymore. The backend should send the user info to the database to store in the cluster.

2. Non-functional requirements

	The user should be able to select their details without any runtime errors occuring. The page should be 
	able to refresh and not cause a delay and then add the users appointment into a table. The user should be able 
	to move comfortably around in the web apllication without the website causing delays. The web application 
	should be styled accordingly and attractive to satisfy the target audience. The admin and patient should be
	able to log in accordingly depending on the user status.

## To start up application

1. Copy the web project to your local machine and open the application in vsCode.

note: Press terminal in the top left then select new terminal to open a new terminal.

2. To access back-end terminal run 'cd back-end' in a new terminal.

3. To access front-end terminal run 'cd front-end' in a new terminal.

note: It is important to install the dependencies with '--legacy-peer-deps' after typing npm i or npm install

4. To install package dependencies run 'npm install --legacy-peer-deps' in your vscode terminal in
    both the back-end and front-end terminal.

5. After dependencies have successfully installed run npm start first in back-end terminal then front-end terminal.
    Ensure that both terminals are successfully up and running.

## Secure measures 

The application is secured with helmet security and the back-end makes use hashed passwords.

## What to take  note of

### The default admin access is :

username: admin
password: admin

A new admin can still be created and is accounted for. 

### Deployment

Didn't deploy this web aplication because heroku requires payment.

### Testing the application 

Ensure that back-end and front-end is up and running before doing tests. If the test does fail
please take note of this. To access the test files please refer to the test folders in both the 
back-end and front-end directories.

## How to use the application 

### Patients

Patients can view the time schedule by simply accessing view appointments on the main page.
The patient can view appointments for 2 weeks until it expires.

### Admins 

Admins can login as admin in the main page.
On the dashboard the admin can then create new appointments for patients or edit and delete 
appointments. The appointments will appear for the admin until they decide to delete it. 
The admin can also logout if they have finished using the dashboard.