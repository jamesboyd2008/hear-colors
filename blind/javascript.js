$(function() {
  $('img').click(function(e) {
    if(!this.canvas) {
        this.canvas = $('<canvas />')[0];
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
    }

    var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
    var r = pixelData[0] / 255
    var g = pixelData[1] / 255
    var b = pixelData[2] / 255

    var maxVal = Math.max(r, g, b)
    var minVal = Math.min(r, g, b)

    var maxColor = 'r';
    var minColor = 'r';

    if(maxVal === g){
      maxColor = 'g'
    } else if (maxVal === b) {
      maxColor = 'b'
    }

    if(minVal === g){
      minColor = 'g'
    } else if (minVal === b) {
      minColor = 'b'
    }

    var hue = 'grayscale';
    var difference = maxVal - minVal

    if(difference != 0){
      if(maxColor === 'r'){
        hue = (g - b) / difference
      } else if (maxColor === 'g') {
        hue = 2 + (b - r) / difference
      } else {
        hue = 4 + (r - g) / difference
      }

      hue *= 60
      if(hue < 0){
        hue += 360
      }
      var namesNums = {
        'red, like danger': 0,
        'Red, like danger': 360,
        'orange, like the sun': 30,
        'yellow, like a smiley face': 60,
        'green, like plants': 120,
        'blue, like the ocean': 240,
        'purple, like a mystery': 300
      }

      var colors = []
      var decimalColors = []

      for (var prop in namesNums) {
        colors.push(prop)
        decimalColors.push(namesNums[prop]);
      }

      var leastDifference = Math.abs(decimalColors[0] - hue);
      var matchedColor = colors[0];

      decimalColors.forEach(function(color, index){
        var currentDifference = Math.abs(color - hue)
        if(currentDifference < leastDifference){
          leastDifference = currentDifference
          matchedColor = colors[index]
        }
      });
    } else {
      matchedColor = hue
    }

    $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3] + '<br>hue: ' + hue + '<br>color: ' + matchedColor);

    responsiveVoice.speak(matchedColor);
  });
});
