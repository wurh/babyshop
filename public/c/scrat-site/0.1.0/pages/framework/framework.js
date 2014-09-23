define("scrat-site/0.1.0/pages/framework/framework.js",function(s,a){"use strict";a.getMarkdown=function(){return"<blockquote> <p>前端模块化框架肩负着 <code>模块管理</code>、<code>资源加载</code> 两项重要责任，与开发、工具、部署、性能优化等工程环节都有着非常紧密的联系。因此，模块化框架的设计应该最高优先级考虑工程需要。</p> </blockquote> <h2 id=user-content-scrat.js>scrat.js</h2> <blockquote> <p><a href=https://github.com/scrat-team/scrat.js>https://github.com/scrat-team/scrat.js</a></p> </blockquote> <p>scrat开发体系采用 <a href=https://github.com/scrat-team/scrat.js>scrat.js</a> 作为模块化框架，与 <a href=https://www.npmjs.org/package/scrat>开发工具</a> 紧密配合，从而实现 <code>js/css依赖管理</code>、<code>请求合并</code>、<code>按需加载</code>、<code>本地缓存</code>等功能，性能优化效果明显，具有较强的工程特性。</p> <blockquote> <p>之所以没有使用已有的模块化框架（比如<a href=\"http://requirejs.org/\">requirejs</a>），完全是出于工程需要，而非<a href=http://en.wikipedia.org/wiki/Not_invented_here>NIH</a>思想作祟，有兴趣一探究竟的同学可以阅读这篇文章：《<a href=https://github.com/fouber/blog/issues/4>前端工程与模块化框架</a>》。</p> </blockquote> <h2 id=user-content-%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86>工作原理</h2> <h3 id=user-content-1.%20%E6%BA%90%E7%A0%81%E7%A4%BA%E4%BE%8B>1. 源码示例</h3> <blockquote> <p>像写nodejs一样书写js模块</p> </blockquote> <p><img src=/public/c/scrat-site/0.1.0/pages/framework/source_70bf627.png alt=源码效果></p> <p>其中<code>__FRAMEWORK_CONFIG__</code>变量会在构建时被工具替换为框架所需的各种配置数据。</p> <h3 id=user-content-2.%20%E6%9E%84%E5%BB%BA%E5%90%8E%E4%BB%A3%E7%A0%81>2. 构建后代码</h3> <blockquote> <p>调整部署位置，自动包裹define函数，并把别名、依赖关系等信息输出给框架</p> </blockquote> <p><img src=/public/c/scrat-site/0.1.0/pages/framework/release_16fc6fb.png alt=构建后代码></p> <h3 id=user-content-3.%20%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82>3. 网络请求</h3> <blockquote> <p>由于框架通过<code>require.config</code>接口知道了所有模块的依赖关系，因此在调用require.async加载模块时，可以找到其依赖的所有js、css模块，再借助combo服务合并请求加载，一举实现按需加载和请求合并的功能。</p> </blockquote> <p>上述示例页面执行<code>require.async(&#39;a&#39;, callback);</code>时会发起两个combo请求(js与css)：</p> <ul> <li><a href=http://www.example.com/??proj/1.0.0/b.css,proj/1.0.0/a.css>http://www.example.com/??proj/1.0.0/b.css,proj/1.0.0/a.css</a></li> <li><a href=http://www.example.com/??proj/1.0.0/b.js,proj/1.0.0/a.js>http://www.example.com/??proj/1.0.0/b.js,proj/1.0.0/a.js</a></li> </ul> <p>请求全部加载完成后才会触发calblack函数。这种工具与框架配合解决模块化静态资源管理的方式，将工程性与前端性能发挥到了极致。开启comboe请求的具体配置方法请参考 <a href=\"/#!/settings?title=framework.combo\">这里</a>。</p> <h3 id=user-content-4.%20%E6%9C%AC%E5%9C%B0%E7%BC%93%E5%AD%98>4. 本地缓存</h3> <p>当前 <code>require.config</code> 中配置了 <code>cache</code> 选项为 <code>true</code> 时，scrat会将请求回来的模块化js、css按文件存储到localstorage中，这样用户再次访问页面就不会发起请求，从而加快二次访问的展现速度。开启本地缓存的具体配置方法请参考 <a href=\"/#!/settings?title=framework.cache\">这里</a>。</p> <h2 id=user-content-%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E>接口说明</h2> <h3 id=user-content-require.config(options)>require.config(options)</h3> <p>说明：设置并返回 scrat.js 配置选项</p> <ul> <li>@param {object} [options] - 配置选项</li> <li>@returns {object} options</li> <li>配置项说明：<ul> <li>name: 项目名称，string类型</li> <li>version: 项目版本，string类型</li> <li>combo: 是否以combo形式发起请求，boolean类型，默认为false</li> <li>cache: 是否开启localstorage缓存，boolean类型，默认为false</li> <li>hash: 构建时生成的缓存更新戳</li> <li>urlPattern: 单个资源加载路径模式，string类型，默认为<code>/c/%s</code></li> <li>comboPattern: combo请求的路径形式，string类型，默认为<code>/??%s</code></li> <li>alias: 模块别名表</li> <li>deps: 模块依赖表</li> </ul> </li> </ul> <blockquote> <p>注意，require.config接口是前端框架与开发工具配合的衔接部分，这里的数据不用开发者自己配置，也不用关心太多，使用时只要在代码中书写 require.config(__FRAMEWORK_CONFIG__)，工具在构建时会将<code>__FRAMEWORK_CONFIG__</code>替换成配置信息传递给框架，从而实现模块化管理。</p> </blockquote> <p>示例：</p> <pre><code class=\"hljs javascript\"><span class=hljs-comment>/**\n * scrat 在编译过程中会自动替换 __FRAMEWORK_CONFIG__ 为配置数据\n * 所以源码通常写成require.config(__FRAMEWORK_CONFIG__);构建\n * 后得到如下结果\n */</span>\n<span class=hljs-built_in>require</span>.config({\n    cache: <span class=hljs-literal>true</span>, <span class=hljs-comment>// 开启 localStorage 缓存</span>\n    urlPattern: <span class=hljs-string>'/static/%s'</span>, <span class=hljs-comment>// 资源加载路径</span>\n    comboPattern: <span class=hljs-string>'/combo??%s'</span>, <span class=hljs-comment>// Combo 服务路径</span>\n    alias: {...}, <span class=hljs-comment>//别名表</span>\n    deps: {...} <span class=hljs-comment>//依赖表</span>\n});\n</code></pre> <h3 id=user-content-require.async(modules%2C%20callback)>require.async(modules, callback)</h3> <p>说明：加载并运行一组 JS 模块</p> <ul> <li>@param {string|Array} modules - 要加载并运行的模块列表</li> <li>@param {function} callback - 全部模块及其依赖加载成功后的回调函数</li> </ul> <p>示例：</p> <pre><code class=\"hljs javascript\"><span class=hljs-built_in>require</span>.async([<span class=hljs-string>'ajax'</span>, <span class=hljs-string>'event'</span>], <span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-params>(ajax, event)</span> {</span>\n    ajax.get(<span class=hljs-string>'/someObjs'</span>, {length: <span class=hljs-number>10</span>}, <span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-params>(data)</span> {</span>\n        event.emit(<span class=hljs-string>'done'</span>, data);\n    });\n});\n</code></pre> <h3 id=user-content-define(id%2C%20factory)>define(id, factory)</h3> <p>说明：定义一个 JS 模块</p> <ul> <li>@param {string} id - 模块 id</li> <li>@param {function} factory - 模块的工厂函数</li> </ul> <blockquote> <p>在scrat中，工具会对每个模块化文件自动包裹define函数，工程师实际上是不会接触到define函数的。</p> </blockquote> <p>示例：</p> <pre><code class=\"hljs javascript\">define(<span class=hljs-string>'hello'</span>, <span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-params>(require, exports, module)</span> {</span>\n    module.exports = <span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-params>(name)</span> {</span>\n        alert(<span class=hljs-string>'Hello '</span> + name);\n    };\n});\n</code></pre>"}});