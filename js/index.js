window.onload = function() {
	initTitle();
}

function initTitle() {
    var st = document.getElementById("subtitle");
    tSize = 100*(window.innerWidth/1024);
    stSize = tSize*0.2;
    // t.style.fontSize = tSize.toString()+'px';
    st.style.fontSize = stSize.toString()+'px';
}

function resize() {
	initTitle();
}

function goSetting() {
    console.log("goSetting")
    // document.getElementById("subtitle").className = '.animated .fadeOut';
    document.body.className = 'animated fadeOut';
    setTimeout( function() {
        document.location.href = 'setting.html';
    }, 3000 );
}
