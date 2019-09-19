# Mesmer Setup

Complete instructions to setup Mesmer on local machine.

## Appsight-webapp

Clone Appsight-webapp repository from dev branch
```bash
$ git clone https://github.com/app-sight/appsight-webapp.git
```
Run following commands
```bash
$ cd <path/to/appsight-webapp>
$ git pull
$ npm install
$ npm run localserve
```

## Appsight-server-api

Clone appsight-server-api repository from dev branch
```bash
$ git clone https://github.com/app-sight/appsight-server-api.git
```
Run following commands
```bash
$ cd <path/to/appsight-server-api>
$ git pull
$ npm install
$ node app.js --NODE_ENV=<your config file name>
```


## Minio Server

To start minio server run following commands
```bash
$ minio server ~/minio/data
```
- It should print access key id and secret.
- Go to minio dashboard generally: `http://localhost:9000`
- Login using credentials printed in above step.
- You can check `mesmer-execution-logs` and `mesmer-static-content` after successful login.
- In config make sure you have `minio` set as `storage.defaultProvider`.
- Make sure in config `storage.minio.baseUrl` & `storage.minio.delivery.baseUrl` is set to address of correct server.
- Copy and paste your access key id & secret in config file to `storage.minio.accessKeyId` & `storage.minio.secretAccessKey` respectively.

## Appsight-node

Clone appsight-node repository from dev branch
```bash
$ git clone https://github.com/app-sight/appsight-node.git
```


### appsight-node Setup
 

navigate to project directory

```sh
$ cd <path/to/appsight-node>
```

Run following commands
```bash
$ git pull
$ npm install
```

### Initialize Submodules and Install Dependencies

Initialize all submodules recursively and install dependencies

```bash
$ git submodule update --init --recursive
$ npm install
```

### Build Dependencies

some of the dependencies need to be built before we use them

###### 1- Build Minicap 

required for Android device/simulator live view

```sh
$ cd minicap
$ ndk-build
$ cd ..
```

###### 2- Build Minitouch 

required for android device/simulator interaction

```sh
$ cd minitouch
$ ndk-build
$ cd ..
```

###### 2- Build UIAutomator 

required for android device/simulator interaction

```sh
$ cd uiautomator-server
$ npm install
$ cd ..
```

###### 3- Build FBSimulatorControl `(iOS only)`

`fbsimctl` is required for iOS device/simulator actions and requires macOS with latest Xcode installed. Leave this step if not targeting iOS 

 ```sh
$ cd FBSimulatorControl
$ ./build.sh fbsimctl build ../fbsimctl
$ cd ..
```

###### 4- Build ios-minicap `(iOS only)`

`ios-minicap` is required for iOS device/simulator live stream and requires macOS with latest Xcode installed. Leave this step if not targeting iOS 

make sure to install `cmake` and `libjpeg-turbo(>=1.5)`

 ```sh
 $ brew install cmake libjpeg-turbo
 ```
 build `ios-minicap`

 ```sh
$ cd ios-minicap
$ ./build.sh
$ cd ..
```

###### 5- Setup Web Driver Agent(WDA) `(iOS only)`

WDA is required for iOS device/simulator interaction and requires macOS with latest Xcode installed. Leave this step if not targeting iOS

Assuming we are in appsight-node project folder, run following command in terminal

 ```sh
$ cd WDA
$ ./Scripts/build.sh
$ cd ..
```
### Verify Startup Configs

verify the configs in `config/default.json` file and if any change required, create/edit your environment config file with desired config values. 

 - verify the node IP and Port
 - verify the API server connection parameters (host, port and protocol)
 - verify the project root path
 - verify the `customer` id if node is a recording node and make sure that `forExecution` flag is `false`
 - verify the CDN host and credentials
 - if node is an execution/replay node, verify the `execution` configs and updated respective paths
 - For Android record/replay node to setup GPS coordinates, update `emulatorConsoleAuthToken` value with the token in file at `~/.emulator_console_auth_token`.
 - verify `execution` object under config if `forExecution` is `true`. Specially but not limited to these; check: `nodePath, appiumPath, adbPath, buildToolsPath, xcrunPath, fbsimctlPath, visionServiceUrl, imageCompareServiceUrl, proxyServiceUrl, domUtilityServiceUrl, visionServiceEnabled, imageCompareServiceEnabled, domServiceEnabled, proxyServiceEnabled, anacondaEnvName, anacondaActivatePath, autoHandleIOSSystemDialog, pythonPath, textClassifierEnabled, vaVisualizerEnabled, customWDAPath` 

> *please note that your config file will inherit and override the configs from `default.json`*

### Start Server

start the server

```sh
$ node server.js --NODE_ENV=<yourconfigfilename>
```

> if no config is provided, `default.json` will be used

