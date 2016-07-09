## prompt [![Build Status](https://travis-ci.org/joegesualdo/prompt-node.svg?branch=master)](https://travis-ci.org/joegesualdo/prompt-node)
> Command line prompt.

![demo](https://raw.github.com/joegesualdo/prompt-node/master/demo.gif)

## Highlights

- Supports validation
- Hides password

## Install
```
$ npm install --save @joegesualdo/prompt-node
```

## Usage
```javascript
import prompt from '@joegesualdo/prompt-node'

new Prompt('Are you tired?')
.on('done', answer => {
  console.log(`You've answered '${answer}'`)
})
.begin()
```

## Test
```
$ npm test
```
## API
### `Prompt(text, [options])`
> Instantiates a new prompt

#### Params
| Name |   Type  | Default |   Description    |
|------|---------|---------|------------------|
| text | `Array` |   ` `   | Test description |

#### Options
| Name       | Type       | Default              | Description                   |
|------------|------------|----------------------|-------------------------------|
| hidden     | `Boolean`  | `false`              | Should answer be hidden?      |
| required   | `Boolean`  | `false`              | Does it accept empty answers? |
| validation | `Function` | `() => {return true}`| Test if answer is valid       |

Returns: `prompt`

```javascript
import prompt from '@joegesualdo/prompt-node'

new Prompt('Are you tired?', {
  required: true,
  hidden: true,
  validation: (answer) => {
    return answer === 'woo';
  }
})
```

### `prompt.begin()`
> Starts the prompt

```javascript
import prompt from '@joegesualdo/prompt-node'

new Prompt('Are you tired?')
.on('done', answer => {
  console.log(`You've answered '${answer}'`)
})
.begin()
```

### `prompt.on(type, fn)`
> Sets lifecycle methods

#### Params
| Name |   Type     | Default |   Description      | Possible values |
|------|------------|---------|--------------------|-----------------|
| type | `String`   |  `N/A`  | The lifecycle name | `backspace`, `keypress`, `validationError`, `change`, `done` |
| fn   | `Function` |  `N/A`  | Function to run    | `N/A`|

```javascript
import prompt from '@joegesualdo/prompt-node'

new Prompt('Are you tired?')
.on('validationError', answer => {
})
.on('backspace', () => {
})
.on('change', (oldStr, newStr ) => {
})
.on('done', answer => {
  console.log(`You've answered '${answer}'`)
})
.begin()
```

## Build
```
$ npm run build
```

## License
MIT © [Joe Gesualdo]()
