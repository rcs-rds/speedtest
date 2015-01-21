function onCalculate(src, dest) {
    var isrc = document.getElementById(src),
        ides = document.getElementById(dest),
        res,
        dates = [1, 5, 10, 15, 20, 25];
    res = parseInt(isrc.value,10);
    res = (res % 6);
    ides.innerHTML = " " + dates[res];
}