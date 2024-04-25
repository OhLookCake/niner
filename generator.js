
function get_options(){
    const vowel_radio = document.getElementsByName('n_vowels');
    n_vowels = 0;
    vowel_radio.forEach(button => {
        if (button.checked) {
            n_vowels = parseInt(button.value);
        }
    });

    const sort_technique = document.getElementsByName('sorting');
    technique = '';
    sort_technique.forEach(button => {
        if (button.checked) {
            technique = button.value;
        }
    });

    return [n_vowels, technique];
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

function generate_nine(n_vowels=3, technique='alpha'){
    n_total=9;
    console.log('Generating selection (' + n_total +') letters');
    console.log('n_vowels: ' + n_vowels + ' | sorting: ' + technique)


    if (n_vowels == -1){  // random
        n_vowels = Math.floor(Math.random() * 3) + 3; // choose randomly between 3,4,5
    }

    vowel_bag = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'U', 'U', 'U']
    const_bag = ['B', 'B', 'C', 'C', 'C', 'D', 'D', 'D', 'D', 'D', 'D', 'F', 'F', 'G', 'G', 'G', 'G', 'H', 'H', 'J', 'K', 'L', 'L', 'L', 'L', 'L', 'M', 'M', 'M', 'M', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'P', 'P', 'P', 'P', 'Q', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'V', 'V', 'W', 'W', 'X', 'Y', 'Z'];


    shuffle(vowel_bag);
    shuffle(const_bag);
    selected_vowels = vowel_bag.slice(0, n_vowels);
    selected_consts = const_bag.slice(0, n_total - n_vowels);
    selection = display_sort(selected_vowels, selected_consts, technique)
    return selection;
}

function display_sort(vowels, consts, technique){
    selection = vowels.concat(consts);

    if(technique=='alpha'){
        selection = vowels.concat(consts);
        selection.sort();
    }
    else if(technique=='vc'){
        selection = vowels.concat(consts);
    }
    else if(technique=='cv'){
        selection = consts.concat(vowels);
    }
    else if(technique=='random'){
        selection = vowels.concat(consts);
        shuffle(selection);
    }
    else if(technique='alternate'){
        selection = [];
        const maxLength = Math.max(vowels.length, consts.length);
        for (let i = 0; i < maxLength; i++) {
            if (i < consts.length) {
                selection.push(consts[i]);
            }
            if (i < vowels.length) {
                selection.push(vowels[i]);
            }
        }
    
    }
    return selection;
}

function show_selection(selection){
    const rack = document.getElementById('rack');
    rack.innerHTML = selection;
}

function select_and_show(){
    [n_vowels, technique] = get_options();
    console.log('Options\n n_vowels: ' + n_vowels + ' | sorting: ' + technique)
    selection = generate_nine(n_vowels, technique);
    console.log(selection)
    show_selection(selection.join("")); 
    document.getElementById("solve").focus();
}


function main(){
    select_and_show();
    // Add listeners
    const generate_button = document.getElementById('generate');
    generate_button.addEventListener('click', select_and_show);  
}

main()

