## qa-de-1

- juno.qa-de-1.cloud.sap -> dashboard
- exampleapp.juno.qa-de-1.cloud.sap -> exampleapp
- assets.juno.qa-de-1.cloud.sap -> assets server (qa)
- ui.juno.qa-de-1.cloud.sap -> storybook

## s-eu-nl-1

- juno.eu-nl-1.cloud.sap -> dashboard
- exampleapp.juno.eu-nl-1.cloud.sap -> exampleapp
- ui.juno.eu-nl-1.cloud.sap -> storybook

## global

- juno -> s-eu-nl-1 -> juno
- exampleapp -> s-eu-nl-1 -> exampleapp
- assets -> anycast IP (A Record) HA Setup
- ui -> s-eu-nl-1 -> ui
