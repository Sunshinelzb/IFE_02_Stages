/**
 *
 * @authors Sunshine  625592890@qq.com
 * @date    2016-05-22 10:51:40
 * @hello   hello world
 * @version $Id$
 */

function $(id) {
    return document.getElementById(id);
}

var traversalResult = [];
var root = document.getElementsByClassName('root')[0];
var time = null,
    head = null;
var preOrder = $("preOrder"),
    inOrder = $("inOrder"),
    postOrder = $("postOrder"),
    BFS = $("BFS"),
    choose = $("choose");

function show() {
    head = traversalResult.shift(); // 出队
    if (head) {
        head.style.backgroundColor = "rgba(247, 139, 184, 0.77)";
        timer = setTimeout(function() {
            head.style.backgroundColor = "#fff"; //1秒后节点的蓝色变为白色
            show(); //递归调用show，使要显示的节点不停出队显示，直至为空
        }, 1000);
    }
}

function reset() {
    if (traversalResult.length > 0) {
        head.style.backgroundColor = '#fff'; //清除残留颜色
        traversalResult = []; //清空队列
        clearTimeout(time); //关闭定时器
    }
}

function getPreOrderResult(node) {
    reset();
    (function preOrder(node) {
        if (node !== null) {
            traversalResult.push(node);
            preOrder(node.firstElementChild);
            preOrder(node.lastElementChild);
        }
    })(node);
    show();
}

function getInOrderResult(node) {
    reset();
    (function inOrder(node) {
        if (node !== null) {
            inOrder(node.firstElementChild);
            traversalResult.push(node);
            inOrder(node.lastElementChild);
        }
    })(node);
    show();
}

function getPostOrderResult(node) {
    reset();
    (function postOrder(node) {
        if (node !== null) {
            postOrder(node.firstElementChild);
            postOrder(node.lastElementChild);
            traversalResult.push(node);
        }
    })(node);
    show();
}

function BFSResult(node) {
    reset();
    (function BFS(node) {
        var queue = [];
        var p = null;
        if (node !== null) {
            queue.push(node);
        }
        while (queue.length > 0) {
            p = queue.shift();
            traversalResult.push(p);
            if (p.firstElementChild !== null) {
                queue.push(p.firstElementChild);
            }
            if (p.lastElementChild !== null) {
                queue.push(p.lastElementChild);
            }
        }
    })(node);
    show();
}

function startTraversal() {
    if (this.id === 'preOrder') {
        getPreOrderResult(root);
    } else if (this.id === 'inOrder') {
        getInOrderResult(root);
    } else if (this.id === 'postOrder') {
        getPostOrderResult(root);
    } else {
        BFSResult(root);
    }
}
(function() {

    // 事件监听
    $.addEvent = function addEvent(element, event, listener) {
        try {
            element.addEventListener(event, listener, false);
        } catch (e) {
            try {
                element.attachEvent("on" + event, listener);
            } catch (e) {
                element["on" + event] = listener;
            }
        }
    };

    // 事件代理
    $.delegateEvent = function(element, tag, eventName, listener) {
        $.addEvent(element, eventName, function() {
            // 处理兼容
            var event = arguments[0] || window.event,
                target = event.target || event.srcElement;
            if (target && target.tagName === tag.toUpperCase()) {
                listener.call(target, event);
            }
        });
    };

    $.delegateEvent(choose, "button", "click", startTraversal);
})(window);
