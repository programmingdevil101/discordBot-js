const { swearWords } = require('./array.json');
swearWords.forEach((item, index) => {
    console.log(`${index} - ${item}`);
})
console.log(`
apple
ball
catch\n
fall
`);