console.log("Gimme a color.")
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
  if (text === 'quit\n') {
    done();
  }
  text = parseInt(text.replace(/\n/, ""));

  // var namesNums = {
  //   'red': '0xff0000',
  //   'orange': '0xffa500',
  //   'green': '0x008000',
  //   'yellow': '0xffff00',
  //   'blue': '0x0000ff',
  //   'indigo': '0x4b0082',
  //   'violet': '0x800080'
  // }

  var namesNums = {
    'red': 0,
    'Red': 360,
    'orange': 30,
    'yellow': 60,
    'green': 120,
    'blue': 240,
    'purple': 300
  }

  // var obj = {a:1, b:2, c:3};
  //
  // for (var prop in obj) {
  //   console.log("obj." + prop + " = " + obj[prop]);
  // }

  var colors = []
  var decimalColors = []

  for (var prop in namesNums) {
    colors.push(prop)
    decimalColors.push(namesNums[prop]);
  }

  var leastDifference = Math.abs(decimalColors[0] - text);
  var matchedColor = colors[0];

  decimalColors.forEach(function(color, index){
    var currentDifference = Math.abs(color - text)
    if(currentDifference < leastDifference){
      leastDifference = currentDifference
      matchedColor = colors[index]
    }
  });

  console.log('received data:', util.inspect(text));
  console.log('Your color is ' + matchedColor);
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}
// console.log(parseInt("0xFF")); // --> 225
