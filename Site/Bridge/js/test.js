!function () {
    jsb.addJavascriptMethod('alert', function (params) {
        alert('------\n' + JSON.stringify(params) + '\n========\n');
        return { 'text': 'alert ok' };
    });
    var btn = document.createElement('button');
    btn.innerHTML = '点击我呀111';
    btn.onclick = function () {

        jsb.require('messagebox', {'text': '你好, messagebox!'}, function(response){
        	alert('调用messagebox回来啦\n' + JSON.stringify(response));
        });
        //alert(new Date().getTime());
    }
    document.body.appendChild(btn);

}();