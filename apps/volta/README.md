# VOLTA UI

This is the micro frontend app for the volta service.

## Usage

### load via script tag

```js
<script
  defer
  src="https://cdn.juno.qa-de-1.cloud.sap/widget-loader/latest/app.js"
  data-name="volta"
  data-version="latest"
  data-props-appHeight="full"
  data-props-endpoint="https://the_volta_api_url/api/v1"
  data-props-issuerURL="https://accounts_url/"
  data-props-clientID="the_client_id"
></script>
```

Most of the time using `latest` as the `data-version` is what you want to do. Alternatively you can see all published versions at `https://JUNO_CDN_HOSTNAME/manifest.json`

More information about options [here](https://github.com/sapcc/juno/blob/main/apps/widget-loader/README.md)
