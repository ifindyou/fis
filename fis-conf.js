//一、再也不用手工维护了，这些工作可以自动化维护

	//开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
	//对js打包后，默认不更新页面的资源引用，开启后，打包后会自动更新资源的url;
	fis.config.set('modules.postpackager', 'simple');
	//资源的压缩 fis release -o
	//资源的合并 fis release -p
	//产出目录 fis release -d [path]
	fis.config.set('pack', {
	    '/pkg/lib.js': [
	        'js/lib/jquery.js',
	        'js/lib/underscore.js',
	        'js/lib/backbone.js',
	        'js/lib/backbone.localStorage.js',
	    ],
	    //不仅仅合并css，还可以合并css;
	    '/pkg/aio.css': '**.css'
	});

	//设置图片合并的最小间隔
	fis.config.set('settings.spriter.csssprites.margin', 20);

	// 零散资源的自动合并
	fis.config.set('settings.postpackager.simple.autoCombine', true);

	//资源的部署,fis release -D(domain) -d(产出) -m(md5) (-Ddm) output
	//部署资源面临两个情况，一个是域的改变，另一个是路径的改变
		//域
		fis.config.set("roadmap.domain", "http://static.baidu.com");
		//路径
		fis.config.set("roadmap.path", [{
		    // reg: /^\/static\/a\.css$/,
		    reg: /^\/css\/(.+?)\.css$/,
		    release: '/static/release/css/$1.css' //配置产出路径
		},{
			reg: /^\/js\/(.+?)\.js$/,
			release: '/static/release/$1.js'
		}]);
	//页面不再需要手动引入样式和脚本资源，只需要引入一个mod库即可
	//我们就实现了模块化资源的自动加载以及完全脱离后端的资源管理能力
	//查看一下网站的静态资源，我们会发现脚本、样式、图片资源都已经压缩完成,并且投放到相应的目录，而资源的定位也都更新好了。无需焦头烂额，打下命令就搞定了，是不是非常方便快捷？

//二、改变开发方式，组件化模块化开发,和依赖requirejs，angular，react来做组件化模块化不同的是，这样做将不依赖于脚本，而是依赖于构建工具的预编译，当然，也可以在构建工具里引入这些库件
	//模块化开发fis-pure,将脚本模块化，并且自动加载脚本
	//不能将模板也模块化，但可以使用插件来实现这一功能
	//基于后端的语言fis-plus等，可以实现脚本样式模板的模块化，并内聚到一起，实现组件化。

//三、本地调试数据的搭建，url转发，模拟ajax请求

//四、基于后端语言的fis，基于php的fis-plus等
	//组件化开发,将相关联的css，js和tpl内聚到一起，成为一个组件