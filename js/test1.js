
/**
 * 查询所有
 * */
function showAllUsers(){
    $.ajax({

        type:"post",
        url:"demo/guanliyuan/glychaxun",

        // 定义回调响应的数据格式为JSON格式该属性可以省略
        dataType: "json",

        // 成功响应的结果
        success : function(data){

            // 清空表格
            $("#tbuser>tbody").empty();

            //遍历处理data，可以是数组、DOM、json等;function (index, value)中index是当前元素的位置，value是值
            $.each(data,function(i,d){
                var ele='<tr id="'+d.gid+'"><td><input type="checkbox" name="cbkSel" id="" value="'+d.gid+'"/></td><td><div id="divgId">'+d.gid+'</div></td><td><div id="divgName">'+d.gname+'</div></td><td><div id="divgPwd">'+d.gpwd+'</div></td><td><input type="button" value="编辑" onclick="edit('+d.gid+')"  class="layui-btn"/><input type="button" value="删除" onclick="delGuanliyuan('+d.gid+')" class="layui-btn"/></td></tr>';
                $("#tbuser>tbody").append(ele);
            });
        }
    });
}




/**
 * 根据id查询
 * */
function findGuanliyuanById(){
    // 获取输入数据
    var gId = $("#txtSearch").val();
    //alert(gId)

    $.ajax({
        type:"post",
        url:"demo/guanliyuan/glychaxunById",
        // data表示发送的数据
        data:{gId:gId},

        // 定义发送请求的格式为JSON字符串
        //contentType: "application/json;charset=utf-8",

        // 定义回调响应的数据格式为JSON格式该属性可以省略
        dataType: "json",

        // 成功响应的结果
        success : function(data){
            /**
             * data就是所得到的json数据，要看准json的键值来调用对应的数据(这得到的json数据的键值就是gid、gname、gpwd)
             * */
            if(data != null){

                // 清空表格
                $("#tbuser>tbody").empty();
                var ele='<tr id="'+data.gid+'"><td><input type="checkbox" name="cbkSel" id="" value="'+data.gid+'"/></td><td><div id="divgId">'+data.gid+'</div></td><td><div id="divgName">'+data.gname+'</div></td><td><div id="divgPwd">'+data.gpwd+'</div></td><td><input type="button" value="编辑" onclick="edit('+data.gid+')"  class="layui-btn"/><input type="button" value="删除" onclick="delGuanliyuan('+data.gid+')" class="layui-btn"/></td></tr>';
                $("#tbuser>tbody").append(ele);
                // alert(data.gid)
                // alert(data.gname)
                // alert(data.gpwd)
            }else {
                alert("查无此人！");
            }
        }
    });
}


/**
 *添加数据
 * */
function addGuanliyuan(){
    var gId = $("#txtgId").val();
    var gName = $("#txtgName").val();
    var gPwd = $("#txtgPwd").val();
    $.ajax({
        url:"demo/guanliyuan/addGuanliyuan",
        type:"post",
        data:{gId:gId,gName:gName,gPwd:gPwd},
        dataType: "json",

        // 成功响应的结果
        success : function(data){

            if(data==1){
                alert("添加数据成功！");
                // showAllUsers();  // 查询一次所有（更新数据）
                // 重新查询，返回到第一页
                showReocrd(1,10);
            }else{
                alert("添加数据失败！");
            }
        }

    });
}


/**
 *根据id删除
 * */
function delGuanliyuan(gId){

    $.ajax({
        url:"demo/guanliyuan/deleteById",
        type:"post",
        data:{gId:gId},
        dataType: "json",

        // 成功响应的结果
        success : function(data){

            if(data == 1){
                alert("删除数据成功！");
                // showAllUsers();
                // 重新查询，返回到第一页
                showReocrd(1,10);
            }else{
                alert("删除数据失败！");
            }
        }
    });
}



/**
 * 批量删除
 * */
// 全选、全不选
function checkAll(){
    // 遍历所有的name为cbkSelde的checkbox
    $("input:checkbox[name=cbkSel]").each(function(i,d){
        $(this).prop("checked",$("#cbkAll").prop("checked"));
    });
}
//批量删除
function delGuanliyuans(){
    // 定义数组
    var gIds=[];

    //  遍历被选中的cbkSel复选框，并将id值添加到数组
    $("input:checkbox[name=cbkSel]:checked").each(function(){
        gIds.push($(this).val());  //push()方法可向数组的末尾添加一个或多个元素，并返回新的长度
    });
    $.ajax({
        url:"demo/guanliyuan/deletes",
        type:"post",
        data:{gIds:gIds},
        dataType: "json",
        // 成功响应的结果
        success : function(data){
            if(data > 0){
                alert("成功删除"+data+"了条数据！");
                // showAllUsers();    //刷新表单数据
                // 重新查询，返回到第一页
                showReocrd(1,10);
            }else{
                alert("删除失败！");
            }
        }
    });
}


