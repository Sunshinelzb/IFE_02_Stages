(function() {
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
     *    "北京": 90,
     *    "上海": 40
     * };
     */
    function addEvent(element, event, listener) {
        if (element.addEventListener) {
            element.addEventListener(event, listener, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + event, listener);
        } else {
            element['on' + event] = listener;
        }
    }
    var aqiData = {};
    /*  去除前后空格 */
    function trim(str) {
        return str.replace(/(^\s+)|(\s+$)/g, '');
    }
    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqiData() {
        var city = trim(document.getElementById('aqi-city-input').value);
        var value = trim(document.getElementById('aqi-value-input').value);
        var re1 = /^[A-Za-z\u4e00-\u9fa5]+$/;
        re2 = /^[\d]+$/;
        if (!city) {
            alert('城市不能为空');
            return false;
        }
        if (!value) {
            alert('空气质量指数不能为空');
            return false;
        }
        if (!re1.test(city)) {
            alert('城只能输入中英文字符，请重新输入');
            return false;
        }
        if (!re2.test(value)) {
            alert('空气质量指数只能输入数字，请重新输入');
            return false;
        }
        aqiData[city] = value;
        return true;
    }
    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        //表头
        var str = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        for (var city in aqiData) {
            str += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>"
        }
        document.getElementById("aqi-table").innerHTML = str;
    }
    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }
    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle() {
        //do sth
        var key = this.parentNode.parentNode.firstChild.innerHTML;
        delete aqiData[key];
        renderAqiList();
    }

    function init() {
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        var oBtn = document.getElementById('add-btn');
        addEvent(oBtn, 'click', addBtnHandle);
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        addEvent(document.getElementById("aqi-table"), 'click', function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.nodeName.toLowerCase() === "button") {
                delBtnHandle.apply(target);
            }
        }, false)
    }
    init();
}())
