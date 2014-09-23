define("scrat-team-router/0.1.0/index.js",function(t,n,e){"use strict";function i(t){return t=t.replace(/^#!?/,"").replace(/#.*/,""),t=t.length>0&&"/"!==t[0]?"/"+t:t}function a(t){var n=0===t.indexOf("?")?t.slice(1):t,e=n.length>0?n.split("!!"):[],i={};return u(e,function(t){t=t.replace(/\+/g,"%20");var n=t.indexOf("="),e=~n?t.slice(0,n):t,a=~n?t.slice(n+1):"";try{e=f(e),a=f(a)}catch(h){}i[e]=a}),i}function h(t){var n,e=[];return u(t,function(t,n){e.push(n+"="+t)}),n=e.join("!!").replace(/\s/g,"+")}function r(t,n){var e,r,s=0===location.hash.length||/^#!/.test(location.hash),c={};if("array"===o(t)&&t.length>=0){for(this.path="";t.length;)e=t.shift(),"string"===o(e)?this.path+=i(e):c=l(c,e);this.path+=(this.path.indexOf("?")<0?"?":"&")+h(c)}else this.path=i(t);t=this.path,this.state=n||{},this.target=t?"#"+(s?"!":"")+t:t,r=t.indexOf("?"),this.pathname=~r?t.slice(0,r):t,this.search=~r?t.slice(r):"",this.queries=a(this.search),this.params={},this.dispatch=!0}function s(t,n){"function"===o(n)?s.bind.apply(s,arguments):"string"===o(t)?s.route(t,n):s.start(t)}function c(){var t=s.contexts.pop();t||(t=new r(location.hash)),s.context=t,t.dispatch!==!1&&s.dispatch(t)}var o=t("type"),u=t("each"),l=t("extend"),d=!("onhashchange"in window),p=Array.prototype.slice,f=window.decodeURIComponent;s.running=!1,s.next=null,s.context=null,s.contexts=[],s.handlers=[],s.start=function(){this.running||(this.running=!0,"addEventListener"in window?window.addEventListener("hashchange",c,!1):d||(window.onhashchange=c),c())},s.stop=function(){this.running=!1,"removeEventListener"in window?window.removeEventListener("hashchange",c,!1):d||(window.onhashchange=null)},s.bind=function(t){var n=p.call(arguments,1);u(n,function(n){this.handlers.push(this.middleware(t,n))},this)},s.unbind=function(t){var n=p.call(arguments,1);u(n,function(n){for(var e=this.handlers,i=this.next,a=0,h=e.length;h>a;a++)e[a]._pattern===t&&e[a]._handler===n&&(e.splice(a,1),i&&i.index-1<=a&&(i.index=i.index-1),a-=1,h-=1)},this)},s.reset=function(){this.next=null,this.contexts.length=0,this.handlers.length=0},s.route=function(t,n,e){"boolean"===o(n)&&(e=n,n=null);var i=new r(t,n);return i.dispatch=e,s.context.target!==i.target&&(this.contexts.push(i),location.href=i.target,d&&this.running&&c()),i},s.replace=function(t,n,e){"boolean"===o(n)&&(e=n,n=null);var i=new r(t,n);return i.dispatch=e,s.context.target!==i.target&&(this.contexts.push(i),location.replace(i.target),d&&this.running&&c()),i},s.middleware=function(t,n){function e(e,a){i.match(t,e.pathname,e.params)?n(e,a):a()}var i=this;return e._pattern=t,e._handler=n,e},s.back=function(){history.back(),d&&this.route(location.hash)},s.match=function(t,n,e){var i=[];t=t.replace(/:(\w+)/g,function(t,n){return i.push(n),"([^/]+)"}).replace(/\*/g,"(.*)")||"",t="^"+t+"$";var a=n.match(new RegExp(t));return a?(u(i,function(t,n){e[t]=a[n+1]}),!0):!1},s.dispatch=function(t){function n(){var i=e[n.index++];i&&i(t,n)}var e=this.handlers;this.next&&(this.next.index=e.length),this.next=n,n.index=0,n()},s._normalize=i,s._parseSearch=a,s._Context=r,e.exports=s});