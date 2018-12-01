var cons = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'y',
    'z'
]

var vow = [
    'a',
    'e',
    'i',
    'o',
    'u'
]


function randWordGen() {
    var randNumC = Math.floor(Math.random() * (cons.length));
    var randNumCo = Math.floor(Math.random() * (cons.length));
    var randNumV = Math.floor(Math.random() * (vow.length));
    var word = cons[randNumC] + vow[randNumV] + cons[randNumCo];

    if (word == "yuh" || word == "sin" || word == "wet" || word == "fuk" || word == "fuc" || word == "fuq" || word == "coq" || word == "coc" || word == "cok" || word == "koq" || word == "koc" || word == "kok" || word == "dik" || word == "dic" || word == "diq" || word == "cum" || word == "god" || word == "giz" || word == "jiz" || word == "sex") {
        var a;
        var b;
        var c;

        a = Math.floor(Math.random() * (cons.length));
        b = Math.floor(Math.random() * (cons.length));
        c = Math.floor(Math.random() * (vow.length));

        word = cons[a] + vow[c] + cons[b];
    }

    document.getElementById('name').innerHTML = ("Your Username: " + word).toUpperCase();
}

// function gameTopics() {
//     var numPhrase = Math.floor(Math.random() * (topics.length));
//     var phrase = topics[numPhrase];

//     return phrase;
// }

// function checkGames() {
//     var checkbox = document.getElementById("games");
//     if (checkbox.checked) {
//         console.log("plz");
//         localStorage.setItem("games", gameTopics());
//     } else {
//         localStorage.setItem("games", "");
//     }
// }

// function musicTopics() {
//     var numPhrase = Math.floor(Math.random() * (topics1.length));
//     var phrase = topics1[numPhrase];

//     document.getElementById('text1').innerHTML = phrase;

// }

// function checkMusic() {
//     var checkbox = document.getElementById('music');
//     var text = document.getElementById("text1")

//     if (checkbox.checked == true) {
//         text.style.display = "block";
//     } else {
//         text.style.display = "none";
//     }

//     musicTopics();

// }

// function TvTopics() {
//     var numPhrase = Math.floor(Math.random() * (topics2.length));
//     var phrase = topics2[numPhrase];

//     document.getElementById('text2').innerHTML = phrase;
// }

// function checkTv() {
//     var checkbox = document.getElementById('tv');
//     var text = document.getElementById("text2")

//     if (checkbox.checked == true) {
//         text.style.display = "block";
//     } else {
//         text.style.display = "none";
//     }
//     TvTopics();
// }

// function movieTopics() {
//     var numPhrase = Math.floor(Math.random() * (topics2.length));
//     var phrase = topics2[numPhrase];

//     document.getElementById('text3').innerHTML = phrase;
// }

// function checkMovie() {
//     var checkbox = document.getElementById('tv');
//     var text = document.getElementById("text3")
//     if (checkbox.checked == true) {
//         text.style.display = "block";
//     } else {
//         text.style.display = "none";
//     }

//     movieTopics();
// }

function storeName() {
    localStorage.setItem("username", document.getElementById("name").innerHTML);
}