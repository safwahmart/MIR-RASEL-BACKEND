# Happi Admin Panel


### Project Requirements

|  Program | Version |
|  ------  | ------ |
|   node   |  18.x  |
|   npm    |   8.x  |

## Installation Process

### Step 1

Clone this repository using this command

```sh
git clone git@gitlab.com:happibank/admin-panel.git
```

### Step 2

Go to project directory and open terminal,
```sh
cp .env.example .env
npm install --legacy-peer-deps
npm run start
```

The `npm run start` command runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.


## Testing
You can run `npm test` to launche the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Production Build
You can run `npm run build` to build the app for production. This will create a `build` folder containing generated files optimized for a production release. The application is now ready to be deployed.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Template

This project uses [Berry Dashboard](https://berrydashboard.io/). You can also checkout the [project documentation](https://codedthemes.gitbook.io/berry).

