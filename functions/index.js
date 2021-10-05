const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// From:
// https://github.com/hasura/graphql-engine/blob/master/community/sample-apps/firebase-jwt/functions/index.js

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(user => {
    console.log('Firebase User:', user);
    // Check if user meets role criteria:
    // Your custom logic here: to decide what roles and other `x-hasura-*` should the user get
    let customClaims;
    if (user.email && user.email.indexOf('@hasura.io') !== -1) {
        customClaims = {
            'https://hasura.io/jwt/claims': {
                'x-hasura-default-role': 'admin',
                'x-hasura-allowed-roles': ['user', 'admin'],
                'x-hasura-user-id': user.uid
            }
        };
    }
    else {
        customClaims = {
            'https://hasura.io/jwt/claims': {
                'x-hasura-default-role': 'user',
                'x-hasura-allowed-roles': ['user'],
                'x-hasura-user-id': user.uid
            }
        };
    }
    // Set custom user claims on this newly created user.
    return admin.auth().setCustomUserClaims(user.uid, customClaims)
        .then(() => {
            // Update real-time database to notify client to force refresh.
            const metadataRef = admin.database().ref("metadata/" + user.uid);
            // Set the refresh time to the current UTC timestamp.
            // This will be captured on the client to force a token refresh.
            return metadataRef.set({ refreshTime: new Date().getTime() });
        })
        .catch(error => {
            console.log('\n\tERROR:\n', error, '\n--------');
        });
});