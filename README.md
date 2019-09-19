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

### Verify Startup Configs:
verify the configs in `config/default.json` file and if any change required, create/edit your environment config file with desired config values.
- Make sure in config `projectRoot` is set to correct path.
- Make sure `database.host` and `database.dbName` is set to `localhost` and `mesmer-dev` respectively.
- In config make sure `storage.contentBucketName` is set to `mesmer-static-content` and `storage.logsBucketName` is set to `mesmer-execution-logs`.
- Make sure you have `minio` set as `storage.defaultProvider`.
- Make sure in config `storage.minio.baseUrl` & `storage.minio.delivery.baseUrl` is set to address of correct server.
- Copy and paste your access key id & secret in config file to `storage.minio.accessKeyId` & `storage.minio.secretAccessKey` respectively.
- This is a sample for `appsight-server-api` configurations for local machine.

```bash
{
  "projectRoot": "/Users/mesmer/mesmer/appsight-server-api",
  "host": "localhost",
  "database": {
    "host": "localhost",
    "dbName": "mesmer-dev"
  },
  "debug": false,
  "appName": "Mesmer",
  "port": 3000,
  "storage": {
    "contentBucketName": "mesmer-static-content",
    "pathPrefix": "mesmer-dev",
    "logsBucketName": "mesmer-execution-logs",
    "defaultProvider": "minio",
    "providers": {
      "minio": {
        "baseUrl": "http://127.0.0.1:9000",
        "accessKeyId": "MBJPPD6U1UBOSDA4NYX2",
        "secretAccessKey": "ByEcldoFqVSwvaohbariV1KaxF0Ra0Gm0Vd4tMIR",
        "s3ForcePathStyle": true,
        "signatureVersion": "v4",
        "delivery": {
          "baseUrl": "http://127.0.0.1:9000",
	        "scriptsUrl": "http://127.0.0.1:9000",
          "appendBucketName": true
        }
      }
    }
  }
}

```


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

- There are following sample configurations for `ios/android` `record/replay` nodes.

#### android-record

```bash
{
  "projectRoot": "/Users/mesmer/mesmer/appsight-node-localhost",
  "label": "localhost Record Node",
  "host": "localhost",
  "port": 3200,
  "customer": "user1",
  "forExecution": false,
  "remoteServer": {
    "protocol": "http",
    "host": "localhost",
    "port": "3000"
  },
  "storage": {
      "defaultProvider": "minio",
      "pathPrefix": "localhost",
      "logsBucketName": "mesmer-execution-logs",
      "providers": {
        "aws": {
          "delivery": {
            "baseUrl": "https://d1prw00zxlkwmw.cloudfront.net",
            "appendBucketName": false,
            "signing": {
              "enableSignedCookies": "false",
              "nonSignedPathPattern": "public/",
              "keyPairId": "APKAJBRFRY3Q6DVU7ELA",
              "privateKeyFilePath": "cf-private-key.pem"
            }
          }
        },
        "minio": {
          "baseUrl": "http://127.0.0.1:9000",
          "accessKeyId": "MBJPPD6U1UBOSDA4NYX2",
          "secretAccessKey": "ByEcldoFqVSwvaohbariV1KaxF0Ra0Gm0Vd4tMIR",
          "s3ForcePathStyle": true,
          "signatureVersion": "v4",
          "delivery": {
            "baseUrl": "http://127.0.0.1:9000",
            "appendBucketName": true
          }
        }
      }
    },
  "execution": {
    "nodePath": "/usr/local/bin/node",
    "appiumPath": "/usr/local/lib/node_modules/appium/build/lib/main.js",
    "adbPath": "/Users/mesmer/Library/Android/sdk/platform-tools/adb",
    "buildToolsPath": "/Users/mesmer/Library/Android/sdk/build-tools/29.0.0"
  },
  "recording": {
    "minitouchPort": 1211,
    "minicapPort": 1413,
    "uiaPort": 19308,
    "port": 19308
  },
  "provisionableDevices": [ "emulator-5554" ],
  "emulatorConsoleAuthToken": "authToken"
}

```


#### android-replay

```bash
{
  "projectRoot": "/Users/mesmer/mesmer/appsight-node-localhost",
  "protocol": "http",
  "host": "localhost",
  "label": "localhost Android Replay Node",
  "customer": "user1",
  "forExecution": true,
  "port": 3500,
  "remoteServer": {
    "protocol": "http",
    "host": "localhost",
    "port": "3000"
  },
  "platforms": [ "android" ],
  "execution": {
    "nodePath": "/usr/local/bin/node",
    "appiumPath": "/usr/local/lib/node_modules/appium/build/lib/main.js",
    "adbPath": "/Users/mesmer/Library/Android/sdk/platform-tools/adb",
    "buildToolsPath": "/Users/mesmer/Library/Android/sdk/build-tools/29.0.0",
    "anacondaEnvName": "py35cv",
    "anacondaActivatePath": "activate",
    "pythonPath": "python2"
  },
  "storage": {
      "defaultProvider": "minio",
      "pathPrefix": "localhost",
      "logsBucketName": "mesmer-execution-logs",
      "providers": {
        "aws": {
          "delivery": {
            "baseUrl": "https://d1prw00zxlkwmw.cloudfront.net",
            "appendBucketName": false,
            "signing": {
              "enableSignedCookies": "false",
              "nonSignedPathPattern": "public/",
              "keyPairId": "APKAJBRFRY3Q6DVU7ELA",
              "privateKeyFilePath": "cf-private-key.pem"
            }
          }
        },
        "minio": {
          "baseUrl": "http://127.0.0.1:9000",
          "accessKeyId": "MBJPPD6U1UBOSDA4NYX2",
          "secretAccessKey": "ByEcldoFqVSwvaohbariV1KaxF0Ra0Gm0Vd4tMIR",
          "s3ForcePathStyle": true,
          "signatureVersion": "v4",
          "delivery": {
            "baseUrl": "http://127.0.0.1:9000",
            "appendBucketName": true
          }
        }
      }
    },
  "minitouchPort": 1411,
  "minicapPort": 1613,
  "uiaPort": 9108,
  "appiumPort": 4723,
  "wdaPort": 8100,
  "provisionableDevices": [ "emulator-5556", "emulator-5558" ],
  "emulatorConsoleAuthToken": "authToken"
}

```

