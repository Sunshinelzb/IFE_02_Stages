/**
 *
 * @authors Sunshine
 * @date    2016-03-27 10:23:51
 * @version 1.0
 */
function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

function addEvent(ele, type, func) {
    if (ele.addEventListener) {
        ele.addEventListener(type, func, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, func);
    } else {
        ele['on' + type] = func;
    }
}
window.onload = function() {
    var showResult = $('result'),
        left_In = $('left-in'),
        right_In = $('right-in'),
        left_Out = $('left-out'),
        right_Out = $('right-out'),
        input_Num = $('input-num'),
        showList = showResult.getElementsByTagName('div');
    var eventUtil = {
        leftIn: function() {
            var pushValue = input_Num.value;
            if (pushValue.trim().length == 0 || (isNaN(pushValue))) {
                alert('请输入一个有效的阿拉伯数字');
                return false;
            } else {
                var oDiv = document.createElement('div');
                var textNode = document.createTextNode(pushValue);
                oDiv.appendChild(textNode);
                oDiv.setAttribute('class', 'show-num');
                showResult.insertBefore(oDiv, showResult.childNodes[0]);
            }
        },
        rightIn: function() {
            var pushValue = input_Num.value;
            if (pushValue.trim().length == 0 || (isNaN(pushValue))) {
                alert('请输入一个有效的阿拉伯数字');
                return false;
            } else {
                var oDiv = document.createElement('div');
                var textNode = document.createTextNode(pushValue);
                oDiv.appendChild(textNode);
                oDiv.setAttribute('class', 'show-num');
                showResult.appendChild(oDiv);
            }
        },
        leftOut: function() {
            if (showList.length) {
                var alertValue = showList[0].innerText;
                alert(alertValue);
                showResult.removeChild(showList[0]);
            } else {
                alert('没有东西可以删除啦~');
            }
        },
        rightOut: function() {
            if (showList.length) {
                var alertValue = showList[showList.length - 1].innerText;
                alert(alertValue);
                showResult.removeChild(showList[showList.length - 1]);
            } else {
                alert('没有东西可以删除啦~');
            }
        }
    }
    addEvent(left_In, 'click', eventUtil.leftIn);
    addEvent(right_In, 'click', eventUtil.rightIn);
    addEvent(left_Out, 'click', eventUtil.leftOut);
    addEvent(right_Out, 'click', eventUtil.rightOut);
    addEvent(showResult, 'click', function(e) {
        showResult.removeChild(e.target);
    }, false);
}
