# Build and host your own Juno application

## Prerequisits

- node 18

## Instructions

1. Copy one of the following base apps to your own repository.

   - **template**: this application contains the basic setup and CC layout to start developing an application from scratch.
     `https://github.com/sapcc/juno/tree/main/apps/template`

   - **exampleapp**: this application contains the basic setup and CC layout to start developing an application. In addition you will find several best practice implementations (tabs, list, panel, message, etc.) to get a feeling how to use [juno-ui-components](https://ui.juno.global.cloud.sap/) and other Juno libs.
     `https://github.com/sapcc/juno/tree/main/apps/exampleapp`

2. Delete all peerDependencies.
   To be able to build a self contained app meaning all libs bundled together with the app itself and without any external dependencies you will have to remove all peerDependencies. The peerDependencies are defined in the `package.json` file and it is enough to remove the whole section with key `peerDependencies`.
   See following example of the peerDependencies section located in the package.json file:
   ```json
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
   The devDependencies are also located in the `package.json` file. Since the base app is now copied outside the Juno repository the Juno dependencies have to have a full qualified URL. Find all Juno dev dependencies by searching for the version string `"*"`. For all such dependencies replace the version string `*` with the fully qualified URL.
   Find all libs having as a version the a `*` string. E.g.:

    <!---
    use yaml instead of json to not highlight as an error using "..."
    -->

   ```yaml
   "devDependencies": {
   ...
   "juno-ui-components": "*",
   "url-state-provider": "*",
   ...
   },
   ```

   Replace the `*` with the fully qualified URL. E.g.:

    <!---
    use yaml instead of json to not highlight as an error using "..."
    -->

   ```yaml
   "devDependencies": {
   ...
   "juno-ui-components": "https://assets.juno.global.cloud.sap/libs/juno-ui-components@latest/package.tgz",
   "url-state-provider": "https://assets.juno.global.cloud.sap/libs/messages-provider@latest/package.tgz",
   ...
   },
   ```

   If you need an specific version other the `latest` please change the version in the fully qualified URL and check which versions we have available in our [overview app](https://assets.juno.global.cloud.sap/?__s=N4IghgzhCmAuEFoD2A3aAnFBLaB3EAXKLGAEYCSAdgCbQAehATADQiVgrmzQC2hIIVgAcwlaABsA8kOhjqhAGZhxMAL6qgA). E.g.: `https://assets.juno.global.cloud.sap/libs/juno-ui-components@1.2.7/package.tgz`

4. Install all dependencies.
   Run the following compand to install all needed dependencies.
   ```bash
   npm install
   ```
 
5. Start your application at least once.
   ```bash
   npm run start
   ```
6. Build the application.
   Run the following command to build the application.

   ```bash
   npm run build
   ```

   All compiled chunks will be placed under the `/build` folder.

7. Copy everything to your webserver. 
   * Copy the `/build` folder with all its contents to your webserver. 
   * Copy the following files from your `/public` folder to your webserver: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `index.html`
   * The folder from which you want to serve the app should look like this now:
      ```
      /
      - build/
         - index.js
         - App-xxxx.js
         - ...
      - index.html
      - favicon.ico
      - favicon-16x16.png
      - favicon-32x32.png
      ```
   *  Then serve `index.html`