#### ios-record

```bash
{
  "projectRoot": "/Users/mesmer/mesmer/appsight-node-localhost",
  "label": "localhost Record Node",
  "host": "localhost",
  "port": 3800,
  "customer": "user1",
  "forExecution": false,
  "platforms": [ "ios" ],
  "remoteServer": {
    "protocol": "http",
    "host": "localhost",
    "port": "3000"
  },
  "storage": {
      "defaultProvider": "minio",
      "pathPrefix": "localhost",
      "logsBucketName": "mesmer-execution-logs",
      "providers": {
        "aws": {
          "delivery": {
            "baseUrl": "https://d1prw00zxlkwmw.cloudfront.net",
            "appendBucketName": false,
            "signing": {
              "enableSignedCookies": "false",
              "nonSignedPathPattern": "public/",
              "keyPairId": "APKAJBRFRY3Q6DVU7ELA",
              "privateKeyFilePath": "cf-private-key.pem"
            }
          }
        },
        "minio": {
          "baseUrl": "http://127.0.0.1:9000",
          "accessKeyId": "MBJPPD6U1UBOSDA4NYX2",
          "secretAccessKey": "ByEcldoFqVSwvaohbariV1KaxF0Ra0Gm0Vd4tMIR",
          "s3ForcePathStyle": true,
          "signatureVersion": "v4",
          "delivery": {
            "baseUrl": "http://127.0.0.1:9000",
            "appendBucketName": true
          }
        }
      }
    },
  "execution": {
    "nodePath": "/usr/local/bin/node",
    "appiumPath": "/usr/local/lib/node_modules/appium/build/lib/main.js",
    "xcrunPath":"/usr/bin/xcrun",
    "fbsimctlPath":"/Users/mesmer/mesmer/appsight-node-localhost/fbsimctl/bin/fbsimctl",
    "anacondaEnvName":"py35cv",
    "anacondaActivatePath":"activate",
    "pythonPath": "python2",
    "customWDAPath": "/Users/mesmer/mesmer/appsight-node-localhost/execution_engine/mesmer-execution-wda"
  },
  "iosrecording": {
    "fbsimctlPort": 9876,
    "wdaPort": 8003,
    "WDAPort": 8003
  },
  "provisionableDevices": [ "6AA793AC-5A6D-4DB3-82F8-CFFD446AB100", "39867A79-084F-48B8-80E2-9CF2B1B16F55" ]
}

```

#### ios-replay

```bash
{
  "projectRoot": "/Users/mesmer/mesmer/appsight-node-localhost",
  "label": "localhost Execution Node",
  "host": "localhost",
  "port": 4100,
  "customer": "user1",
  "forExecution": true,
  "platforms": [ "ios" ],
  "remoteServer": {
    "protocol": "http",
    "host": "localhost",
    "port": "3000"
  },
  "storage": {
      "defaultProvider": "minio",
      "pathPrefix": "localhost",
      "logsBucketName": "mesmer-execution-logs",
      "providers": {
        "aws": {
          "delivery": {
            "baseUrl": "https://d1prw00zxlkwmw.cloudfront.net",
            "appendBucketName": false,
            "signing": {
              "enableSignedCookies": "false",
              "nonSignedPathPattern": "public/",
              "keyPairId": "APKAJBRFRY3Q6DVU7ELA",
              "privateKeyFilePath": "cf-private-key.pem"
            }
          }
        },
        "minio": {
          "baseUrl": "http://127.0.0.1:9000",
          "accessKeyId": "MBJPPD6U1UBOSDA4NYX2",
          "secretAccessKey": "ByEcldoFqVSwvaohbariV1KaxF0Ra0Gm0Vd4tMIR",
          "s3ForcePathStyle": true,
          "signatureVersion": "v4",
          "delivery": {
            "baseUrl": "http://127.0.0.1:9000",
            "appendBucketName": true
          }
        }
      }
    },
  "execution": {
    "nodePath": "/usr/local/bin/node",
    "appiumPath": "/usr/local/lib/node_modules/appium/build/lib/main.js",
    "xcrunPath":"/usr/bin/xcrun",
    "fbsimctlPath":"/Users/mesmer/mesmer/appsight-node-localhost/fbsimctl/bin/fbsimctl",
    "anacondaEnvName":"py35cv",
    "anacondaActivatePath":"activate",
    "pythonPath": "python2",
    "customWDAPath": "/Users/mesmer/mesmer/appsight-node-localhost/execution_engine/mesmer-execution-wda"
  },
  "appiumPort": 8123,
  "fbsimctlPort": 10076,
  "wdaPort": 11100,
  "WDAPort": 11100,
  "provisionableDevices": [ "EC609DF8-E6C0-4BC8-A141-1DD8F99F3E4B" ]
}

```


### Start Server

start the server

```sh
$ node server.js --NODE_ENV=<yourconfigfilename>
```

> if no config is provided, `default.json` will be used

