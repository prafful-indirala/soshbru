# soshbru-app

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions before proceeding.

## Installation

To get started, clone the repository and install the dependencies:

- this will clean any cache, install node modules and prebuild expo

```bash
npm run reinstall
```

## Step 1: Start your Application

### For Android

```bash
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Libraries used

- zustand (state management)
- apollo-client (data fetching)
- gluestack-ui (styling framework)
- react-hook-form + yup (form management and validation)
- daysjs, lodash (helper libraries)
- eslint and prettier (code formatting)

## Debug

Clear watchman cache (in case some random issues)

```bash
watchman watch-del-all
```

### Reactotron

```bash
npm run start:reactotron
```

### expo-doctor to check for any issues

```bash
npx expo-doctor@latest
```

## TODO

-
