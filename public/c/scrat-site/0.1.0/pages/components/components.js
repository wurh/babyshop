define("scrat-site/0.1.0/pages/components/components.js",function(s,a){"use strict";a.getMarkdown=function(){return'<h2 id=user-content-%E5%8E%9F%E7%90%86>原理</h2> <blockquote> <p>scrat可以从github下载符合 <a href=http://github.com/component>component</a> 规范的模块，方便团队和项目间共享技术成果。</p> </blockquote> <p><img src=/public/c/scrat-site/0.1.0/pages/components/install_aae690b.png alt=原理示意图></p> <h2 id=user-content-%E5%AE%89%E8%A3%85>安装</h2> <p>scrat采用 <a href=http://github.com/component>component</a> 作为模块生态，因此可以用scrat来安装component组件，方便开发或团队技术共享。安装生态中的模块的步骤也非常简单：</p> <ol> <li>先在工程目录下创建 <code>component.json</code> 文件。</li> <li>使用 <code>scrat install &lt;name&gt;</code> 命令安装需要的模块即可。</li> </ol> <p><img src=/public/c/scrat-site/0.1.0/pages/modular/install_69b6e49.gif alt=安装效果></p> <p>生态中的模块名称结构是 <code>用户名/仓库名</code>，比如 <a href=https://github.com/ftlabs/fastclick>fastclick</a> 这个js库，是GitHub用户 <a href=https://github.com/ftlabs>ftlabs</a> 创建的，因此它的安装命令就是：</p> <pre><code class="hljs bash">scrat install ftlabs/fastclick\n</code></pre> <p>如果需要安装特定版本的模块，可以使用 <code>用户名/仓库名@版本号</code> 的形式。比如想安装 <a href=https://github.com/FortAwesome/Font-Awesome>font-awesome</a> 这个图标库的 <code>v3.1.1</code> 版本(当前是v4.1.0)，使用命令：</p> <pre><code class="hljs bash">scrat install FortAwesome/Font-Awesome@v3.<span class=hljs-number>1.1</span>\n</code></pre> <blockquote> <p>不得不吐槽，component生态下很多模块的发布方式不一致，有的模块会用 <code>v1.0.0</code> 来打tag，有的又没有开头的v，直接 <code>1.0.0</code>，这使得安装生态中特定版本的模块变得比较复杂，如果安装特定版本的时候失败，可以试试加上或去掉版本号前面的v。</p> </blockquote> <h2 id=user-content-%E5%BC%95%E7%94%A8>引用</h2> <p>每个生态组件都有一个 <code>component.json</code> 文件来描述模块信息，其中的 <code>name</code> 属性即为模块的引用id，安装好生态模块后，就可以在项目中通过引用这个id直接使用了。</p> <p>如果安装的是一个js组件，就可以在 <code>components</code> 目录下的js模块代码中，以fastclick模块为例：</p> <pre><code class="hljs javascript"><span class=hljs-comment>/**\n * 文件：components/foo/foo.js\n */</span>\n\n<span class=hljs-keyword>var</span> attachFastClick = <span class=hljs-built_in>require</span>(<span class=hljs-string>\'fastclick\'</span>);\nattachFastClick(document.body);\n</code></pre> <p>如果是css模块，可以在工程模块的css文件中引用，通过注释中的 <code>@require</code> 来声明依赖，以font-awesome为例：</p> <pre><code class="hljs css"><span class=hljs-comment>/**\n * 文件：components/foo/foo.css\n * @require font-awesome\n */</span>\n\n<span class=hljs-class>.foo</span> <span class=hljs-class>.fa</span> <span class=hljs-rules>{\n  <span class=hljs-rule><span class=hljs-attribute>font-size</span>:<span class=hljs-value> <span class=hljs-number>30</span>px</span></span>;\n<span class=hljs-rule>}</span></span>\n</code></pre> <blockquote> <p>更多模块化开发技巧请阅读 <a href=/#!/modular>这里</a></p> </blockquote> <h2 id=user-content-%E5%88%9B%E5%BB%BA%E7%94%9F%E6%80%81%E6%A8%A1%E5%9D%97>创建生态模块</h2> <p>任何人都可以自己推送生态模块，把自己做好的东西共享给小伙伴，步骤非常简单。比如我们想推送一个叫 <code>foo</code> 的生态模块，其步骤是：</p> <ol> <li>首先，需要有一个GitHub账号。</li> <li><p>在GitHub上创建一个叫 <code>foo</code> 的仓库，并clone到本地。</p> <pre><code class="hljs bash"> git clone https://github.com/&lt;用户名&gt;/foo\n</code></pre> </li> <li><p>clone下来的项目中创建一个 <code>component.json</code> 文件，以及我们的源码文件：</p> <pre><code class="hljs bash"> foo\n  ├─ component.json\n  ├─ icon.png\n  ├─ foo.tpl\n  ├─ foo.css\n  ├─ foo.js\n  └─ README.md\n</code></pre> </li> <li><p>在 <code>component.json</code> 加入基本描述信息，包括名称、版本、描述、主文件、其他源码文件等。用 <code>files</code> 字段标记源码文件可以在安装时过滤掉一些与工程无关的文件，比如README.md</p> <pre><code class="hljs json"> {\n   "<span class=hljs-attribute>name</span>": <span class=hljs-value><span class=hljs-string>"foo"</span></span>,\n   "<span class=hljs-attribute>version</span>": <span class=hljs-value><span class=hljs-string>"0.0.1"</span></span>,\n   "<span class=hljs-attribute>description</span>": <span class=hljs-value><span class=hljs-string>"foo module"</span></span>,\n   "<span class=hljs-attribute>main</span>": <span class=hljs-value><span class=hljs-string>"foo.js"</span></span>,\n   "<span class=hljs-attribute>files</span>": <span class=hljs-value>[\n     <span class=hljs-string>"icon.png"</span>,\n     <span class=hljs-string>"foo.tpl"</span>,\n     <span class=hljs-string>"foo.css"</span>,\n     <span class=hljs-string>"foo.js"</span>\n   ]\n </span>}\n</code></pre> </li> <li><p>如果依赖了其他模块，可以再写入到 <code>dependencies</code> 字段中：</p> <pre><code class="hljs json"> {\n   "<span class=hljs-attribute>name</span>": <span class=hljs-value><span class=hljs-string>"foo"</span></span>,\n   "<span class=hljs-attribute>version</span>": <span class=hljs-value><span class=hljs-string>"0.0.1"</span></span>,\n   "<span class=hljs-attribute>description</span>": <span class=hljs-value><span class=hljs-string>"foo module"</span></span>,\n   "<span class=hljs-attribute>main</span>": <span class=hljs-value><span class=hljs-string>"foo.js"</span></span>,\n   "<span class=hljs-attribute>files</span>": <span class=hljs-value>[\n     <span class=hljs-string>"icon.png"</span>,\n     <span class=hljs-string>"foo.tpl"</span>,\n     <span class=hljs-string>"foo.css"</span>,\n     <span class=hljs-string>"foo.js"</span>\n   ]</span>,\n   "<span class=hljs-attribute>dependencies</span>": <span class=hljs-value>{\n     "<span class=hljs-attribute>FortAwesome/Font-Awesome</span>": <span class=hljs-value><span class=hljs-string>"4.1.0"</span></span>,\n     "<span class=hljs-attribute>ftlabs/fastclick</span>": <span class=hljs-value><span class=hljs-string>"1.0.2"</span>\n   </span>}\n </span>}\n</code></pre> <p> 依赖模块请 <code>务必</code> 写准确的版本号，以保证模块本身的稳定性。</p> </li> <li><p>编写代码，实现模块功能。编码时，资源引用都是用 <code>相对路径</code> 即可。</p> </li> <li><p>将代码提交到Github：</p> <pre><code class="hljs bash"> git add -A\n git commit -m <span class=hljs-string>"first commit"</span>\n git push -u origin master\n</code></pre> </li> <li><p>最好给模块打一个tag，这样其他用户就可以按版本安装模块了，打tag时请 <code>务必</code> 保持版本号和 <code>component.json</code> 文件中描述的一致：</p> <pre><code class="hljs bash"> git tag <span class=hljs-operator>-a</span> <span class=hljs-number>0.0</span>.<span class=hljs-number>1</span> -m <span class=hljs-string>"release v0.0.1"</span>\n git push origin --tags\n</code></pre> </li> </ol> <blockquote> <p>开发模块代码时，js中可以使用scrat内置的 <code>__inline(xxx)</code> 和 <code>__uri(xxx)</code> 来 <code>内嵌</code> 和 <code>定位</code> 资源，具体用可以阅读 <a href=/#!/todo>这里</a></p> </blockquote> <h2 id=user-content-%E5%85%B6%E4%BB%96>其他</h2> <ul> <li>component生态中模块发布的规范遵守情况比较差，导致很多模块安装之后不可用，有些甚至根本安装不上，所以scrat研发小组决定收集业界比较优秀的前端开发资源并放到 <a href=https://github.com/scrat-team>scrat-team</a> 下维护和发布，为scrat开发体系提供高质量的生态模块。因此如果需要第三方模块，推荐优先从 <a href=https://github.com/scrat-team>scrat-team</a> 下获取。</li> <li>推荐每个团队根据自己的业务特点组织自己的模块生态，放在一个GitHub账户内维护，跨项目、跨团队共享十分方便。</li> <li>模块生态及版本管理是一个细思恐极的问题，遇到问题可以及时 <a href=https://github.com/scrat-team/scrat/issues>反馈</a> 给我们，一起建设高质量前端开发体系。</li> </ul>'}});