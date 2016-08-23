# console-board
Display all console output in real html

[Check the demo](https://xiaobuu.github.io/console-board/demos/)

## Introduction

### Install
`npm i console-board --save-dev`

### Usage
`import { injectRender } from 'console-board';`
And Inject somewhere it at your root component
` {injectRender()} `
Then the component will be used in development and the `console` will be patched

Or

You could use `import { LogList } from 'console-board'` as you want

### Exports
`LogList` the main component which does the patch and displaying all together
- `toggleByTouch` default `false`: Instead of showing the 😂 button, tap three times in a row to display the log pannel
- `showOnInit` default `false`: show log pannel on start
- `showInput` default `false`: show an input that eval the code (type clear to clear the console board)
- `persistentKey` default `@@console`: [TODO] set the key to store the output, set it to `null` to disable persistence

`patchConsole` proxy the `console` and call your custom function before every console call
Return a proxied `console`. Used internally in LogList.

`injectRender` Helper function to render the LogList only on development 


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
- [x] Accurate output for complex structure
- [x] Interactive
- [ ] Persistence
- [ ] React Native component
- [ ] Plain JS component
