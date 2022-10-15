const userModel = require('../models/userModel')
const msal = require('@azure/msal-node');
const REDIRECT_URI = "http://localhost:3000/redirect";
const config = {
    auth: {
        clientId: "17aaf00e-8f5e-4075-aded-fa45d8496052",
        authority: "https://login.microsoftonline.com/common",
        clientSecret: "pRAMwo28R-XwU.b2~99RTGxQaQUN5B6V_B"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

// Create msal application object
const pca = new msal.ConfidentialClientApplication(config);

const authControls = {
    authenticate: (req, res, next) => {
        const authCodeUrlParameters = {
            scopes: ["user.read"],
            redirectUri: REDIRECT_URI,
        };
        // get url to sign user in and consent to scopes needed for application
        pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
            res.redirect(response);
        }).catch((error) => console.log(JSON.stringify(error)));
    },
    redirect: (req,res,next)=> {
        var tokenRequest = {
            code: req.query.code,
            scopes: ["user.read"],
            redirectUri: REDIRECT_URI,
        };
        
        console.log('TOKEN REQUEST: **************************************************')
        console.log(tokenRequest)

        console.log('REQUEST SESSION: **************************************************')
        console.log(req.session)
        console.log(req.session.email)
        console.log(req.session.name)
        console.log(req.session.isAdmin)

        pca.acquireTokenByCode(tokenRequest).then((response) => {
            console.log("\nResponse: \n:", response);
            req.session.email = response.account.username;
            req.session.name = response.account.name;
            // console.log(req);
            console.log(req.session.email);
            // check if user is admin. if they are, then set req.session.role = admin; else, set it as staff.
            userModel.getUserRole(req.session.email).then((response) => {
                // console.log(response);
                
                req.session.user_id = response[0].user_id // save user id
                console.log('=====================================')
                console.log(req.session.user_id);
                console.log('=====================================')
                isAdmin = response[0].role == "administrator"? true: false; 
                req.session.isAdmin = true;
                console.log("User is an admin: " + isAdmin);
                res.render('home', {admin: isAdmin});
            }).catch((err)=> {
                console.log(err);
                res.send("There was an error!");
            })
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
    },
    home: (req,res,next) => {
            console.log(req.session);
            
            res.render('home', {admin: req.session.isAdmin});
    },
    checkAuth: (req,res,next) => {
        if (req.session.email) {
            return next();
        }
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    else {
         res.redirect('/');
    }}
}
module.exports = authControls;