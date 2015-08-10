// ==UserScript==
// @name         Huiji.Snippets.Coppermind
// @namespace    Huiji
// @version      0.2
// @description  code snippets for huiji wiki editors
// @author       lianzhao
// @match        http://coppermind.huiji.wiki/index.php?title=*&action=edit
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
	
	function insertItemToGroup(group, text, displayText) {
        if (!displayText) {
            displayText = text;
        }

        var tag = $('<li><button type="button" class="btn btn-default btn-xs">' + displayText + '</button></li>').click(function () {
            insertAtCaret('wpTextbox1', text)
        });
        group.append(tag);
	}

    function createGroup(id, displayText) {
        var group = toMultiLineString(function () {/*
		<div class="btn-group btn-group-xs" role="group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      displayTextPlaceHolder
      <span class="caret"></span>
    </button>
    <ul id="idPlaceholder" class="dropdown-menu">
    </ul>
  </div>
  */}).replace('idPlaceholder', id)
			.replace('displayTextPlaceHolder', displayText);
        $('#insertItems').append(group);
    }

    function toMultiLineString(raw) {
        var lines = raw.toString();
        return lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    }

    window.setTimeout(function () {
        $('.section-advanced > .group-insert').append('<div id="insertItems" class="btn-group btn-group-xs" role="group"></div>');
        insertItem('{{需要翻译|~~~~}}', '{{需要翻译}}');
        insertItem('{{需要帮助}}');
        insertItem('{{CmPermission}}');
        insertItem('__TOC__', 'TOC');

        var infoboxDropDown = createGroup('infoboxDropDown', 'Infobox');
		
		var infoboxCharacter = toMultiLineString(function(){
			/*{{Infobox character
| 人名       = 
| 分类       = 
| 图像	         = 
| 图像信息  = 
| 发音         = 
| 别名         = 
| 其他译名     =  
| 性别        =   
| 头衔        =   
| 出生时间     =                     
| 出生地点     =     
| 死亡时间    =  
| 死亡地点     = 
| 阵营        = 
| 种族        =        
| 民族        =       
| 文化        =         
| 语言        =         
| 宗教        = 
| 职业        =     
| 发色        = 
| 瞳色        = 
| 肤色        = 
| 服装        = 
| 饰品        = 
| 武器        = 
| 工具        = 
| 坐骑        = 
| 其他补充    = 
| 阶职        = 
| 体系        = 
| 能力        = 
| 契约对象    = 
| 家族        = 
| 祖先        = 
| 父亲        = 
| 母亲        = 
| 亲戚        = 
| 同辈        = 
| 配偶        = 
| 子嗣        = 
| 继承人      = 
| 后代        = 
| 恋人        = 
| 好友        = 
| 仇敌        = 
| 上级        = 
| 下属        = 
| 师从        = 
| 学徒        = 
| 侍从        = 
| 村镇        = 
| 城市        = 
| 国家        = 
| 大陆        = 
| 世界        = 
| 小说        = 
| 漫画        = 
| 图画小说    = 
| 动画        = 
| 电影        = 
| 电视剧      = 
| 电子游戏    = 
| 桌上游戏    = 
| 电影演员    =
| 电视剧演员  =
| 动画配音    =
| 游戏配音    =

}}
*/});
        insertItemToGroup($('#infoboxDropDown'), infoboxCharacter, 'infobox character');
    }, 3000);
});
