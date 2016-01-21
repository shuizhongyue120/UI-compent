/**
 *Widget抽象类   create by jiaxiangjun   2015-9-20 
 *               modify by jiaxiangjun   2015-9-27 
 * @return {[Widget抽象类]}
 */
(function(w){

  function Widget() {
    if(this instanceof Widget) {
        this.handlers = {};
    } else {
      return new Widget();
    }
  }

  Widget.prototype = 
  {
    //绑定自定义事件
    on:function(type,handler) {
      if ("undefined" === typeof this.handlers[type]) {
        this.handlers[type] = [];
      }
      this.handlers[type].push(handler);
      return this;
    },
    //依次触发自定义事件
    fire:function(type, data) {
      if ("[object Array]" === Object.prototype.toString.call(this.handlers[type])){
        var handlers = this.handlers[type];
        var len = handlers.length;
        for (var i = 0; i < len; i++) {
          handlers[i](data);
        }
        return this;
      }
    },
    //销毁函数
    destroy:function(argument) {
      // to do smething
    },
    //隐藏函数
    hide:function(argument) {
      // to do smething
    },
    //添加dom相关
    renderUI:function(argument) {
      // to do smething
    },
    //设置组件属性相关
    syncUI:function(argument) {
      // to do smething
    },
    //事件绑定相关
    bindUI:function(argument) {
      // to do smething
    }
  }

	w.Widget = Widget;
})(window);
