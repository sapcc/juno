# Build and host your own Juno application

## Prerequisits

- node 18

## Instructions

1. Copy one of the following base apps to your own repository.

   - **template**: this application contains the basic setup and CC layout to start developing an application from the scratch.
     `https://github.com/sapcc/juno/tree/main/apps/template`

   - **exampleapp**: this application contains also the basic setup and CC layout to start developing an application but you will find several working implementations (tabs, list, panel, message, etc.) to get a feeling how to use the [juno-ui-components](https://ui.juno.global.cloud.sap/) and other Juno libs.
     `https://github.com/sapcc/juno/tree/main/apps/exampleapp`

2. Delete all peerDependencies.
   To be able to build a self contained app meaning all libs bundled together with the app itself and without any external dependencies you will have to remove all peerDependencies. Tee peerDependencies are defined in the `package.json` file and it is enaugh to remove the whole section with key `peerDependencies`.
   See following example of the peerDependencies section located in the package.json file:
   ```json5
     "peerDependencies": {
     "@tanstack/react-query": "^4.28.0",
     "juno-ui-components": "*",
     "luxon": "^2.3.0",
     "prop-types": "^15.8.1",
     "react": "^18.2.0",
     "react-dom": "^18.2.0",
     "url-state-provider": "*",
     "zustand": "^4.1.1"
   },
   ```
3. Replace the versioning of all Juno devDependencies
   The devDependencies are located also in the `package.json` file. Since the base app is now copied outside the Juno repository the Juno dependencies have to have a full qualified URL. Replace for all Juno devDependencies the version string `*` with the fully qualified URL.
   Find all libs having as a version the a `*` string. Ex:

   ```json5
   "devDependencies": {
   ...
   "juno-ui-components": "*",
   "url-state-provider": "*",
   ...
   },
   ```

   Exchange the `*` for the fully qualified URL. Ex:

   ```json5
   "devDependencies": {
   ...
   "juno-ui-components": "https://assets.juno.global.cloud.sap/libs/juno-ui-components@latest/package.tgz",
   "url-state-provider": "https://assets.juno.global.cloud.sap/libs/messages-provider@latest/package.tgz",
   ...
   },
   ```

   If you need an expecific version other the `latest` please change the version in the fully qualified URL and check which versions we have available in our [overview app](https://assets.juno.global.cloud.sap/?__s=N4IghgzhCmAuEFoD2A3aAnFBLaB3EAXKLGAEYCSAdgCbQAehATADQiVgrmzQC2hIIVgAcwlaABsA8kOhjqhAGZhxMAL6qgA). Ex: `https://assets.juno.global.cloud.sap/libs/juno-ui-components@1.2.7/package.tgz`

4. Install all dependencies.
   Run following compand to install all needed dependencies.
   ```bash
   npm install
   ```
5. Build the application.
   Run following command to build the application.

   ```bash
   npm run build
   ```

   All compiled chuncks will be placed under `public/build` folder.

6. Copy the content of the public folder to your webserver and serve the `index.html`
