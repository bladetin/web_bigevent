$(function(){
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname:function(value){
            if(value.length >6){
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })

    // 初始化表单
    initUserInfo()

    // 提交按钮
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        var mydata = $('.layui-form').serialize()
        // console.log(data)
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:mydata,
            success:function(res){
                // console.log(res)
                if(res.status!==0){
                    return layer.msg('用户信息更新失败！')
                }
                initUserInfo()
                layer.msg('用户信息更新成功！')

                // 通过子类页面，访问父类页面的函数
                // 刷新头像的用户名
                window.parent.getUserInfo()
            }
        })

    })

    // 重置按钮
    $('#resetBtn').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    

    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res)
                // renderUserInfo(res.data)
                form.val('formUserInfo',res.data)
            }
        })
    }
    
    

})


// function renderUserInfo(data){
//     var id = data.id
//     var username = data.username
//     var nickname = data.nickname
//     var email = data.email

//     $('.layui-form [name=id]').value = id
//     $('.layui-input-block [name=username]').val(username)
//     $('.layui-input-block [name=nickname]').val(nickname) 
//     $('.layui-input-block [name=email]').val(email)

//     // $('.layui-form [name=id]').attr('value',id)
//     // $('.layui-input-block [name=username]').attr('placeholder',username)
//     // $('.layui-input-block [name=nickname]').attr('placeholder',nickname)
//     // $('.layui-input-block [name=email]').attr('placeholder',email)
// }