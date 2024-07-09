Firebase Firestore Tests
========================

This repository contains sample functions for adding a name document that also has a trigger for incremental_id 
Jest test cases  are added for testing Firestore operations using Firebase Admin SDK.

Table of Contents
-----------------

*   Setup
*   Testing Firestore Operations
*   Contributing
*   License


Setup
-----

To run the tests locally or integrate them into your CI/CD pipeline, follow these steps:

1.  **Clone the repository:**
    
    `git clone https://github.com/JvPy/firebase-firestore-tests.git cd firebase-firestore-tests`
    
2.  **Install dependencies:**
    
    Make sure you have Node.js version 18 and npm installed (for a better experience, use [NVM](https://github.com/nvm-sh/nvm)). Then, install dependencies on both the main forld and function folder using:
    
    `npm install`
    
3.  **Running emulator locally**
    
    Make sure you have `firebase-tools` installed globaly and Java 

    - use `npm i -g firebase-tools` to install firebase-tools globally
    - use `sudo apt install default-jre`to install Java runtime envirement globally (linux)
    - init or reuse a firebase project and replace its id on `.firebasers`

    Run `npm run serve`

    On your browser, go to `http://127.0.0.1:5001` to access the firestore emalator page

    Use the following curl for testins
    ```
    curl --location 'http://127.0.0.1:5001/<ProjectNameHere>/us-central1/addName' \
        --header 'Content-Type: application/json' \
        --data '{
            "name": "Desired name here!"
        }'
    ```

    
4.  **Run tests:**
    
    Execute Jest to run the test suite:
    
    `npm test`
    
    This command will run all the Jest test cases located in the `__tests__` directory.
    

Testing Firestore Operations
----------------------------

The test cases included in this repository cover the following Firestore operations:

*   **Document Retrieval**: Tests to verify fetching documents from Firestore.
*   **Document Creation**: Tests to ensure creating new documents in Firestore.
*   **Document Update**: Tests to validate updating existing documents in Firestore.

The tests are organized in a way that demonstrates how to mock Firestore operations using Jest, ensuring reliable and repeatable testing of your Firestore-related code.

License
-------

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the terms of the license.