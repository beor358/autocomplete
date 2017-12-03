var AutoComplete = {};
AutoComplete = function() {
	this.field = null;
	this.wordLoopId = 0;
	this.helper = null;
	this.helperContent = "";
}
AutoComplete.prototype = {
	init: function(fieldId) {
		this.field = document.getElementById(fieldId);
		if(!this.field) {
			alert("Некорректный ввод!");
		} else {
			this.createHelper();
			this.field.onfocus = this.onFieldIn;
			this.field.onblur = this.onFieldOut;
		}
	},
	onFieldIn:function() {
		AC.loop();
	},
	onFieldOut:function() {
		clearTimeout(AC.wordLoopId);
		setTimeout("AC.hideHelper()", 600);
	},
	loop:function() {
		var list = "";
		var value = AC.field.value;
		if(value.length >= 1) {
			var numOfWords = words.length;
			for(var i=0; i<numOfWords; i++) {
				if(value.toLowerCase() == words[i].substr(0, value.length).toLowerCase()) {
					list += '<a href="javascript:AC.setWord(\'' + words[i] + '\');">' + words[i] + '</a>'
				}
			}
		}
		if(list != "") {
			if(this.helperContent != list) {
				this.helperContent = list;
				this.helper.innerHTML = this.helperContent;
			}
			this.showHelper();
		} else {
			this.hideHelper();
		}
		AC.wordLoopId = setTimeout("AC.loop()", 200);
	},
	setWord:function(word) {
		this.field.value = word;
		this.hideHelper();
	},
	createHelper:function() {
		this.helper = document.createElement("div");
		this.helper.style.width = (this.field.offsetWidth - 22) + "px";
		this.helper.setAttribute("id", "helper");
		this.helper.innerHTML = "";
		document.body.appendChild(this.helper);
		this.positionHelper();
		this.hideHelper();
	},
	positionHelper:function() {
		var position = {x:0, y:0};
		var e = this.field;
		while(e) {
			position.x += e.offsetLeft;
			position.y += e.offsetTop;
			e = e.offsetParent;
		}
		this.helper.style.left = position.x + "px";
		this.helper.style.top = (position.y + this.field.offsetHeight)+ "px";
	},
	showHelper:function() {
		this.helper.style.display = "block";
	},
	hideHelper:function() {
		this.helper.style.display = "none";
	}
}

var AC = new AutoComplete();

var words = [
	"азбука",
	"алфавит",
	"Алина",
	"Англия",
	"армия",
	"армагеддон",
	"археолог",
	"бармен",
	"барометр",
	"банда",
	"бандит",
	"булка",
	"булимия",
	"бумеранг"
];


