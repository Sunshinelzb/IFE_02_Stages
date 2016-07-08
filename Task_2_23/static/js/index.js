/**
 *
 * @authors Sunshine  625592890@qq.com
 * @date    2016-07-01 20:24:40
 * @hello   hello world
 * @version $Id$
 */
window.onload = function() {
    (function(window, undefined) {
        var traversalResult = [];
        var root = document.getElementsByClassName("one")[0];
        var timer = null;
        var head = null;
        var search = $("search");
        var choose = $("choose");
        var text = "";
        var found = false;
        var startTime = 0,
            endTime = 0;
        /*
         添加事件
         */
        function $(id) {
            return document.getElementById(id);
        }
        $.addEvent = function(element, event, listener) {
            if (element.addEventListener) { //标准
                element.addEventListener(event, listener, false);
            } else if (element.attachEvent) { //低版本ie
                element.attachEvent("on" + event, listener);
            } else { //都不行的情况
                element["on" + event] = listener;
            }
        };
        $.delegateEvent = function(element, tag, eventName, listener) {
            $.addEvent(element, eventName, function() {
                var event = arguments[0] || window.event,
                    target = event.target || event.srcElement;
                if (target && target.tagName === tag.toUpperCase()) {
                    listener.call(target, event);
                }
            });
        };
        /*
         停止当前遍历，开始新的遍历
         */
        function reset() {
            if (traversalResult.length > 0) { //如果队列非空即正在遍历
                startTime = 0;
                endTime = 0;
                found = false;
                text = "";
                head.style.backgroundColor = "#fff"; //清除残留蓝色
                traversalResult = []; //清空队列
                clearTimeout(timer); //清除定时器
            }
        }
        /*
         模拟二叉树先序的深度优先搜索
         */
        function preDFS(node) {
            var temp = null;
            reset();
            (function DFS(node) {
                var p = null;
                if (node) {
                    traversalResult.push(node);
                    DFS(node.firstElementChild);
                    if (node.firstElementChild) {
                        temp = node.firstElementChild.nextElementSibling;
                        while (temp) {
                            p = temp;
                            DFS(temp);
                            temp = p.nextElementSibling;
                        }
                    }
                }
            })(node);
            render();
        }

        function trim(str) {
            return str.replace(/^\s+|\s+$/g, "");
        }

        function render() {
            if (search.value !== "") {
                searchShow();
            } else {
                onlyShow();
            }
        }

        function searchShow() {
            if (traversalResult.length === 0 && !found) {
                alert("没有找到");
            }
            head = traversalResult.shift(); //出队
            if (head) {
                text = head.firstChild.nodeValue;
                if (trim(text) === search.value) {
                    head.style.backgroundColor = "deeppink";
                    found = true;
                    endTime = new Date();
                    alert("Bingo！本次查询时间：" + (endTime - startTime) / 1000 + "s");
                    return;
                } else {
                    head.style.backgroundColor = "#6fa3ff"; //显示蓝色
                    timer = setTimeout(function() {
                        head.style.backgroundColor = "#fff"; //1秒后节点的蓝色变为白色
                        searchShow(); //递归调用，使要显示的节点不停出队显示，直至为空
                    }, 800);
                }
            }
        }

        function onlyShow() {
            head = traversalResult.shift(); //出队
            if (head) {
                head.style.backgroundColor = "#6fa3ff"; //显示蓝色
                timer = setTimeout(function() {
                    head.style.backgroundColor = "#fff"; //1秒后节点的蓝色变为白色
                    onlyShow(); //递归调用，使要显示的节点不停出队显示，直至为空
                }, 800);
            }
        }
        $.delegateEvent(choose, "button", "click", startTraversal);

        function startTraversal() {
            startTime = new Date();
            if (this.id === "preDFS") {
                preDFS(root);
            }
        }

        $.addEvent(search, "focus", function() {
            this.value = "";
        });
    })(window);
};
