$(function(){
    var layer = layui.layer

    getUserInfo()

    $('#logoutBtn').on('click',function(){
        // console.log('ok')
        // layer.msg('ok')

        layer.confirm('确认退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
          });
    })
})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        // Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            // console.log(res);
            if(res.status!=0){
                return layui.layer.msg('获取用户信息失败！')
            }

            renderAvatar(res.data)
        }
        // complete: function(res){
        //     // console.log('执行了complete回调函数')
        //     // console.log(res)
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user){
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if(user.user_pic != null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avator').hide()
    } else{
        $('.layui-nav-img').hide()
        var firstStr = name[0].toUpperCase()
        $('.text-avator').html(firstStr).show()
    }
}