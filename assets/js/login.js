$(function () {

	$('#link_reg').on('click', function () {
		$('.login-box').hide().siblings('.reg-box').show();
		// $('.reg-box').show();
	});
	$('#link_login').on('click', function () {
		$('.reg-box').hide().siblings('.login-box').show();
		// $('.login-box').show();
	})


	// 从layui中获取form对象
	var form = layui.form;
    var layer = layui.layer;
	//通过form.verify()函数自定义校验规则
	form.verify({
		//自定义了一个叫做pwd的校验规则
		pwd: [/^[\S]{6,12}$/, '密码密须是6到12位，且不能出现空格'],
		repwd: function (value) {
			//拿到注册页面密码框输入的值（内容）pwd
			var pwd = $('.reg-box [name=password]').val();
			if (value !== pwd) {
				return '两次密码输入不一致！'
			}
		}
	});
	//注册
	$('#form-reg').on('submit', function (e) {
		e.preventDefault();
		let username = $('#form-reg [name=username]').val();
		let password = $('#form-reg [name=password]').val();
		$.post("/api/reguser", { username: username, password: password },
			function (res) {
				if (res.status !== 0) return layer.msg(res.message)
				layer.msg('注册成功，请登陆');
				let timer = setTimeout(function () {
					$('#link_login').click();
				}, 1000)
			},
		);
	});

	//登陆
	//ajax 方法
	$('#form-login').on('submit', function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: '/api/login',
			data: $('#form-login').serialize(),
			success: function (res) {
				if (res.status !== 0) return layer.msg(res.message);
				// layer.msg('登陆成功！');
				localStorage.setItem('token', res.token);
				location.href = "/index.html";
			}
		})

	})
	// $('#form-login').on('submit', function (e) {
	// 	e.preventDefault();
	// 	let username = $('#form-login [name=username]').val();
	// 	let password = $('#form-login [name=password]').val();
	// 	$.post("http://192.168.50.200:3007/api/login", { username: username, password: password },
	// 		function (res) {
	// 			if (res.status !== 0) return layer.msg('登陆失败！')
	// 			layer.msg('登陆成功！');
	// 			console.log(res.token);
	// 			localStorage.setItem('token',res.token);
	// 			//登陆成功跳转到主页
	// 			location.href = "./index.html"
	// 		},
	// 	);
	// })









})  // end