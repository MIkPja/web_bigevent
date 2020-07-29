
// 每次调用$.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用ajaxPrefiliter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$(function () {
	// 在发起真正的 ajax 请求之前，统一拼接请求的根路径
	$.ajaxPrefilter(function (options) {
		options.url = "http://192.168.50.200:3007" + options.url;
		//options.url === 拼接前的接口地址
	})
})