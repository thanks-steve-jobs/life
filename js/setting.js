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

var setPanel = {
    t: '',
    h: '',
    c: '',
    ctype: 0,  // 0:text, 1:picture, 2:text

    load: function() {

    },
    mode: function(type) {
        console.log("setPanel.mode:"+type)
        document.getElementById("set-content").value = null;
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
        console.log(JSON.stringify(tl))
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
        document.body.className = 'animation-3s fadeOut';
        setTimeout( function() {
            document.location.href = 'life.html';
        }, 3000 );
    },
    clear: function() {
        document.getElementById("set-time").value = null;
        document.getElementById("set-head").value = null;
        document.getElementById("set-content").value = null;
    }
}

var listPanel = {

}