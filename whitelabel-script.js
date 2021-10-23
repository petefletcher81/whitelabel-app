const util = require("util");
const { copyFile } = require("fs").promises;
const exec = util.promisify(require("child_process").exec);

const PROJECT_NAME = "test-script";

const commandToRun = async (command) => {
  try {
    const { stdout, stderr } = await exec(`${command}`);
    console.log(stdout, stderr);
    return { stdout, stderr };
  } catch (error) {
    return error;
  }
};

const helperReturnValue = (value) => {
  if (value.stdout) {
    return value.stdout;
  } else {
    // if theres a nullish error
    return value.stderr;
  }
};

const copyDirectory = async () => {
  try {
    await copyFile(
      "./config/admin-config.js",
      `./${PROJECT_NAME}/functions/config/admin-config.js`
    );
    console.log("Admin file copied across");
    await copyFile(
      "./config/firebase-config.js",
      `./${PROJECT_NAME}/functions/config/firebase-config.js`
    );
    console.log("Firebase config copied across");
    return;
  } catch (error) {
    throw new Error("Files did not copy");
  }
};

const firebaseScript = async () => {
  console.log("Process Started");
  await commandToRun("cd ~ && cd Documents");
  console.log("");

  console.log("Start cloning Project");
  const cloneTemplate = await commandToRun(
    `git clone git@github.com:petefletcher81/whitelabel-app.git ${PROJECT_NAME}`
  );
  helperReturnValue(cloneTemplate);
  console.log("");

  console.log("Sync Clone and Forked Project");
  const cloneForkTemplate = await commandToRun(
    `pwd && cd ${PROJECT_NAME} && git remote add upstream git@github.com:petefletcher81/whitelabel-app.git`
  );
  helperReturnValue(cloneForkTemplate);
  console.log("");

  console.log("Sync Clone and Forked Project");
  const cloneSyncTemplate = await commandToRun(
    `pwd && cd ${PROJECT_NAME} && git pull upstream master`
  );
  helperReturnValue(cloneSyncTemplate);
  console.log("");

  console.log("Install firebase Tools");
  const firebaseTools = await commandToRun(
    `cd ${PROJECT_NAME} && npm install -g firebase-tools axios -D`
  );
  helperReturnValue(firebaseTools);
  console.log("");

  console.log("Remove old firebase json and .rc ");
  const removeOldFirebaseFiles = await commandToRun(
    `cd ${PROJECT_NAME} && rm -rf firebase.json && rm -rf .firebaserc`
  );
  helperReturnValue(removeOldFirebaseFiles);
  console.log("");

  console.log("install npm within functions");
  const createNewFiebaseProject = await commandToRun(
    `cd ${PROJECT_NAME}/functions && npm install`
  );
  helperReturnValue(createNewFiebaseProject);

  console.log("Make config directory");
  const createConfigDir = await commandToRun(
    `cd ${PROJECT_NAME}/functions && mkdir config`
  );
  helperReturnValue(createConfigDir);
  console.log("");

  console.log("Copy config files over");
  const copyConfigFiles = await copyDirectory();
  console.log("Files copied successfully");
  console.log("");

  console.log("cd into client and npm install");
  const topDir = await commandToRun(`cd ${PROJECT_NAME}/client && npm install`);
  helperReturnValue(topDir);
  console.log("");

  console.log(
    "\x1b[33m%s\x1b[0m",
    "YOU MUST BE LOGGED IN TO FIREBASE FOR THE NEXT STEPS"
  ); //yellow
  console.log(
    "\x1b[33m%s\x1b[0m",
    `***Next you need to run cd ${PROJECT_NAME} then 'firebase init'***`
  ); //yellow
  console.log("\x1b[33m%s\x1b[0m", "Select the following"); //yellow
  console.log("\x1b[33m%s\x1b[0m", "Ready to proceed - y"); //yellow
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Functions: Configure a Cloud Functions directory and its files"
  ); //yellow
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Please select an option: Create a new project"
  ); //yellow
  console.log("\x1b[33m%s\x1b[0m", `project id: ${PROJECT_NAME}-random number`); //yellow
  console.log(
    "\x1b[33m%s\x1b[0m",
    `What would you like to call your project: ${PROJECT_NAME}-random number`
  ); //yellow
  console.log("\x1b[33m%s\x1b[0m", "Javascript"); //yellow
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Do you want to use ESLint to catch probable bugs and enforce style? No"
  ); //yellow
  console.log(
    "\x1b[33m%s\x1b[0m",
    "File functions/package.json already exists. Overwrite? (y/N) No"
  ); //yellow
  console.log(
    "\x1b[33m%s\x1b[0m",
    "File functions/index.js already exists. Overwrite? (y/N) No"
  ); //yellow
  console.log(
    "\x1b[33m%s\x1b[0m",
    "File functions/.gitignore already exists. Overwrite? (y/N) No"
  ); //yellow
  console.log(
    "\x1b[33m%s\x1b[0m",
    "File functions/.gitignore all dependencies with npm now? (Y/n) Yes"
  );

  console.log("");
  console.log("");
  console.log(
    "\x1b[35m%s\x1b[0m",
    `Go to the firebase console and select ${PROJECT_NAME}random number`
  );
  console.log("");
  console.log(
    "\x1b[35m%s\x1b[0m",
    `select STORAGE and create - choose correct region EU2`
  );
  console.log("");
  console.log(
    "\x1b[35m%s\x1b[0m",
    `select FIRESTORE DATABASE and create database`
  );

  console.log("");
  console.log("\x1b[35m%s\x1b[0m", `Add the following to security rules`);

  console.log("");
  console.log(
    "\x1b[35m%s\x1b[0m",
    `
    rules_version = '2';
    service cloud.firestore {
    match /databases/{database}/documents {   
      match /content/{restOfPath=**} {
        allow read;
        allow write: if request.auth.token.admin == true
      }
    }
  }
  `
  );

  console.log("");
  console.log(
    "\x1b[35m%s\x1b[0m",
    `Select AUTHENTICATION and choose Email / password THEN selct ENABLE`
  );

  console.log("");
  console.log("\x1b[35m%s\x1b[0m", "***Then we need to create the web app***");
  console.log("");

  console.log(
    "\x1b[35m%s\x1b[0m",
    `run cd ${PROJECT_NAME} then 'firebase apps:create'`
  );
  console.log("\x1b[35m%s\x1b[0m", `Choose 'Web'`);
  console.log(
    "\x1b[35m%s\x1b[0m",
    `What would you like to call your app? ${PROJECT_NAME}`
  );
  console.log(
    "\x1b[35m%s\x1b[0m",
    `Now run 'firebase apps:sdkconfig' we use this printed object and replace the one in firebase-config.js`
  );

  console.log("");
  console.log(
    `Set up is complete - you will just need to populate the db now with data by running 'node whitelabel-popdata'`
  );
};

firebaseScript();
