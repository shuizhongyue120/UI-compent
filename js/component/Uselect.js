(function (w) {
  function Uselect() {
    if(this instanceof Uselect) {
      this.config = {
        container:null,//组件的父容器
        skin:null,//皮肤
        readOnly: true,//输入框是否只读
        maxCount:5,//最大展示数量，超过时，出现滚动条
        selectHandler:null,//选中回调
        dataType:0,//数据类型0,1
        data:"",//数据,如果自定义拼装，请使用li标签
        top:15,//下拉距顶位置，主要用于微调
        width:120,//input，以及下拉的宽度
        liHeight:30//下拉li的高度
      };
      this.isShow = false;//局部变量，仅限组件内部使用
     // this.id = new Date().getTime(); 
      this.handlers = {};
    } else {
      return new Uselect();
    }
  }

    Uselect.prototype = new Widget();
    //隐藏组件
    AutoComplete.prototype.hide = function(config) {
      config.container && config.container.hide();
    }
    //销毁组件
    AutoComplete.prototype.destroy = function(config) {
      config.container && config.container.empty();
    }
   Uselect.prototype.show = function(config) {
     var CFG = $.extend(this.config, config);//合并对象
     if(!CFG.container) {
     // consle.log("组件的父容器为空");
      return;
     }
     this.renderUI(CFG);
     this.syncUI(CFG);
     this.bindUI(CFG);
     return this;
   };
  Uselect.prototype.renderUI = function(CFG) {
    var listStr = constrStr(CFG);
    CFG.container.append(listStr);
    var selector = CFG.container.find(".u-selector");
    CFG.container.find("input").css("width", CFG.width);
    selector.find("li").css({"height":CFG.liHeight,"lineHeight":CFG.liHeight + "px"});
     "" !== CFG.skin && selector.addClass(CFG.skin);
    var maxHeight = "none";
    var overflowY = "hidden";
    //如果设置了最大展示数量，滚动显示
    if(CFG.maxCount) {
      var liList = selector.find("li");
      var liLen = liList.length;
      if (liLen > CFG.maxCount) {//如果设置的最大数量大于结果集的总数量，无限下拉
         var liHeight = liList.eq(0).height();
         maxHeight = liHeight*CFG.maxCount;
         overflowY = "scroll";
      }           
    }
    selector.css({
      "top":CFG.top,
      "width":CFG.width,
      "maxHeight":maxHeight,
      "overflowY":overflowY
    });
  }

  Uselect.prototype.syncUI = function(CFG) {
    var selector = CFG.container.find(".u-selector");
    CFG.container.find("input").css("width", CFG.width);
    selector.find("li").css({"height":CFG.liHeight,"lineHeight":CFG.liHeight + "px"});
     "" !== CFG.skin && selector.addClass(CFG.skin);
    var maxHeight = "none";
    var overflowY = "hidden";
    //如果设置了最大展示数量，滚动显示
    if(CFG.maxCount) {
      var liList = selector.find("li");
      var liLen = liList.length;
      if (liLen > CFG.maxCount) {//如果设置的最大数量大于结果集的总数量，无限下拉
         var liHeight = liList.eq(0).height();
         maxHeight = liHeight*CFG.maxCount;
         overflowY = "scroll";
      }           
    }
    selector.css({
      "top":CFG.top,
      "width":CFG.width,
      "maxHeight":maxHeight,
      "overflowY":overflowY
    });
  }

  Uselect.prototype.bindUI = function(CFG) {
    var that = this;
    //选择下拉选项
    CFG.container.find(".u-selector li").on("click", function(event) {
      if(CFG.selectHandler) {
        CFG.selectHandler();
      }
      that.fire("select", $(this));
      CFG.container.find(".u-selector").hide();
    });
    CFG.container.blur(function() {
     // console.log("blur");
    })
    $("body").on("click", function(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      //点击输入框区域，下拉收缩展开效果
      if(CFG.container[0].contains($(target)[0])) {//很多人不知道这个方法,主要是组件被一个页面多处使用时,冲突
        if(!that.isShow) {
          if(CFG.clickHandler) {
            CFG.clickHandler();
          }
          that.fire("click", $(this));
          CFG.container.find(".u-selector").show();
          that.isShow = true;
          return;
        }
        CFG.container.find(".u-selector").hide();
        that.isShow = false;
        return;
      }
      //点击时，如果isshow为true，收缩下拉
      if(that.isShow) {
        CFG.container.find(".u-selector").hide();
        that.isShow = false;
      }
    });
  }

  function constrStr(CFG) {
    var data = CFG.data;
    var listStr = '<input type="text" class="u-select"'+ (CFG.readOnly ? "readonly" :"") +' index=""><i class="selector-icon"></i><ul class="u-selector">';
    if(0 === CFG.dataType) {
      listStr += CFG.data;
      return listStr + "<ul>";
    }
    if(1 === CFG.dataType) {
      var len = data.length;
      for (var i = 0; i < len; i++){
        listStr += '<li class="u-opt" index="' + data[i].index + '">' + data[i].value + '</li>';
      }
    }
    
    return listStr + "<ul>";;
  }
  w.Uselect = Uselect;
})(window);