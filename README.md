# Test Parse Server

Easily test parse server.  
Based on [parse-server-example](https://github.com/ParsePlatform/parse-server-example)

## Setup

You only need to do the setup once.

**MongoDB**

[Install Docker](https://docs.docker.com/engine/installation/) and run

    sudo docker run -p 27017:27017 --name mongodb1 -v /var/mongodb/databases/mongodb1:/data/db -d mongo --smallfiles

The path given with `-v` is mounted by Docker in the container as `/data/db`, change the first path to your choice.

**Parse Server and Dashboard**

    git clone https://github.com/samuelantonioli/test-parse-server.git
    cd test-parse-server
    npm install

Please inspect `index.js` before using it.  
Change the `masterKey`!  

If you want to use Google Mail for testing, go to [http://www.google.com/settings/security/lesssecureapps](http://www.google.com/settings/security/lesssecureapps) and change the credentials in `index.js`.

## Run

    # start mongodb
    sudo docker start mongodb1

    # start parse-server and dashboard
    cd test-parse-server
    npm start

    # go to http://localhost:1337/dashboard
    # username: admin, password: admin

    # exit:
    # ctrl-c in terminal to stop parse-server
    sudo docker stop mongodb1

Shows the following output:

    parse-server-example running on port 1337

    Parse.initialize('3o2vrnj2o438r2n3o8to23vur832', 'unused');
    Parse.serverURL = 'http://localhost:1337/parse';

    http://localhost:1337/parse
    http://localhost:1337/dashboard
