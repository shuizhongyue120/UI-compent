$(function() {
    var config = {
        container: $(".selectorContainer"),
        dataType: 1,
        data: [{
            index: 1,
            value: "scott"
        }, {
            index: 2,
            value: "Jhon"
        }, {
            index: 3,
            value: "Tom"
        }, {
            index: 4,
            value: "scott4"
        }, {
            index: 5,
            value: "scott5"
        }, {
            index: 6,
            value: "scott6"
        }, {
            index: 7,
            value: "scott7"
        }, {
            index: 8,
            value: "scott8"
        }, {
            index: 9,
            value: "scott9"
        }],
        readOnly: false,
        top: 17
    };

    var uselect = (new window.Uselect()).show(config);
    uselect.on("select", function(data) {
        //console.log(data);
        // alert("select");
    }).on("click", function(data) {
        // console.log(data);
        // alert("click");
    });

    var config2 = {
        container: $(".selectorContainer2"),
        dataType: 1,
        data: [{
            index: 1,
            value: "scott2"
        }, {
            index: 2,
            value: "Jhon2"
        }, {
            index: 3,
            value: "Tom2"
        }],
        readOnly: true,
        width: 240,
        top: 17
    };

    var uselect2 = (new window.Uselect()).show(config2);
    uselect2.on("select", function(data) {
        // console.log(data);
        //alert("select2");
    }).on("click", function(data) {
        //console.log(data);
        // alert("click2");
    });

});
