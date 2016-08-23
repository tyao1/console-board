# console-board
[WIP] Display all console output in real html

## Introduction

### Install
`npm i console-board --save-dev`

### Use
`import { injectRender } from 'console-board';`
And Inject it at your root component
` {injectRender()} `
Then the component will be used in development and the `console` will be patched

### API
[TODO]


## Why
Sometimes the developer console is not available to use, and logging becoming tedious.
And some logging options provide plain text output which is not joyful to work with.

## Use cases
- When the page is in a webview where no remote debugging is available 
- When developing React Native apps and turning on remote debugging is too slow
- When you are tired of the default console output

## TODO
- [x] Proxy `console` on Chrome and Safari
- [x] Maintain states
- [x] React component
- [ ] Accurate output for complex structure
- [ ] Interactive
- [ ] Persistence
- [ ] React Native component
- [ ] Plain JS component
