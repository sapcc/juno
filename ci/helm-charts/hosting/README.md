## qa-de-1

- juno -> dashboard
- exampleapp.juno -> example
- assets.juno -> assets server (qa)
- ui.juno -> storybook

## s-eu-nl-1

- juno -> dashboard
- exampleapp.juno -> exampleapp
- assets.juno -> assets server (qa)
- ui.juno -> storybook

## global

- juno -> s-eu-nl-1 -> juno
- exampleapp -> s-eu-nl-1 -> exampleapp
- assets -> anycast IP (A Record) HA Setup
- ui -> s-eu-nl-1 -> ui
