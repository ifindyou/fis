//一、自动化维护，减少了手工维护的成本和风险

	//开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
	//对js打包后，默认不更新页面的资源引用，开启后，打包后会自动更新资源的url;
	fis.config.set('modules.postpackager', 'simple');
	//资源的压缩 fis release -o
	//资源的合并 fis release -p
	//产出目录 fis release -d [path]
	fis.config.set('pack', {
	    // '/pkg/main.js': [
	    //     'js/lib/jquery.js',
	    //     'js/lib/underscore.js',
	    //     'js/lib/backbone.js',
	    //     'js/lib/backbone.localStorage.js'
	    // ],//指定js的合并方式
	    //打包css的同时还生成雪碧图;
	    '/pkg/main.css': '**.css'//指定css的合并方式
	});

	//设置图片合并的最小间隔
	fis.config.set('settings.spriter.csssprites.margin', 20);
	// 零散资源的自动合并
	fis.config.set('settings.postpackager.simple.autoCombine', true);//按页面顺序自动压缩

	//资源的部署,fis release -D(domain) -d(产出) -m(md5) (-Ddm) output
	//部署资源面临两个情况，一个是域的改变，另一个是路径的改变
		//改变内容的域名
		fis.config.set("roadmap.domain", "http://static.baidu.com");
		//改变资源的文件夹路径
		fis.config.set("roadmap.path", [{
		    // reg: /^\/static\/a\.css$/,
		    reg: /^\/css\/(.+?)\.css$/,
		    release: '/static/release/css/$1.css' //配置产出路径
		},{
			reg: /^\/js\/(.+?)\.js$/,
			release: '/static/release/js/$1.js'
		}]);
	//查看一下网站的静态资源，我们会发现脚本、样式、图片资源都已经合并压缩完成,并且投放到相应的目录，而资源的定位也都更新好了。无需焦头烂额，打下命令就搞定了，是不是非常方便快捷？
	//所有的构建都是独立于源码目录的
	//但是index页面仍然有太多的css和js是手工维护的，有没有一个方法，让引入这些资源的方式也自动维护起来
	//这个时候需要借助fis的插件fis-pure来实现前端资源的模块化自动加载
	//页面不再需要手动引入样式和脚本资源，只需要引入一个mod库即可
	//我们就实现了模块化资源的自动加载以及完全脱离后端的资源管理能力
	

//二、改变开发方式，模块化和组件化开发,和依赖requirejs模块化不同的是，这样做将不依赖于脚本，而是依赖于构建工具的预编译
	//模块化开发fis-pure,将脚本模块化，并且自动加载脚本
	//不能将模板也模块化，但可以使用插件来实现这一功能
	//基于后端的语言fis-plus等，可以实现脚本样式模板的三者模块化，并内聚到一起，实现组件化。

//三、本地调试数据的搭建，url转发，模拟ajax请求

//四、基于后端语言的fis，基于php的fis-plus等
	//组件化开发,将相关联的css，js和tpl内聚到一起，成为一个组件
	//自动管理组件的依赖
//五、管理整站的静态资源