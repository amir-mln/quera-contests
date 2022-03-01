function readInputs(){
    return readline().split(' ').map(n=> +n);
  }
  
  function findDuplicates(){
   let inputs = readInputs();
   let inputsObj = {}, answer=[];
   inputs.forEach(num => {
      if( num in inputsObj) {inputsObj[num] += 1; }else{
         inputsObj[num] = 1;
      }
   });
   answer = Object.keys(inputsObj).filter( key => {
      return  inputsObj[key] > 1
   } )
   return answer
  }
  print(findDuplicates().sort((a,b)=> a-b ).join(' '));