// Writte by Emma and Hannah

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

function storeName() {
    localStorage.setItem("username", document.getElementById("name").innerHTML);
}