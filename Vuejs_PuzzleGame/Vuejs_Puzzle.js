window.onload = function () {
  var numbersArr = {
    numbers: []
  }
  
  for(let i=1; i<9; i++){
    numbersArr.numbers.push(i);
  }
  numbersArr.numbers[8] = undefined;
  shuffle(numbersArr);
  
  var positions = [
    [1,3],
    [0,2,4],
    [1,5],
    [0,4,6],
    [1,3,5,7],
    [2,4,8],
    [3,7],
    [4,6,8],
    [5,7]
  ];

  var app = new Vue({
		el: '#app',
		data:{
      numbers: numbersArr.numbers,
      disableClick: false
    },
    methods: {
      callme(index) {
        if(!this.disableClick) {
          for(var position of positions[index]) {
            if(this.numbers[position] == undefined) {
              // https://stackoverflow.com/questions/44800470/vue-js-updated-array-item-value-doesnt-update-in-page
              this.$set(this.numbers, position, this.numbers[index]);
              this.$set(this.numbers, index, undefined);
              if(this.checkWin()) {
                // setTimeout(()=>{
                //   alert('You Win!');
                // }, 200);
                this.disableClick = true;
              }
            }
          }
        }
      },
      checkWin() {
        // [1,2,3,4,5,6,7,8]
        for(var index = 0, number=1; index < 8, number < 9; index++, number++) {
          if(this.numbers[index] != number){
            return false;
          }
        }
        return true;
      },
      restartGame() {
        shuffle(this, true);
        this.disableClick = false;
      }
      
    }
	});
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(that, set = false) {
  var currentIndex = that.numbers.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = that.numbers[currentIndex];
    if(set) {
      that.$set(that.numbers, currentIndex,  that.numbers[randomIndex]);
      that.$set(that.numbers, randomIndex,  temporaryValue);  
    } else {
      that.numbers[currentIndex] = that.numbers[randomIndex];
      that.numbers[randomIndex] = temporaryValue;
    }
  }
  return that.numbers;
}
