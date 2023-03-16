# User-activity App

This app tracks the user activity (using event listeners as per example `mousemove`) to notify per broadcast events when the user has been inactive for a default period of 1800 seconds or again active. All other apps listening to the broadcast events can react accordingly and set the application to standby or reactivate and so save resources or reduce the amount of request during the inactive period.

Please visit the section **scrip tag** to see all available **props** and their **default values**.

## Usage

### load via script tag

```js
<script
  defer
  src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build/app.js"
  data-name="user-activity"
></script>
```

### load via Importmap

```js
<script
  defer
  src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build/app.js"
  data-importmap-only="true"
></script>

<script type="module">
  import "@juno/user-activity@latest"
</script>
```

## Events

In this section will be describe the events used to notify other application.

- **USER_ACTIVITY_APP_LOADED** (broadcast): notifies automatically when the application user-activity is up and running.
- **USER_ACTIVITY_APP_LOADED** (get): use to check manually if the application user-activity is up and running.
- **USER_ACTIVITY_UPDATE_DATA** (broadcast): notifies automatically when the active state has changed. Data will be in the following form `{ isActive: true or false }`

Other apps wants to listen to this events should use the **communicator** lib. Please see the documentation of this lib by navigation to the libs section and choosing the **communicator** lib.

Following is an example how to subscribe to `USER_ACTIVITY_APP_LOADED` events using the communicator lib:

```js
watch("USER_ACTIVITY_UPDATE_DATA", (data) => {
  /* handle data */
})
```
