# Pipeline

## Base image

We use the base image to run scripts such as the as script to generate the importmap and to cache node modules. This image is created on every change in juno repo. It contains important libs like rsync and jq and npms like the jspm generator.

This image is used as the basis for creating images for individual apps and libs as well as for the assets server image.

## Asset image

The asset image uses base image to build the assets. Finally, the finished build is placed under /dist/build. You can also find package.json under /dist. package.json is used according to the **Single source of truth - policy** when building the assets server image for generating the importmap and the manifest.

| :exclamation: This is very important |
| ------------------------------------ |

- packages with missing **build** script will be ignored!
- **source** and **module** are mandatory in package.json.
- only the packages listed in **peerDependencies** are taken into account when generating the importmap.
- tests are run if the corresponding **test** script is present in package.json.

## Assets server image

Assets server image is responsible for serving app and lib builds as well as static assets. It also provides the manifest and the importmap. We use nginx as web server.

When building the image, the base image is used as the basis and the asset builds (result of the asset image) are the input.

With the help of the scripts from the base image **generate_importmap** and **generate_manifest**, the corresponding files are created and stored under the html root. The following example should clarify what the input looks like:

- /libs/juno-ui-components/
  - build/
  - package.json
- /apps/whois/
  - build/
  - package.json

Based on the example above, the following file structure is generated using the package.json files:

- /libs/juno-ui-components@1.0.0
- /libs/juno-ui-components@latest
- /apps/whois@1.0.0
- /apps/whois@latest
- /manifest.json
- /importmap.json

| :memo: | old versions are carried over from the previous image, new versions are added and latest are overwritten. |
| ------ | :-------------------------------------------------------------------------------------------------------- |

## Importmap

Importmap is generated using generator from https://jspm.org. Where internal libs like juno-ui-components are properly linked to the assets server. In addition, internal libs are linked under imports @juno. Example:

```json
{
  "imports": {
    "@juno/juno-ui-components@latest/": "https://assets.juno.global.cloud.sap/libs/juno-ui-components@latest/build/",
    "@juno/juno-ui-components@latest": "https://assets.juno.global.cloud.sap/libs/juno-ui-components@latest/build/index.js"
  },
  "scopes": {
    "https://assets.juno.global.cloud.sap/apps/whois@latest/": {
      "juno-ui-components@latest/": "https://assets.juno.global.cloud.sap/libs/juno-ui-components@latest/build/",
      "juno-ui-components@latest": "https://assets.juno.global.cloud.sap/libs/juno-ui-components@latest/build/index.js"
    }
  }
}
```

## Manifest

Manifest serves mainly as input for the widget-loader and secondarily as an overview of the available libs and apps.

It has the following structure:

```json
{
  "juno-ui-components@1.0.0": "https://assets.juno.global.cloud.sap/libs/juno-ui-components@1.0.0/build/index.js",
  "whois@latest": "https://assets.juno.global.cloud.sap/apps/whois@latest/build/index.js"
}
```
