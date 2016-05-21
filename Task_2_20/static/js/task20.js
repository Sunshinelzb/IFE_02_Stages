/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-04-21 22:17:40
 * @version $Id$
 */
$ = function (el) {
    return document.querySelector(el);
};
.done(function() {
  console.log("success");
})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});

var data = [];
function render(match) {
    $('#result').innerHTML =
        data.map(function (d) {
            var r = d;
            if (match != null && match.length > 0) {
                r = r.replace(new RegExp(match, "g"), "<span class='select'>" + match + "</span>");
            }
            return "<div>" + r + "</div>";
        }).join('');
}

function deal(func, succ) {
    var args = [].slice.call(arguments, 2);
    return function (e) {
        try {
            var arg = args.map(function (item) {
                return typeof item === "function" ? item(e) : item;
            });
            var result;
            if (Object.prototype.toString.call(arg[0]) === '[object Array]') {
                arg[0].forEach(function (d) {
                    result = func.apply(data, [d].concat(arg.slice(1)));
                });
            } else {
                result = func.apply(data, arg)
            }
            if (succ != null) {
                succ(result);
            }
        } catch (ex) {
            if (ex.message != '')
                alert(ex.message);
        }
        render();
    };
}
//  filter() 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组
function getInputValue() {
    return $('#input').value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function (d) {
        return d != '';
    });
}

function getClickIndex(e) {
    var node = e.target;
    if (node.id == "result") throw new Error('');
    return [].indexOf.call(node.parentNode.children, node);
}
$('#left-in').onclick = deal([].unshift, null, getInputValue);
$('#right-in').onclick = deal([].push, null, getInputValue);
$('#left-out').onclick = deal([].shift, window.alert);
$('#right-out').onclick = deal([].pop, window.alert);
$('#result').onclick = deal([].splice, null, getClickIndex, 1);
$('#search').onclick = function () {
    render($('#search-text').value);
};
