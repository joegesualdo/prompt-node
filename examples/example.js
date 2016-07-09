let Prompt = require('./../dist').default

new Prompt('Favorite quote?', {
  // required: true,
  // hidden: true,
  // validation: (answer) => {
  //   return answer === 'woo';
  // }
})
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
