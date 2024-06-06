## Getting Started

You should first clone the repository on your local machine and install the dependencies:

```
$ npm i
```

Then you should be able to start the application:

```
$ npm run dev
```

Application should be running and you should be able to load it using your browser pointing to http://localhost:3000.


## Instruction for execution automated tests

```
$ npx playwright test --project=chromium --workers=1
```

This command run playwright tests in chromium browser in sequential mode.
I do this because currently application crashing on login with invalid credentials test.
If we add error handling to application it will stop crashing on this error and we can run playwright tests in all browsers in parallel mode using default command: 

```
$ npx playwright test
```

## How to check test results

Please find report in folder playwright-report of current project by following path:
playwright-report/index.html