# VPS deployment application

Use this project to learn how to deploy to a Digital Ocean VPS using TypeScript/NodeJS.

## Run the app locally first

Before you deploy see if you can run this application on your local machine from IntelliJ and from the terminal.

Clone the app locally: 

`git clone https://github.com/codex-academy/vps-deployment-workshop-typescript`

In the terminal run these commands

To change into the right folder

```
cd vps-deployment-workshop-typescript
```

Then setup and run the app:

```
npm install
npm start
```

See if you can access the application from the browser at `http://localhost:8081`


## VPS deployment steps

* Create a server on Digital Ocean:

    * I sent you an invitation
     * Create an `Ubuntu $4 server` (check Amsterdam & Regular SSD disk type) at a location of your choosing
    * Cloud servers are called `droplets`
    * Use password authentication
    * Rename your server to be called "YourFirstName-Server" in Digital Ocean
    * Please take a screen shot of this page - and keep it aside.
    * Login to the server using ssh
    * Login to the server using root : `ssh root@your.ip.address`
 
 * Server setup:

    * Run this command on your server: `apt update` to ensure you got all the latest packages. It will take a while.
    * install NodeJS on the server 
        * using `nvm`:
            * first install [nvm](https://github.com/nvm-sh/nvm) - `Node Version Manager`,
            * Use this command `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`,
            * after running the command the `node` will be available on your server,
            * log `in` and `out` of the server to make sure the `node` command work from the terminal,
            * then install NodeJS version 18 or higher - `nvm install 18`,
            * after this command the `node & npm` commands should be available from the terminal.
    * install `git` on the server using: `apt install git` 
        - **note** git was installed on my server by default.

* Link the server to a domain name
    * Email the IP address of your server to your mentor
    * The mentors will link your server to a domain name for you (we will be using namecheap.com).
    * `yourname.projectcodex.net`
  
* Run a NodeJS/TypeScript app on the server:

    * create an `apps` folder using `mkdir apps`
    * change into the folder using `cd apps`
    * clone the java project to the server:
        `git clone https://github.com/codex-academy/vps-deployment-workshop-typescript`
    * change into this folder: 
        `cd vps-deployment-workshop-typescript/`
    * run these maven commands:
        * `npm install`
        * `npm start`
        * At this point your app should be running at: `http://your-server-ip-address:4567`
        * See if others were able to access your application
        * Please take some screenshots of :
            * your deployed application running the browser
            * your terminal window where you are running the application from
        * stop the process running in the terminal using the ctrl-c command - you should not be able to access your application now.
  
  * To run your app in the background & to keep it running you will be using `pm2`.
  * Install `pm2` using this command:

```sh
    npm install -g pm2
```

> Be sure to be in the `vps-deployment-workshop-typescript`folder in the `apps` folder - `cd apps/vps-deployment-workshop-typescript`
    
  * Run your app with `pm2` using this command:

```sh
   pm2 run dist/index.js --name "ts-user-counter"
```

  * Use the `pm2 list` command to see if the `ts-user-counter` process is running.
  * You can stop it using the `pm2 stop` command - `pm2 stop 0` or `pm2 stop ts-user-counter` should stop it.
  * Using `pm2` your app is now running in the background. 
  * You can logout of your server using the `exit` command.
  * The app will run in the background if you disconnect from the server.
  * You should still be able to access your application at `http://your-server-ip-address:4567` and `http://yourname.projectcodex.net`.

## Screen shots & list of commands used

Please ensure you have screenshots of:

* your Server/Droplet Configuration setup in Digital Ocean,
* showing your deployed app running on your domain,
* the terminal showing your app running.

Run the `history` command to keep a list of all the commands you used during this workshop.

## Delete your server

Please delete your server/droplet in Digital Ocean.
 