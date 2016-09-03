var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

var port = 1337;

var server = {
    appName: 'Test Parse App',
    appId: '3o2vrnj2o438r2n3o8to23vur832',
    // Keep this key secret!
    masterKey: '832urc82o3ro283vnurozfcib7f4kcbrchei7seacz9fr21aolschrg3987rf',
    // Don't forget to change to https if needed
    serverURL: 'http://localhost:1337/parse'
};

var path = require('path');

var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/testparseserver', // Connection string for your MongoDB database
    cloud: path.join(__dirname, 'cloud', 'main.js'), // Absolute path to your Cloud Code
    appId: server.appId,
    appName: server.appName,
    masterKey: server.masterKey,
    // optional:
    // javascriptKey: 'vo8feiaoonaidfvifavgrdaifvjn',
    serverURL: server.serverURL,
    // configuration
    allowClientClassCreation: true, // only during development
    enableAnonymousUsers: true,
    //sessionLength: seconds valid
    verifyUserEmails: true,
    emailVerifyTokenValidityDuration: 86400*7, // 7 days
    preventLoginWithUnverifiedEmail: true,
    publicServerURL: server.serverURL,
    emailAdapter: {
        // only for testing
        // Go to http://www.google.com/settings/security/lesssecureapps
        module: 'parse-server-nodemailer-adapter',
        options: {
            fromAddress: 'yourmailaddress@gmail.com',
            transportURI: 'smtps://yourmailaddress%40gmail.com:yourpasswordhere@smtp.gmail.com'
        }
    },
    filesAdapter: {
        module: 'parse-server-fs-store-adapter'
    },
    /*
    liveQuery: {
        // Only allow query subs for those classes:
        classNames: ['Articles']
    }
    */
});

var ParseDashboard = require('parse-dashboard');

// https://github.com/ParsePlatform/parse-dashboard
var dashboard = new ParseDashboard({
    'apps': [
        {
            'serverURL': server.serverURL,
            'appId': server.appId,
            'masterKey': server.masterKey,
            'appName': server.appName
        }
    ],
    'users': [
        {
            'user': 'admin',
            'pass': 'admin',
            'apps': [{appId: server.appId}]
        }
    ]
});

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.listen(port, function() {
    console.log('parse-server-example running on port '+port);
    console.log('');
    console.log('Parse.initialize(\''+server.appId+'\', \'unused\');');
    console.log('Parse.serverURL = \''+server.serverURL+'\';');
    console.log('');
    console.log(server.serverURL);
    console.log(server.serverURL.replace('/parse', '/dashboard'));
});
