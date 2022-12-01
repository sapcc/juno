# Juno

Global Dashboard

# Development

```bash
yarn start
```

In workspaces

```
wb yarn start
```

# Usage

As widget

```js
<script
  src="https://assets.juno.global.cloud.sap/apps/widget-loader@latest/build.js"
  data-name="dashboard@latest"
  data-props-region="qa-de-1"
></script>
```

As module

```js
  <div id="root"/>
  <script type="module">
    import("https://assets.juno.global.cloud.sap/apps/dashboard@latest/build/index.js").then((app) =>
      app.mount(document.getElementById("root"))
    )
  </script>
```
