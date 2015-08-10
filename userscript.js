// ==UserScript==
// @name         Huiji.Snippets
// @namespace    Huiji
// @version      0.1
// @description  code snippets for huiji wiki editors
// @author       lianzhao
// @match        http://*.huiji.wiki/index.php?title=*&action=edit
// @grant        none
// ==/UserScript==

$(function () {
	function insertAtCaret(areaId, text) {
		var txtarea = document.getElementById(areaId);
		var scrollPos = txtarea.scrollTop;
		var strPos = 0;
		var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
			"ff" : (document.selection ? "ie" : false));
		if (br == "ie") {
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart('character', -txtarea.value.length);
			strPos = range.text.length;
		}
		else if (br == "ff") strPos = txtarea.selectionStart;

		var front = (txtarea.value).substring(0, strPos);
		var back = (txtarea.value).substring(strPos, txtarea.value.length);
		txtarea.value = front + text + back;
		strPos = strPos + text.length;
		if (br == "ie") {
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart('character', -txtarea.value.length);
			range.moveStart('character', strPos);
			range.moveEnd('character', 0);
			range.select();
		}
		else if (br == "ff") {
			txtarea.selectionStart = strPos;
			txtarea.selectionEnd = strPos;
			txtarea.focus();
		}
		txtarea.scrollTop = scrollPos;
	}

    function insertItem(text, displayText) {
		if (!displayText) {
			displayText = text;
		}

		var tag = $('<button type="button" class="btn btn-default">' + displayText + '</button>').click(function () {
			insertAtCaret('wpTextbox1', text)
		});
		$('#insertItems').append(tag);
	}

    window.setTimeout(function () {
		$('.section-advanced > .group-insert').append('<div id="insertItems" class="btn-group btn-group-xs" role="group"></div>')
        insertItem('{{需要翻译|~~~~}}', '{{需要翻译}}');
        insertItem('{{需要帮助}}');
        insertItem('{{CmPermission}}');
        insertItem('__TOC__', 'TOC');
    }, 3000);
});