/**
 *修改数据
 * */
// 准备修改
function edit(gId){
    // 获取gName、gPwd
    var gName=$("#"+gId).find("div#divgName").text();
    var gPwd=$("#"+gId).find("div#divgPwd").text();


    //alert(gName);
    //alert(gPwd);

    // 清空tr子元素
    $("#"+gId).empty();

    // 添加新元素；把表单格子变成文本框来进行编辑（从而达到修改的目的）
    var ele='<td><input type="checkbox" name="cbkSel" id="" value="'+gId+'"/></td><td><input type="text" id="textgId" value="'+gId+'" class="inputLine"/></td><td><input type="text" id="textgName" value="'+gName+'" class="inputLine"/></td><td><input type="text" id="textgPwd" value="'+gPwd+'" class="inputLine"/></td><td><input type="button" value="修改" onclick="updataGuanliyuan()" class="layui-btn"/></td>';
    $("#"+gId).html(ele);
}
//修改
function updataGuanliyuan(){
    // 获取数据
    var gId = $("#textgId").val();
    var gName = $("#textgName").val();
    var gPwd = $("#textgPwd").val();

    $.ajax({
        url:"demo/guanliyuan/update",
        type:"post",
        data:{gId:gId,gName:gName,gPwd:gPwd},
        dataType: "json",

        // 成功响应的结果
        success : function(data){
            if(data == 1){
                alert("修改数据成功！");
                // showAllUsers();
                // 重新查询，返回到第一页
                showReocrd(1,10);
            }else{
                alert("修改数据失败！");
            }
        }
    });
}




/**
 * 分页操作
 * */
function showReocrd(pageNo,pageSize){
    $.ajax({

        url:"demo/guanliyuan/page",
        type:"post",
        data:{pageNo:pageNo,pageSize:pageSize},
        // 定义回调响应的数据格式为JSON格式该属性可以省略
        dataType: "json",

        // 成功响应的结果
        success : function(data){

            // 清空表格
            $("#tbuser>tbody").empty();

            //遍历处理data，可以是数组、DOM、json等;function (index, value)中index是当前元素的位置，value是值
            $.each(data,function(i,d){

                var ele='<tr id="'+d.gid+'">' +
                    '<td><input type="checkbox" name="cbkSel" id="" value="'+d.gid+'"/></td>' +
                    '<td><div id="divgId">'+d.gid+'</div></td>' +
                    '<td><div id="divgName">'+d.gname+'</div></td>' +
                    '<td><div id="divgPwd">'+d.gpwd+'</div></td>' +
                    '<td><input type="button" value="编辑" onclick="edit('+d.gid+')"  class="layui-btn"/>' +
                    '<input type="button" value="删除" onclick="delGuanliyuan('+d.gid+')" class="layui-btn"/>' +
                    '</td>' +
                    '</tr>';
                $("#tbuser>tbody").append(ele);
            });
        }
    });
}


// 获取总页数
function num(){
    var s;  //定义变量
    $.ajax({
        type:"post",
        url:"demo/guanliyuan/glychaxun",
        // 定义回调响应的数据格式为JSON格式该属性可以省略
        dataType: "json",
        async:false, // 同步请求  这样data就可以在ajax之外使用（默认为true）
        // 成功响应的结果
        success : function(data){

            s=data.length;   //获取json数据的长度
        }
    });
    //返回总页数
    return s;
}


//加载数据总数
var total =num();
//先初始化加载首页，十条数据
showReocrd(1,10);

layui.use(['laypage','jquery'], function() {

    var laypage = layui.laypage,$ = layui.$;
    $(".page").each(function(i,the){
        laypage.render({     // render 渲染
            elem: the       //注意，这里的 test1 是 ID，不用加 # 号
            ,count: total   //数据总数，从服务端得到
            , limit: 10                      //每页显示条数
            , limits: [10, 20, 30]
            // , temp: total/10+1                 // 总页数(自定义的)
            , curr: 1                        //起始页
            , groups: 3                     //连续页码个数
            , prev: '上一页'                 //上一页文本
            , netx: '下一页'                 //下一页文本
            , first: 1                      //首页文本
            , last: 9999                    //尾页文本
            , layout: ['prev', 'page', 'next','limit','refresh','skip']

            //跳转页码时调用
            , jump: function (obj, first) { //obj为当前页的属性和方法，第一次加载first为true
                //非首次加载 do something
                if (!first) {
                    //清空以前加载的数据
                    $('tbody').empty();
                    //调用加载函数加载数据
                    showReocrd(obj.curr,obj.limit);
                }
            }
        });
    })
})




