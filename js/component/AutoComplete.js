/*
 *联想输入插件   create by jiaxiangjun   2015-9-20 
 *示例：
 * var config = {obj:input, 
 *   top:top + eHeight + 2, 上边距
 *   left:left,左边距
 *   width:740,下拉组件的长度
 *   skin:"",//定制皮肤
 *   selectHandler:selectHandler,
 *   changeHandler:changeHandler,//监听对象值变动回调；该函数需要返回对象数组或者以拼接好的html片段(建议使用li标签)；
 *   contentType:1,
 *   maxCount:0//最大展示数量，超过时，出现滚动条
 *  }
 * 
 *var autoCompleteDialog = new window.AutoComplete().show(config);
 *
 * 组件支持两种自定义事件，change;select 同时，支持一个事件绑定多个回调函数，如下：
 * autoCompleteDialog.on("select",function(argument) {
 *   console.log(" on select ")
 * }).on("change",function(argument) {
 *  console.log(" on change ")
 *});
 */

(function(w) {
    function AutoComplete() {

        if (this instanceof AutoComplete) {
            this.config = {
                obj: null, //监听对象
                top: 0, //下拉上边距
                left: 0, //下拉左边距
                width: 0, //下拉组件宽度
                skin: "", //皮肤
                selectHandler: null, //下拉选中后，回调函数
                changeHandler: null, //监听对象值变化后，回调函数
                contentType: 0, //结果集拼接方式:0,自定义拼装;1,返回对象数组，格式[{key:1,value:"111"},{key:2,value:"222"}]
                maxCount: 0 //最大展示数量，超过时，出现滚动条
            }
        } else {
            return new AutoComplete();
        }

    }

    AutoComplete.prototype = new window.Widget();

    AutoComplete.prototype.hide = function(argument) {
        $(".u-autocom-resSelector").hide();
    }
    AutoComplete.prototype.destroy = function(argument) {
        $(".u-autocom-resSelector").remove();
    }
    AutoComplete.prototype.show = function(config) {
        var CFG = $.extend(this.config, config); //合并对象
        if (!CFG.obj) {
            return;
        }
        var searchElement = CFG.obj;
        CFG.width = CFG.width ? CFG.width : CFG.obj.width(); //默认宽度为监听对象宽度
        var that = this;
        //input change兼容性处理
        if (window.addEventListener) {
            searchElement[0].oninput = resultHandler;
        } else {
            searchElement[0].onpropertychange = resultHandler;
        }

        //点击页面其他部分隐藏
        $("body").on("click", hideResHandler);

        function hideResHandler() {
            var $this = $(this);
            if ($this.hasClass("res_li")) {
                return;
            }
            $(".u-autocom-resSelector").hide();
        }

        $("body").on("click", ".u-autocom-resSelector li", selectHandler);
        /*选择下拉选择值*/
        function selectHandler(event) {
            if (CFG.selectHandler && "function" === typeof CFG.selectHandler) {
                CFG.selectHandler();
                that.fire("select", "select data");
                $(".u-autocom-resSelector").hide();
                return;
            }
            var $this = $(this);
            var liVal = $this.text();
            CFG.obj.val(liVal);
            $(".u-autocom-resSelector").hide();
        }


        function resultHandler(event) {
            var $this = $(this);
            var val = $this.val();
            var resStr = "";
            if (0 === CFG.contentType) {
                resStr = CFG.changeHandler && CFG.changeHandler(val);
            }
            if (1 === CFG.contentType) {
                var data = CFG.changeHandler && CFG.changeHandler(val);
                if ("[object Array]" !== Object.prototype.toString.call(data)) { //type=1,时，返回数据必须是数组
                    return;
                }
                resStr = assembleData(data);
            }
            that.fire("change", "change data");
            appendResult(resStr);
        }

        function appendResult(resStr) {
            if (!resStr || "" === resStr) {
                return;
            }
            var selector = $(".u-autocom-resSelector");
            if (0 === selector.length) {
                selectorStr = '<div class="u-autocom-resSelector">' + resStr + '</div>';
                $("body").append(selectorStr);
                selector = $(".u-autocom-resSelector");
            } else {
                selector.empty();
                selector.append(resStr);
            }
            var maxHeight = "none";
            var overflowY = "hidden";

            //如果设置了最大展示数量，滚动显示
            if (CFG.maxCount) {
                var liList = selector.find("li");
                var liLen = liList.length;
                if (liLen > CFG.maxCount) { //如果设置的最大数量大于结果集的总数量，无限下拉
                    var liHeight = liList.eq(0).height();
                    maxHeight = liHeight * CFG.maxCount;
                    overflowY = "scroll";
                }
            }
            selector.css({
                "top": CFG.top,
                "left": CFG.left,
                "width": CFG.width,
                "maxHeight": maxHeight,
                "overflowY": overflowY
            });

            "" !== CFG.skin && selector.addClass(CFG.skin);
            selector.show();
        }

        //拼装数据成html片段
        function assembleData(data) {
            var len = data.length;
            var resStr = "";
            for (var i = 0; i < len; i++) {
                resStr = resStr + '<li class="res_li" data-value="' + data[i].key + '">' + data[i].value + '</li>'
            }
            return resStr;
        }

        /*    if(CFG.selectHandler){
              this.on("select", CFG.selectHandler);
            }

            if(CFG.selectHandler){
              this.on("change", CFG.changeHandler);
            }*/

        return this;
    };
    w.AutoComplete = AutoComplete;
})(window);
