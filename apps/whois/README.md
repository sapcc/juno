## Usage

### load via script tag

```js
<script
  defer
  src="https://JUNO_CDN_HOSTNAME/widget-loader/VERSION/app.js"
  data-name="whois"
  data-version="MFE_VERSION"
></script>
```
Most of the time using `latest` as the `data-version` is what you want to do. Alternatively you can see all published versions at `https://JUNO_CDN_HOSTNAME/manifest.json`

Example:

```js
<script
  defer
  src="https://cdn.juno.qa-de-1.cloud.sap/widget-loader/latest/app.js"
  data-name="whois"
  data-version="latest"
></script>
```

More information about options [here](https://github.com/sapcc/juno/blob/main/apps/widget-loader/README.md)


