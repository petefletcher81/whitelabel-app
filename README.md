# whitelabel-app

This is a white label website to help build new sites

---

## Initial setup

Clone the project and give it a name
This will run a few scripts and console.log the steps along the way

in order to run this you will need a copy of the config folder as seen in the video tutorials online. There will be two files in that folder

`firebase-config.js`

`auth-config.js`

Before you run the script - be sure to update the project name within the whitelabel-script

Now run

```
node whitelabel-script
```

## Firebase setup

Once we have the project looking how we want it with an firebase within install, we now need to initialise a new project

Next you need to run cd ${PROJECT_NAME} then

```
firebase init
```

Select the following

```
Ready to proceed - y

Functions: Configure a Cloud Functions directory and its files

Please select an option: Create a new project

project id: ${PROJECT_NAME}-random number

What would you like to call your project: ${PROJECT_NAME}-random number`

Chose: `Javascript`

Do you want to use ESLint to catch probable bugs and enforce style? No

File functions/package.json already exists. Overwrite? (y/N) No

File functions/index.js already exists. Overwrite? (y/N) No

File functions/.gitignore already exists. Overwrite? (y/N) No

File functions/.gitignore all dependencies with npm now? (Y/n) Yes
```

---

## Firebase Storage Setup

Go to the firebase console and select ${PROJECT_NAME}random number`

select STORAGE and create - choose correct region `europe-west2`

Add the following to security rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
```

## Firebase Firestore setup

select FIRESTORE DATABASE and create database

Add the following to security rules

```
rules_version = '2';
service
cloud.firestore {
    match /databases/{database}/documents {
        match /content/{restOfPath=**} {
            allow read; allow write:
            if request.auth.token.admin == true
        }
    }
}
```

---

## Firebase auth setup

Select `get started` then `AUTHENTICATION` and choose `Email / password` THEN selct `ENABLE`

---

## Firebase webapp setup

**_Then we need to create the web app_**
run cd ${PROJECT_NAME} then

```
firebase apps:create
```

```
Choose 'Web'

**Firebase requires you to give the app a name - just call the same as the project**
What would you like to call your app? ${PROJECT_NAME}
```

Now run

```
firebase apps:sdkconfig
```

We use this printed object and replace the one in [firebase-config.js](functions\config\firebase-config.js) is should look something like this

```
{
  "projectId": "test-project193945881",
  "appId": "web:id",
  "storageBucket": "the-name-of-your-bucket",
  "locationId": "europe-west2",
  "apiKey": "someAPIKEY",
  "authDomain": "<projectid>.firebaseapp.com",
  "messagingSenderId": "532670527724"
};
```

---

## Populate firebase databases

To populate the databases and we first need to have an admin user. We can do this by adding an email and password within the firebase console which can be found here:

```
https://console.firebase.google.com/u/0/project/<YOUR PROJECT NAME>/authentication/users
```

Once we have a users we need to remove all the isAdmin middleware from the functions/indes.js

For example the following route looks like this

```
app.post("/set-admin", isAdmin, setAdmin);
```

and will become this

```
app.post("/set-admin", setAdmin);
```

we need to do this for each of the routes so that there are no `isAdmin` on any route. This will allow us to run the next script file to populate it.

---

### Populate Firebase Script

First we need to get the server running

```
cd functions
firebase serve
```

Now we are running on port 5000, we can run

```
cd ../client -D
```

open the `populate-firebase-project`
replace the url project name on line 125 from

http://localhost:5000/`test-project1981`/europe-west2/app/${url}

to

http://localhost:5000/`yourprojectname`/europe-west2/app/${url}

```
node populate firebase project
```

This will now populate the firestore with some dummy data to get you started

---

### Add Images To Storage

This is the last step and then you should be good to gooooo

If you are not already running it ---

```
cd functions
firebase serve
```

Next `import` the postman collection found at root here
`./Whitelabel image uploads.postman_collection.json`

Then click on the `Whitelabel image uploads` folder
You will now see some tabs - select `variables` and enter `the name of your project`
within the `initial value`.

Starting with the top request `Homepage image 1`
In the body section - `replace the image` with one on your local machine

Rinse and repeat for each request - the gallery (last) request can add 3 images at a time.

---

### Find and replace whitelabel-website

In the folder / file search in vscode - search for `whitelabel-website-7d72b` and replace
al occurences with your project name

---

### Set new origin for git hub

```
git remote rm origin
git remote add origin git@github.com:<yourusername>/<projectname>.git

```

Navigate to Github
Create a new repo on git hub with that given name

Then copy and paste these in the command line

```
git branch -M main
git push -u origin main

```

---

### Firebase deploy

Just before we deploy you will need to go to the firebase console and upgrade
the package from `free tier` to `blaze` which is a pay as you go package. This
can be done in from the bottom left corner of the console menu.

```
// navigate to the functions folder
cd functions
firebase deploy

// navigate to the client folder to deploy app
cd client
firebase deploy
```

This will deploy your functions and app

---

### Set up actions to pair with new repo and firebase project

```
cd into /client
firebase init
choose `Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`

entry chosen repo `<username>/<repo-name>`
// this will now add secrets and ask a couple of questions

Set up the workflow to run a build script before every deploy? Y

What script should be ran? npm ci and npm run build

Set up auto deployments when pr is merged? Y

What is the name of the github live channel? main

This will replace a couple of the actions set up witin .github/workflows
```

---

You should now have a fully populated backend and ready to style frontend template :)
