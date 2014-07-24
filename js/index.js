window.onload = function() {
	// setTimeout( function() {
	// 	document.location.href = 'life.html';
	// }, 5000 );
	// resize();
}
function resize()
{
	var t = document.getElementById("title");
	var st = document.getElementById("subtitle");
	tSize = 100*(window.innerWidth/1024);
	stSize = tSize*0.2;
	t.style.fontSize = tSize.toString()+'px';
	st.style.fontSize = stSize.toString()+'px';
}

var dataJSON = {
	"timeline":
	 {
        "headline": "FIRSTTTT",
        "type": "default",
		"text": "TEXTTTT",
		"startDate": "2012,1,26",
        "date": [],
	}
}
var setPanel = {
	t: '',
	h: '',
	c: '',
	ctype: 0,  // 0:text, 1:picture, 2:text
	data: {},

	load: function() {

	},
	mode: function(type) {
		console.log("setPanel.mode:"+type)
		this.ctype = type
	},
	submit: function() {
		console.log('setPanel.submit');
		this.t = document.getElementById("set-time").value.replace(/\-/g, ',');
		this.h = document.getElementById("set-head").value;
		this.c = document.getElementById("set-content").value;
		data = {
            "startDate": this.t,
			// "endDate":"2012,1,27",
            "headline": this.h,
            "text": "",
            "asset":
            {
                "media": "",
            }
        }
        if(this.ctype == 0) data["text"] = this.c;
        else data["asset"]["media"] = this.c;
        dataJSON["timeline"]["date"].push(data);
        j = JSON.stringify(dataJSON);
        console.log(dataJSON);
        console.log(j);

        $.ajax({
            type : "POST",
            url : "json.php",
            dataType : 'json', 
            data : {
                json : j /* convert here only */
            }
        });

        // dataName = "lifezmd_"
        // var i = 0
        // while(true) {
        //     dataName = "lifezmd_" + i.toString();
        //     console.log("dataName:", dataName)
        //     localJSON = localStorage.getItem(dataName)
        //     console.log("localJSON:", localJSON)
        //     if (localJSON == null) {
        //         console.log("add new localStorage")
        //         localStorage[dataName] = j;
        //         break;
        //     }
        //     else {
        //         localData = JSON.parse(localJSON);
        //         console.log(localData["timeline"]["headline"]+", vs ,"+dataJSON["timeline"]["headline"])
        //         if(localData["timeline"]["headline"] == dataJSON["timeline"]["headline"]) {
        //             localStorage[dataName] = j;
        //             break;
        //         }
        //         else {
        //             i++;
        //         }
        //     }
        // }
	},
	cancel: function() {
        document.getElementById("set-time").value = null;
        document.getElementById("set-head").value = null;
        document.getElementById("set-content").value = null;
	}
}