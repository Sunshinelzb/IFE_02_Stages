/**
 *
 * @authors Sunshine
 * @date    2016-03-29 10:33:56
 * @version 1.0
 */
//console.log(input);
function $(id) {
    return document.getElementById(id);
}

function stopBubble(e) {
    if (e && e.stopPropagation)
        e.stopPropagation();
    else
        window.event.cancelBubble = true;
}

var input = $('input-num'),
    leftIn = $('left-in'),
    leftOut = $('left-out'),
    rightIn = $('right-in'),
    rightOut = $('right-out'),
    sort = $('sort'),
    random = $('random'),
    dataNum = $('data-num'),
    arrLi = dataNum.getElementsByTagName('li');
var num = [];
var count = 0;
var complete = false;

/*  跨浏览器兼容  */
function addEvent(element, type, func) {
    if (element.addEventListener) {
        element.addEventListener(type, func, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, func);
    } else {
        element["on" + type] = func;
    }
}
/*  生成随机颜色  */
function randomColor() {
    var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    if (rand.length === 6) {
        return "#" + rand;
    } else {
        return randomColor();
    }
}
/*  刷新DOM  */
function flashDOM(array) {
    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += "<li style='cursor:pointer; height: " + array[i] + "%; background: " + randomColor() + ";'><p style='text-align:left;font-size: 14px;'>" + array[i] + "</p></li>";
    }
    dataNum.innerHTML = html;
}
/*  生成随机数据  */
function randomQueue() {
    num = [];
    for (var i = 0; i < 60; i++) {
        num.push(parseInt(Math.random() * 91) + 10);
    }
    count = 60;
    flashDOM(num);
}
/*  冒泡排序  */
function bubbleSort(array) {
    var i = 0,
        j = 1,
        temp,
        len = array.length,
        timer = null;
    //每次调用run()，如果发现有符合条件的则交换数值
    timer = setInterval(run, 10);

    function run() {
        if (i < len) {
            if (j < len) {
                if (array[i] > array[j]) {
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                    arrLi[i].style.height = array[i] + "%";
                    arrLi[i].innerHTML = "<p>" + array[i] + "</p>";
                    arrLi[j].style.height = array[j] + "%";
                    arrLi[j].innerHTML = "<p>" + array[j] + "</p>";
                }
                j++;
            } else {
                i++;
                j = i + 1;
            }
        } else {
            clearInterval(timer);
            return;
        }
    }
}
var eventUtil = {
    left_In: function() {
        if (input.value !== "") {
            if (!/^\d+$/.test(input.value) || parseInt(input.value) < 10 || parseInt(input.value) > 100) {
                alert("您的输入有误，请输入10~100之间的数字！");
                input.value = "";
            } else {
                if (count < 60) {
                    num.unshift(parseInt(input.value));
                    var li = document.createElement("li");
                    li.style.height = parseInt(input.value) + "%";
                    li.style.background = randomColor();
                    li.innerHTML = "<p>" + input.value + "</p>";
                    count++;
                    dataNum.insertBefore(li, dataNum.firstChild);
                } else {
                    alert("您输入的数据太多了，不能超过60个!");
                }
            }
        } else {
            alert("您的输入不能为空!");
        }
    },
    right_In: function() {
        if (input.value !== "") {
            if (!/^\d+$/.test(input.value) || parseInt(input.value) < 10 || parseInt(input.value) > 100) {
                alert("您的输入有误，请输入10~100之间的数字！");
                input.value = "";
            } else {
                if (count < 60) {
                    num.push(parseInt(input.value));
                    var li = document.createElement("li");
                    li.style.height = parseInt(input.value) + "%";
                    li.style.background = randomColor();
                    li.innerHTML = "<p>" + input.value + "</p>";
                    count++;
                    dataNum.appendChild(li);
                } else {
                    alert("您输入的数据太多了，不能超过60个！");
                }
            }
        } else {
            alert("您的输入不能为空");
        }
    },
    left_Out: function() {
        if (dataNum.firstChild !== null) {
            num.shift();
            dataNum.removeChild(dataNum.firstChild);
        } else {
            alert("已经没有东西可以删除啦~");
        }
    },
    right_Out: function() {
        if (dataNum.lastChild !== null) {
            num.pop();
            dataNum.removeChild(dataNum.lastChild);
        } else {
            alert("已经没有东西可以删除啦~");
        }
    }
}
window.onload = function() {
    addEvent(leftIn, "click", eventUtil.left_In);
    addEvent(leftOut, "click", eventUtil.left_Out);
    addEvent(rightIn, 'click', eventUtil.right_In);
    addEvent(rightOut, "click", eventUtil.right_Out);
    addEvent(input, "focus", function() {
        input.value = "";
    });
    addEvent(random, "click", function() {
        randomQueue();
    });
    addEvent(reset, "click", function() {
        input.value = "";
        num = [];
        dataNum.innerHTML = "";
        complete = false;
        count = 0;
    });

    function getTarget(event) {
        event = event || window.event;
        return event.target || event.srcElement;
    };
    /*  事件代理，点击消除  */
    addEvent(dataNum, 'click', function deleteEle(event) {
        var oldEle = getTarget(event),
            queue = document.querySelector("ul");
        if (oldEle.tagName == "LI") {
            alert("您删除的数据是：" + oldEle.firstChild.innerHTML + "~");
            queue.removeChild(oldEle);
            count--;
        }
    });
    addEvent(sort, "click", function() {
        if (!complete) {
            if (arrLi[0]) {
                bubbleSort(num);
                complete = true;
            } else {
                alert("通过左侧入或者右侧入输入一些要排序的数据！");
            }
        } else {
            alert("请点击重置数据按钮才能开始新的排序！");
        }
    });
}
