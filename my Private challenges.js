function descendingOrder(n){
  //...converts n to a string and splits it
 n = n.toString();
  n = n.split('');
//sorts the string in a descending order
  n.sort(function(a,b) {
        return b - a;
      });
      //converts the resulting string back to a number
      return Number(n.join(''));
}

function findEvenIndex(arr)
{
  //Code goes here!
var newArr = 0, rev = arr.reduce(function (a, b) {return a+b; }, 0);

for (var i=0; i<arr.length; i++) {
 if (i>0) newArr += arr[i-1];
 rev -= arr[i]; 
 if(newArr == rev) 
 return i;
 } return -1;
 }


 //Andela
 function isIsogram(word) {
  //rep stores the occurence of a letter in the string 'word'
var rep = (/([a-zA-Z]).*?\1/).test(word);        
  if (word == null) {
    return false;
  } else if (rep) {
    return false;
  } else if (!word || word.length === 0) {
    return false;
  }
  //if there is no letter repetition return true
  else {
    return true;
  }
};


function sumAll(arr) {
  var sum = [];
 var max= Math.max(arr[0], arr[1]);
 var min = Math.min(arr[0], arr[1]);
 for(var i=max+1; i>min; i--) {
 sum.push(i-1);
 
 }
  //return sum;
  var total = sum.reduce(function(sum, value) {
  return sum + value;
}, 0);
  return total;

}

sumAll([1, 4]);



function convertToRoman(num) {
  var ara = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var rom = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    //var box = $(this).find('[name="box"]');
    var final = '';

    for (var i = 0; i < rom.length; i++) {
      while (num >= ara[i]) {
        final += rom[i];
        num -= ara[i];
      }
    }

  
 return final;
}

convertToRoman(9);
