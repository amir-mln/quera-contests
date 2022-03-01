function readArray() {
  return JSON.parse(readline());
}

function butchery() {
  //   let array = readArray();
  //   let size = +readline();
  let answer = [];

  let array = ["a", "b", "c", "d", "e"];
  let size = 5;

  //   for (let i = 0; i < array.length; i) {
  //     answer.push(array.slice(i, i + size));
  //     i += size;
  //   }

  for (let i = 0; i < array.length; i) {
    let temp = [];
    for (let j = i; j < i + size; j++) {
      temp.push(array[j]);
    }
    answer.push(temp);
    i += size;
  }
  return answer;
}

print(JSON.stringify(butchery()));
