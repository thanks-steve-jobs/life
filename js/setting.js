window.onload = function() {
    document.body.className = 'animation-1s fadeIn';
}

var tl = {
    "timeline":
    {
        "headline":"First Timeline",
        "type":"default",
        "text":"So fun",
        "startDate":"2012,1,26",
        "date": [],
    }
}

var nodeNum = 0;

var setPanel = {
    t: '',
    h: '',
    c: '',
    ctype: 0,  // 0:text, 1:picture, 2:text

    load: function() {

    },
    mode: function(type) {
        console.log("setPanel.mode:"+type);
        document.getElementById("set-content").value = null;
        var placeholder;
        if(type == 2)
            placeholder = "　iframe url here";
        else if(type == 1)
            placeholder = "　media url here";
        else
            placeholder = "　your text here"
        document.getElementById("set-content").placeholder = placeholder;
        icons = [];
        icons.push(document.getElementById("c-text"));
        icons.push(document.getElementById("c-media"));
        icons.push(document.getElementById("c-iframe"));
        for(var i=0; i<3; i++) {
            if(type==i) {
                icons[i].style.border = '3px solid #333';
            }
            else {
                icons[i].style.border = 'none';
            }
        }

        this.ctype = type;
    },
    add: function() {
        console.log("setPanel.add")
        this.t = document.getElementById("set-time").value.replace(/\-/g, ',');
        this.h = document.getElementById("set-head").value;
        this.c = document.getElementById("set-content").value;
        var data = {
            "startDate": this.t,
            // "endDate":"2012,1,27",
            "headline": this.h,
            "text": "",
            "asset":
            {
                "media": "",
            }
        }
        if(this.ctype == 1) 
            data["asset"]["media"] = this.c;
        else if(this.ctype == 2)
            data["text"] = "<iframe src='" + this.c + "'></iframe>";
        else 
            data["text"] = this.c;

        tl["timeline"]["date"].push(data);
        console.log(JSON.stringify(tl));

        nodeNum ++;
        makeDiv(this.t.split(',')[0]);
    },
    submit: function() {
        console.log('setPanel.submit');
        $.ajax({
            type : "POST",
            url : "json.php",
            dataType : 'json', 
            data : {
                json : JSON.stringify(tl), /* convert here only */
            }
        });
        balls = document.getElementsByClassName("ball");
        for(var i=0; i<balls.length; i++) {
            balls[i].className += " spin";
        }
        setTimeout( function() {
            document.body.className = 'animation-3s fadeOut';
        }, 1000 );
        setTimeout( function() {
            document.location.href = 'life.html';
        }, 4000 );
    },
    clear: function() {
        document.getElementById("set-time").value = null;
        document.getElementById("set-head").value = null;
        document.getElementById("set-content").value = null;
    }
}

var listPanel = {

}

function makeDiv(text){
    var divsize = (randNum(60,80)).toFixed();
    // var color = '#'+ Math.round(0xffffff * Math.random()).toString(16);
    var color = '#333'
    $newdiv = $('<div/>').css({
        'width':divsize+'px',
        'height':divsize+'px',
        'background-color': '#333',
        'border': '5px solid #bbb',
        'border-radius': '100%',
        'color': 'white',
        'font-size:': '20px',
        'padding-top': '15px',
        'text-align': 'center',
        'margin-left': '10%',
    });
    
    $newdiv.addClass("ball");
    $newdiv.text(text);
    // var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
    // var posy = (Math.random() * ($(document).height() - divsize)).toFixed();
    var posx = (((nodeNum-1)%8)*90).toFixed();
    var posy = (550 + Math.floor((nodeNum-1)/8)*90 - divsize).toFixed();
    
    $newdiv.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none'
    }).appendTo( 'body' ).fadeIn(1000)
    // .delay(300).fadeOut(200, function(){
    //     $(this).remove();
    //     makeDiv(); 
    // }); 
}

function randNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}