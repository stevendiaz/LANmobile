
# TexasLAN Mobile App

This is the TexasLAN mobile application.

## Setup development environment

## Prerequisites

1. Verify NodeJS 8.2+ is installed on your computer. If its not, go to [NodeJS site](https://nodejs.org/en/) and install it following given steps.
2. Install yarn library. To do that, run:
    ```javascript
     sudo npm install -g yarn
    ```
3. Go to [Expo Official Site](https://expo.io/tools) and install runtime for your OS.
3. Install the Expo CLI
```bash
  yarn global add exp
```
4. Install [Expo App]() is installed on your phone (available on [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) and [iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8))
5. Install a simulator on your machine (i.e. XCode) if you want to run the application locally.
6. Run the [TexasLAN Backend](https://github.com/TexasLAN/texaslan.org) (now just one step with `docker-compose up`!)


## Setup application

1. Clone this repo
2. Go to project root folder and run
    ```javascript
     yarn install
    ```
3. Execute one of the following commands to setup internal app config file (this file constains things like the endpoints for the different environments -local, dev, staging, prod-)
    ```javascript
     yarn build-<ENVIRONMENT>
    ```
    (in example: yarn build-local)

    *ENVIRONMENT: local | dev | staging | prod
4. To start application, run
    ```bash
     exp start -c
    ```


