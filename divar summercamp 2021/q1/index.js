function reverseWords(){
    var sentence = readline();
    function revWord(word) {
        let temp = '';
        for(let i = word.length - 1 ;i >= 0; i--){
            temp += word[i]
        }    
        return temp;
    }
    let rev = sentence.split(' ').map(revWord).join(" ");

    return rev;
}

print(reverseWords())