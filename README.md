# GHUsers

<p align="center" margin-bottom="0">
    <img alt="GHUsers" width="280" height="auto" src="./.github/users.png">
    <img alt="GHUsers" width="280" height="auto" src="./.github/user-profile.png">
        <img alt="GHUsers" width="280" height="auto" src="./.github/repos.png">
</p>

## About The Project

This app allow you search through GiHhub users and see their prfile's detail and repos

### Built With

* [React Native](https://reactnative.dev/)
* [React Navigation](https://reactnavigation.org/)
* [Redux](https://redux.js.org/) 
* [Thunk](https://github.com/reduxjs/redux-thunk)
* [UI Kitten](https://akveo.github.io/react-native-ui-kitten/)
* [axios](https://github.com/axios/axios)
* [GitHub Api v3](https://developer.github.com/v3/)
* [parse-link-header](https://github.com/thlorenz/parse-link-header)
* [FastImage](https://github.com/DylanVann/react-native-fast-image)
* [react-native-offline](https://github.com/rgommezz/react-native-offline)


## Getting Started


### Prerequisites

* [yarn](https://yarnpkg.com/lang/en/docs/install/)
* [react-native requirements](https://reactnative.dev/docs/getting-started)

### Installation

##### Install project dependencies
```sh
yarn --frozen-lockfile
```


## Usage

##### iOS
```sh
npx react-native run-ios
```
##### Android
```sh
npx react-native run-android
```

## Issues with the iOS simulator

There is a [known](http://openradar.appspot.com/14585459) [issue](http://www.openradar.appspot.com/29913522) with the iOS Simulator which causes it to not receive network change notifications correctly when the host machine disconnects and then connects to Wifi. If you are having issues with iOS then please test on an actual device.