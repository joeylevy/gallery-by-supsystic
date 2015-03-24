/*global jQuery*/
(function (app, $) {

    /** Notify.js - v0.3.1 - 2014/06/29
     * http://notifyjs.com/
     * Copyright (c) 2014 Jaime Pillora - MIT
     */
    (function(t,i,n,e){"use strict";var r,o,s,a,l,h,c,p,u,d,f,A,m,w,g,y,b,v,x,C,S,E,M,k,H,D,F,T=[].indexOf||function(t){for(var i=0,n=this.length;n>i;i++)if(i in this&&this[i]===t)return i;return-1};S="notify",C=S+"js",s=S+"!blank",M={t:"top",m:"middle",b:"bottom",l:"left",c:"center",r:"right"},m=["l","c","r"],F=["t","m","b"],b=["t","b","l","r"],v={t:"b",m:null,b:"t",l:"r",c:null,r:"l"},x=function(t){var i;return i=[],n.each(t.split(/\W+/),function(t,n){var r;return r=n.toLowerCase().charAt(0),M[r]?i.push(r):e}),i},D={},a={name:"core",html:'<div class="'+C+'-wrapper">\n  <div class="'+C+'-arrow"></div>\n  <div class="'+C+'-container"></div>\n</div>',css:"."+C+"-corner {\n  position: fixed;\n  margin: 5px;\n  z-index: 1050;\n}\n\n."+C+"-corner ."+C+"-wrapper,\n."+C+"-corner ."+C+"-container {\n  position: relative;\n  display: block;\n  height: inherit;\n  width: inherit;\n  margin: 3px;\n}\n\n."+C+"-wrapper {\n  z-index: 1;\n  position: absolute;\n  display: inline-block;\n  height: 0;\n  width: 0;\n}\n\n."+C+"-container {\n  display: none;\n  z-index: 1;\n  position: absolute;\n}\n\n."+C+"-hidable {\n  cursor: pointer;\n}\n\n[data-notify-text],[data-notify-html] {\n  position: relative;\n}\n\n."+C+"-arrow {\n  position: absolute;\n  z-index: 2;\n  width: 0;\n  height: 0;\n}"},H={"border-radius":["-webkit-","-moz-"]},f=function(t){return D[t]},o=function(i,e){var r,o,s,a;if(!i)throw"Missing Style name";if(!e)throw"Missing Style definition";if(!e.html)throw"Missing Style HTML";return(null!=(a=D[i])?a.cssElem:void 0)&&(t.console&&console.warn(""+S+": overwriting style '"+i+"'"),D[i].cssElem.remove()),e.name=i,D[i]=e,r="",e.classes&&n.each(e.classes,function(t,i){return r+="."+C+"-"+e.name+"-"+t+" {\n",n.each(i,function(t,i){return H[t]&&n.each(H[t],function(n,e){return r+="  "+e+t+": "+i+";\n"}),r+="  "+t+": "+i+";\n"}),r+="}\n"}),e.css&&(r+="/* styles for "+e.name+" */\n"+e.css),r&&(e.cssElem=y(r),e.cssElem.attr("id","notify-"+e.name)),s={},o=n(e.html),u("html",o,s),u("text",o,s),e.fields=s},y=function(t){var i;i=l("style"),i.attr("type","text/css"),n("head").append(i);try{i.html(t)}catch(e){i[0].styleSheet.cssText=t}return i},u=function(t,i,e){var r;return"html"!==t&&(t="text"),r="data-notify-"+t,p(i,"["+r+"]").each(function(){var i;return i=n(this).attr(r),i||(i=s),e[i]=t})},p=function(t,i){return t.is(i)?t:t.find(i)},E={clickToHide:!0,autoHide:!0,autoHideDelay:5e3,arrowShow:!0,arrowSize:5,breakNewLines:!0,elementPosition:"bottom",globalPosition:"top right",style:"bootstrap",className:"error",showAnimation:"slideDown",showDuration:400,hideAnimation:"slideUp",hideDuration:200,gap:5},g=function(t,i){var e;return e=function(){},e.prototype=t,n.extend(!0,new e,i)},h=function(t){return n.extend(E,t)},l=function(t){return n("<"+t+"></"+t+">")},A={},d=function(t){var i;return t.is("[type=radio]")&&(i=t.parents("form:first").find("[type=radio]").filter(function(i,e){return n(e).attr("name")===t.attr("name")}),t=i.first()),t},w=function(t,i,n){var r,o;if("string"==typeof n)n=parseInt(n,10);else if("number"!=typeof n)return;if(!isNaN(n))return r=M[v[i.charAt(0)]],o=i,t[r]!==e&&(i=M[r.charAt(0)],n=-n),t[i]===e?t[i]=n:t[i]+=n,null},k=function(t,i,n){if("l"===t||"t"===t)return 0;if("c"===t||"m"===t)return n/2-i/2;if("r"===t||"b"===t)return n-i;throw"Invalid alignment"},c=function(t){return c.e=c.e||l("div"),c.e.text(t).html()},r=function(){function t(t,i,e){"string"==typeof e&&(e={className:e}),this.options=g(E,n.isPlainObject(e)?e:{}),this.loadHTML(),this.wrapper=n(a.html),this.options.clickToHide&&this.wrapper.addClass(""+C+"-hidable"),this.wrapper.data(C,this),this.arrow=this.wrapper.find("."+C+"-arrow"),this.container=this.wrapper.find("."+C+"-container"),this.container.append(this.userContainer),t&&t.length&&(this.elementType=t.attr("type"),this.originalElement=t,this.elem=d(t),this.elem.data(C,this),this.elem.before(this.wrapper)),this.container.hide(),this.run(i)}return t.prototype.loadHTML=function(){var t;return t=this.getStyle(),this.userContainer=n(t.html),this.userFields=t.fields},t.prototype.show=function(t,i){var n,r,o,s,a,l=this;if(r=function(){return t||l.elem||l.destroy(),i?i():e},a=this.container.parent().parents(":hidden").length>0,o=this.container.add(this.arrow),n=[],a&&t)s="show";else if(a&&!t)s="hide";else if(!a&&t)s=this.options.showAnimation,n.push(this.options.showDuration);else{if(a||t)return r();s=this.options.hideAnimation,n.push(this.options.hideDuration)}return n.push(r),o[s].apply(o,n)},t.prototype.setGlobalPosition=function(){var t,i,e,r,o,s,a,h;return h=this.getPosition(),a=h[0],s=h[1],o=M[a],t=M[s],r=a+"|"+s,i=A[r],i||(i=A[r]=l("div"),e={},e[o]=0,"middle"===t?e.top="45%":"center"===t?e.left="45%":e[t]=0,i.css(e).addClass(""+C+"-corner"),n("body").append(i)),i.prepend(this.wrapper)},t.prototype.setElementPosition=function(){var t,i,r,o,s,a,l,h,c,p,u,d,f,A,g,y,x,C,S,E,H,D,z,Q,B,R,N,P,U;for(z=this.getPosition(),E=z[0],C=z[1],S=z[2],u=this.elem.position(),h=this.elem.outerHeight(),d=this.elem.outerWidth(),c=this.elem.innerHeight(),p=this.elem.innerWidth(),Q=this.wrapper.position(),s=this.container.height(),a=this.container.width(),A=M[E],y=v[E],x=M[y],l={},l[x]="b"===E?h:"r"===E?d:0,w(l,"top",u.top-Q.top),w(l,"left",u.left-Q.left),U=["top","left"],B=0,N=U.length;N>B;B++)H=U[B],g=parseInt(this.elem.css("margin-"+H),10),g&&w(l,H,g);if(f=Math.max(0,this.options.gap-(this.options.arrowShow?r:0)),w(l,x,f),this.options.arrowShow){for(r=this.options.arrowSize,i=n.extend({},l),t=this.userContainer.css("border-color")||this.userContainer.css("background-color")||"white",R=0,P=b.length;P>R;R++)H=b[R],D=M[H],H!==y&&(o=D===A?t:"transparent",i["border-"+D]=""+r+"px solid "+o);w(l,M[y],r),T.call(b,C)>=0&&w(i,M[C],2*r)}else this.arrow.hide();return T.call(F,E)>=0?(w(l,"left",k(C,a,d)),i&&w(i,"left",k(C,r,p))):T.call(m,E)>=0&&(w(l,"top",k(C,s,h)),i&&w(i,"top",k(C,r,c))),this.container.is(":visible")&&(l.display="block"),this.container.removeAttr("style").css(l),i?this.arrow.removeAttr("style").css(i):e},t.prototype.getPosition=function(){var t,i,n,e,r,o,s,a;if(i=this.options.position||(this.elem?this.options.elementPosition:this.options.globalPosition),t=x(i),0===t.length&&(t[0]="b"),n=t[0],0>T.call(b,n))throw"Must be one of ["+b+"]";return(1===t.length||(e=t[0],T.call(F,e)>=0&&(r=t[1],0>T.call(m,r)))||(o=t[0],T.call(m,o)>=0&&(s=t[1],0>T.call(F,s))))&&(t[1]=(a=t[0],T.call(m,a)>=0?"m":"l")),2===t.length&&(t[2]=t[1]),t},t.prototype.getStyle=function(t){var i;if(t||(t=this.options.style),t||(t="default"),i=D[t],!i)throw"Missing style: "+t;return i},t.prototype.updateClasses=function(){var t,i;return t=["base"],n.isArray(this.options.className)?t=t.concat(this.options.className):this.options.className&&t.push(this.options.className),i=this.getStyle(),t=n.map(t,function(t){return""+C+"-"+i.name+"-"+t}).join(" "),this.userContainer.attr("class",t)},t.prototype.run=function(t,i){var r,o,a,l,h,u=this;if(n.isPlainObject(i)?n.extend(this.options,i):"string"===n.type(i)&&(this.options.className=i),this.container&&!t)return this.show(!1),e;if(this.container||t){o={},n.isPlainObject(t)?o=t:o[s]=t;for(a in o)r=o[a],l=this.userFields[a],l&&("text"===l&&(r=c(r),this.options.breakNewLines&&(r=r.replace(/\n/g,"<br/>"))),h=a===s?"":"="+a,p(this.userContainer,"[data-notify-"+l+h+"]").html(r));return this.updateClasses(),this.elem?this.setElementPosition():this.setGlobalPosition(),this.show(!0),this.options.autoHide?(clearTimeout(this.autohideTimer),this.autohideTimer=setTimeout(function(){return u.show(!1)},this.options.autoHideDelay)):e}},t.prototype.destroy=function(){return this.wrapper.remove()},t}(),n[S]=function(t,i,e){return t&&t.nodeName||t.jquery?n(t)[S](i,e):(e=i,i=t,new r(null,i,e)),t},n.fn[S]=function(t,i){return n(this).each(function(){var e;return e=d(n(this)).data(C),e?e.run(t,i):new r(n(this),t,i)}),this},n.extend(n[S],{defaults:h,addStyle:o,pluginOptions:E,getStyle:f,insertCSS:y}),n(function(){return y(a.css).attr("id","core-notify"),n(i).on("click","."+C+"-hidable",function(){return n(this).trigger("notify-hide")}),n(i).on("notify-hide","."+C+"-wrapper",function(){var t;return null!=(t=n(this).data(C))?t.show(!1):void 0})})})(window,document,jQuery),$.notify.addStyle("bootstrap",{html:"<div>\n<span data-notify-text></span>\n</div>",classes:{base:{"font-weight":"bold",padding:"8px 15px 8px 14px","text-shadow":"0 1px 0 rgba(255, 255, 255, 0.5)","background-color":"#fcf8e3",border:"1px solid #fbeed5","border-radius":"4px","white-space":"nowrap","padding-left":"25px","background-repeat":"no-repeat","background-position":"3px 7px"},error:{color:"#B94A48","background-color":"#F2DEDE","border-color":"#EED3D7","background-image":"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtRJREFUeNqkVc1u00AQHq+dOD+0poIQfkIjalW0SEGqRMuRnHos3DjwAH0ArlyQeANOOSMeAA5VjyBxKBQhgSpVUKKQNGloFdw4cWw2jtfMOna6JOUArDTazXi/b3dm55socPqQhFka++aHBsI8GsopRJERNFlY88FCEk9Yiwf8RhgRyaHFQpPHCDmZG5oX2ui2yilkcTT1AcDsbYC1NMAyOi7zTX2Agx7A9luAl88BauiiQ/cJaZQfIpAlngDcvZZMrl8vFPK5+XktrWlx3/ehZ5r9+t6e+WVnp1pxnNIjgBe4/6dAysQc8dsmHwPcW9C0h3fW1hans1ltwJhy0GxK7XZbUlMp5Ww2eyan6+ft/f2FAqXGK4CvQk5HueFz7D6GOZtIrK+srupdx1GRBBqNBtzc2AiMr7nPplRdKhb1q6q6zjFhrklEFOUutoQ50xcX86ZlqaZpQrfbBdu2R6/G19zX6XSgh6RX5ubyHCM8nqSID6ICrGiZjGYYxojEsiw4PDwMSL5VKsC8Yf4VRYFzMzMaxwjlJSlCyAQ9l0CW44PBADzXhe7xMdi9HtTrdYjFYkDQL0cn4Xdq2/EAE+InCnvADTf2eah4Sx9vExQjkqXT6aAERICMewd/UAp/IeYANM2joxt+q5VI+ieq2i0Wg3l6DNzHwTERPgo1ko7XBXj3vdlsT2F+UuhIhYkp7u7CarkcrFOCtR3H5JiwbAIeImjT/YQKKBtGjRFCU5IUgFRe7fF4cCNVIPMYo3VKqxwjyNAXNepuopyqnld602qVsfRpEkkz+GFL1wPj6ySXBpJtWVa5xlhpcyhBNwpZHmtX8AGgfIExo0ZpzkWVTBGiXCSEaHh62/PoR0p/vHaczxXGnj4bSo+G78lELU80h1uogBwWLf5YlsPmgDEd4M236xjm+8nm4IuE/9u+/PH2JXZfbwz4zw1WbO+SQPpXfwG/BBgAhCNZiSb/pOQAAAAASUVORK5CYII=)"},success:{color:"#468847","background-color":"#DFF0D8","border-color":"#D6E9C6","background-image":"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAutJREFUeNq0lctPE0Ecx38zu/RFS1EryqtgJFA08YCiMZIAQQ4eRG8eDGdPJiYeTIwHTfwPiAcvXIwXLwoXPaDxkWgQ6islKlJLSQWLUraPLTv7Gme32zoF9KSTfLO7v53vZ3d/M7/fIth+IO6INt2jjoA7bjHCJoAlzCRw59YwHYjBnfMPqAKWQYKjGkfCJqAF0xwZjipQtA3MxeSG87VhOOYegVrUCy7UZM9S6TLIdAamySTclZdYhFhRHloGYg7mgZv1Zzztvgud7V1tbQ2twYA34LJmF4p5dXF1KTufnE+SxeJtuCZNsLDCQU0+RyKTF27Unw101l8e6hns3u0PBalORVVVkcaEKBJDgV3+cGM4tKKmI+ohlIGnygKX00rSBfszz/n2uXv81wd6+rt1orsZCHRdr1Imk2F2Kob3hutSxW8thsd8AXNaln9D7CTfA6O+0UgkMuwVvEFFUbbAcrkcTA8+AtOk8E6KiQiDmMFSDqZItAzEVQviRkdDdaFgPp8HSZKAEAL5Qh7Sq2lIJBJwv2scUqkUnKoZgNhcDKhKg5aH+1IkcouCAdFGAQsuWZYhOjwFHQ96oagWgRoUov1T9kRBEODAwxM2QtEUl+Wp+Ln9VRo6BcMw4ErHRYjH4/B26AlQoQQTRdHWwcd9AH57+UAXddvDD37DmrBBV34WfqiXPl61g+vr6xA9zsGeM9gOdsNXkgpEtTwVvwOklXLKm6+/p5ezwk4B+j6droBs2CsGa/gNs6RIxazl4Tc25mpTgw/apPR1LYlNRFAzgsOxkyXYLIM1V8NMwyAkJSctD1eGVKiq5wWjSPdjmeTkiKvVW4f2YPHWl3GAVq6ymcyCTgovM3FzyRiDe2TaKcEKsLpJvNHjZgPNqEtyi6mZIm4SRFyLMUsONSSdkPeFtY1n0mczoY3BHTLhwPRy9/lzcziCw9ACI+yql0VLzcGAZbYSM5CCSZg1/9oc/nn7+i8N9p/8An4JMADxhH+xHfuiKwAAAABJRU5ErkJggg==)"},info:{color:"#3A87AD","background-color":"#D9EDF7","border-color":"#BCE8F1","background-image":"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYFAhkSsdes/QAAA8dJREFUOMvVlGtMW2UYx//POaWHXg6lLaW0ypAtw1UCgbniNOLcVOLmAjHZolOYlxmTGXVZdAnRfXQm+7SoU4mXaOaiZsEpC9FkiQs6Z6bdCnNYruM6KNBw6YWewzl9z+sHImEWv+vz7XmT95f/+3/+7wP814v+efDOV3/SoX3lHAA+6ODeUFfMfjOWMADgdk+eEKz0pF7aQdMAcOKLLjrcVMVX3xdWN29/GhYP7SvnP0cWfS8caSkfHZsPE9Fgnt02JNutQ0QYHB2dDz9/pKX8QjjuO9xUxd/66HdxTeCHZ3rojQObGQBcuNjfplkD3b19Y/6MrimSaKgSMmpGU5WevmE/swa6Oy73tQHA0Rdr2Mmv/6A1n9w9suQ7097Z9lM4FlTgTDrzZTu4StXVfpiI48rVcUDM5cmEksrFnHxfpTtU/3BFQzCQF/2bYVoNbH7zmItbSoMj40JSzmMyX5qDvriA7QdrIIpA+3cdsMpu0nXI8cV0MtKXCPZev+gCEM1S2NHPvWfP/hL+7FSr3+0p5RBEyhEN5JCKYr8XnASMT0xBNyzQGQeI8fjsGD39RMPk7se2bd5ZtTyoFYXftF6y37gx7NeUtJJOTFlAHDZLDuILU3j3+H5oOrD3yWbIztugaAzgnBKJuBLpGfQrS8wO4FZgV+c1IxaLgWVU0tMLEETCos4xMzEIv9cJXQcyagIwigDGwJgOAtHAwAhisQUjy0ORGERiELgG4iakkzo4MYAxcM5hAMi1WWG1yYCJIcMUaBkVRLdGeSU2995TLWzcUAzONJ7J6FBVBYIggMzmFbvdBV44Corg8vjhzC+EJEl8U1kJtgYrhCzgc/vvTwXKSib1paRFVRVORDAJAsw5FuTaJEhWM2SHB3mOAlhkNxwuLzeJsGwqWzf5TFNdKgtY5qHp6ZFf67Y/sAVadCaVY5YACDDb3Oi4NIjLnWMw2QthCBIsVhsUTU9tvXsjeq9+X1d75/KEs4LNOfcdf/+HthMnvwxOD0wmHaXr7ZItn2wuH2SnBzbZAbPJwpPx+VQuzcm7dgRCB57a1uBzUDRL4bfnI0RE0eaXd9W89mpjqHZnUI5Hh2l2dkZZUhOqpi2qSmpOmZ64Tuu9qlz/SEXo6MEHa3wOip46F1n7633eekV8ds8Wxjn37Wl63VVa+ej5oeEZ/82ZBETJjpJ1Rbij2D3Z/1trXUvLsblCK0XfOx0SX2kMsn9dX+d+7Kf6h8o4AIykuffjT8L20LU+w4AZd5VvEPY+XpWqLV327HR7DzXuDnD8r+ovkBehJ8i+y8YAAAAASUVORK5CYII=)"},warn:{color:"#C09853","background-color":"#FCF8E3","border-color":"#FBEED5","background-image":"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABJlBMVEXr6eb/2oD/wi7/xjr/0mP/ykf/tQD/vBj/3o7/uQ//vyL/twebhgD/4pzX1K3z8e349vK6tHCilCWbiQymn0jGworr6dXQza3HxcKkn1vWvV/5uRfk4dXZ1bD18+/52YebiAmyr5S9mhCzrWq5t6ufjRH54aLs0oS+qD751XqPhAybhwXsujG3sm+Zk0PTwG6Shg+PhhObhwOPgQL4zV2nlyrf27uLfgCPhRHu7OmLgAafkyiWkD3l49ibiAfTs0C+lgCniwD4sgDJxqOilzDWowWFfAH08uebig6qpFHBvH/aw26FfQTQzsvy8OyEfz20r3jAvaKbhgG9q0nc2LbZxXanoUu/u5WSggCtp1anpJKdmFz/zlX/1nGJiYmuq5Dx7+sAAADoPUZSAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfdBgUBGhh4aah5AAAAlklEQVQY02NgoBIIE8EUcwn1FkIXM1Tj5dDUQhPU502Mi7XXQxGz5uVIjGOJUUUW81HnYEyMi2HVcUOICQZzMMYmxrEyMylJwgUt5BljWRLjmJm4pI1hYp5SQLGYxDgmLnZOVxuooClIDKgXKMbN5ggV1ACLJcaBxNgcoiGCBiZwdWxOETBDrTyEFey0jYJ4eHjMGWgEAIpRFRCUt08qAAAAAElFTkSuQmCC)"}}});

    function Controller() {
        this.$container = $('.form-tabs');
        this.tabs = this.getAvailableTabs();
        this.$currentTab = null;
        this.$currentTarget = null;
        this.strToBool = function(value) {
            if(value == 'true') {
                return true;
            } else {
                return false;
            }
        }

        this.init();
    }

    Controller.prototype.init = function () {
        var lastTab = this.getCookie('lastTab');

        if (!lastTab) {
            this.$currentTab = this.tabs[Object.keys(this.tabs)[0]];
            this.$currentTarget = $('.change-tab').first();
        } else {
            this.$currentTarget = $('.change-tab[href="' + lastTab + '"]');
            this.$currentTab = $('[data-tab="' + lastTab + '"]');
        }


        this.hideTabs();
        this.$currentTab.fadeIn();
        this.$currentTarget.addClass('active');
    };

    Controller.prototype.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    Controller.prototype.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : null;
    };

    Controller.prototype.setCookie = function (name, value) {
        document.cookie = name + '=' + encodeURIComponent(value);
    }

    Controller.prototype.getAvailableTabs = function () {
        var tabs = {};

        $.each($('[data-tab]'), function (index, tab) {
            tabs[$(tab).data('tab')] = $(tab);
        });

        return tabs;
    };

    Controller.prototype.hideTabs = function () {
        $.each(this.tabs, function () { this.hide() });
    };

    Controller.prototype.changeTab = function (event) {
        event.preventDefault();

        this.hideTabs();

        this.$currentTarget.removeClass('active');

        this.$currentTarget = $(event.currentTarget);
        this.$currentTarget.addClass('active');

        this.$currentTab = this.tabs[this.$currentTarget.attr('href')];
        this.$currentTab.show();

        this.setCookie('lastTab', this.$currentTarget.attr('href'));
    };

    Controller.prototype.remove = function (event) {
        if (!confirm('Are you sure?')) {
            event.preventDefault();
        }
    };

    Controller.prototype.saveButton = function() {
        $('#btnSave').on('click', function() {
            document.forms['form-settings'].submit();
        });
    }

    Controller.prototype.togglePhotoHeightWidth = function () {
        var $optionsHeight = $('[name="area[photo_height]"], [name="area[photo_height_unit]"]'),
            $optionsWidth = $('[name="area[photo_width]"], [name="area[photo_width_unit]"]');

        $optionsHeight.parents('tr').hide();

        if($(':selected', this).val() == '2') {
            $($optionsWidth[0]).val('auto');
            $optionsWidth.attr('disabled', 'disabled');
        }

        if ($(':selected', this).val() != '2' && $($optionsWidth[0]).val() == 'auto') {
            $optionsWidth.removeAttr('disabled');
            $($optionsWidth[0]).val($($optionsHeight[0]).val());
        }
        if ($(':selected', this).val() != '1') {
            $optionsHeight.parents('tr').show();
        }
    };

    Controller.prototype.setInputColor = (function() {
        $('input[type="color"]').each(function() {
            if(navigator.userAgent.match(/Trident\/7\./)) {
                $(this).css('background-color', $(this).val());
            }
        });
    });

    Controller.prototype.toggleSlideShow = function () {
        var $options = $('[name="box[slideshowSpeed]"], [name="box[slideshowAuto]"]');
        $options.parents('tr').hide();

        if ($('[name="box[slideshow]"]:checked').val() === '1') {
            $options.parents('tr').show();
        }
    };

    Controller.prototype.togglePopupTheme = function (value) {
        var $boxType = $('[name="box[type]"]');

        if(value == 'theme_6') {
            $boxType.attr('value', '1');
        } else {
            $boxType.attr('value', '0');
        }
    };

    Controller.prototype.removePresetRequest = function () {
        var presetId = $('#presetId').val(),
            request = app.Ajax.Post({
                module: 'galleries',
                action: 'removePreset'
        });

        request.add('preset_id', presetId);

        return request;
    };

    Controller.prototype.initSaveDialog = function () {
        $('#saveDialog').dialog({
            width:    350,
            autoOpen: false,
            modal:    true,
            buttons:  {
                Save:   function () {
                    var $settingsId  = $('#settingsId'),
                        $presetTitle = $('#presetTitle'),
                        request = app.Ajax.Post(
                            {
                                module: 'galleries',
                                action: 'savePreset'
                            }
                        );

                    // Close the dialog and show error if the settings isn't yet saved to the database.
                    if ($settingsId.val() === 'undefined') {
                        $.jGrowl('You must to save the settings first.');
                        $(this).dialog('close');
                    }

                    request.add('settings_id', $settingsId.val());
                    request.add('title', $presetTitle.val());

                    request.send($.proxy(function (response) {
                        if (response.message) {
                            $.jGrowl(response.message);
                        }

                        if (!response.error) {
                            window.location.reload(true);
                        }

                        $(this).dialog('close');
                    }, this));
                },
                Cancel: function () {
                    $(this).dialog('close');
                }
            }
        });
    };

    Controller.prototype.openSaveDialog = function () {
        $('#saveDialog').dialog('open');
    };

    Controller.prototype.initDeleteDialog = function () {
        var controller = this;

        $('#deletePreset').dialog({
            width:    350,
            autoOpen: false,
            modal:    true,
            buttons:  {
                Delete: function () {
                    var request = controller.removePresetRequest();

                    request.send($.proxy(function (response) {
                        if (response.message) {
                            $.jGrowl(response.message);
                        }

                        if (!response.error) {
                            window.location.reload(true);
                        }

                        $(this).dialog('close');
                    }, this));
                },
                Cancel: function () {
                    $(this).dialog('close');
                }
            }
        });
    };

    Controller.prototype.openDeleteDialog = function () {
        $('#deletePreset').dialog('open');
    };

    Controller.prototype.initLoadDialog = function () {
        var controller = this;

        $("#loadPreset").dialog({
            width:    350,
            autoOpen: false,
            modal:    true,
            buttons:  {
                Cancel: function () {
                    $(this).dialog('close');
                },
                Load: function () {
                    var galleryId,
                        presetId,
                        $presetsList = $('#presetList'),
                        request = app.Ajax.Post({
                            module: 'galleries',
                            action: 'applyPreset'
                        });

                    // Get gallery Id from the browser's query string.
                    galleryId = parseInt(controller.getParameterByName('gallery_id'), 10);

                    // Get preset id from the preset list.
                    presetId = parseInt($presetsList.val(), 10);

                    request.add('gallery_id', galleryId);
                    request.add('preset_id', presetId);

                    request.send($.proxy(function (response) {
                        if (response.message) {
                            $.jGrowl(response.message);
                        }

                        if (!response.error) {
                            $(this).dialog('close');
                            window.location.reload(true);
                        }
                    }, this));
                }
            },
            open: function () {
                var request = app.Ajax.Post({
                    module: 'galleries',
                    action: 'getPresetList'
                });

                request.send(function (response) {
                    var $presetList = $('#presetList'),
                        $errors = $('#presetListError');

                    if (response.error) {
                        $presetList.attr('disabled', 'disabled');
                        $errors.find('#presetLoadingFailed').show();
                        return;
                    }

                    if (response.presets.length < 0) {
                        $presetList.attr('disabled', 'disabled');
                        $errors.find('#presetEmpty').show();
                        return;
                    }

                    $.each(response.presets, function (index, preset) {
                        $presetList.append('<option value="'+preset.id+'">'+preset.title+'</option>');
                    });
                });
            }
        });
    };

    Controller.prototype.openPresetDialog = function () {
        $('#loadPreset').dialog('open');
    };

    Controller.prototype.removePresetFromList = function () {
        var request = this.removePresetRequest();

        request.send(function (response) {
            if (response.error) {
                return false;
            }

            $('#presetId').find(':selected').remove();
        });
    };

    Controller.prototype.initThemeDialog = function () {
        $('#themeDialog').dialog({
            autoOpen: false,
            modal:    true,
            width:    570,
            buttons:  {
                // Select: function () {
                //     var selected = $('#bigImageThemeSelect').val(),
                //         $theme = $('#bigImageTheme');
                //
                //     $theme.val(selected);
                //     $(this).dialog('close');
                // },
                Cancel: function () {
                    $(this).dialog('close');
                }
            }
        });

        Controller.prototype.initThemeSelect = function () {
            var $theme = $('#bigImageTheme'),
                self = this;

            $('.theme').on('click', function () {
                $theme.val($(this).data('val'));
                $('.themeName').text($(this).data('name'));
                self.togglePopupTheme($(this).data('val'));
                $('#themeDialog').dialog('close');
            });
        };

        Controller.prototype.initEffectsDialog = function () {
            $('#effectDialog').dialog({
                autoOpen: false,
                modal:    true,
                width:    740,
                buttons:  {
                    Cancel: function () {
                        $(this).dialog('close');
                    }
                }
            });
        };

        Controller.prototype.openEffectsDialog = function () {
            $('#effectDialog').dialog('open');
        };
    };

    Controller.prototype.initTransitionDialog = function () {
        $('#transitionDialog').dialog({
            autoOpen: false,
            modal:    true,
            width:    570,
            buttons:  {
                Cancel: function () {
                    $(this).dialog('close');
                }
            }
        });

        Controller.prototype.initTransitionSelect = function () {
            var $wrapper = $('#transitionPreview');

            $wrapper.find('figure').on('click', function() {
                var id = String($(this).attr('id'));
                $('[name="box[transition]"]').attr('value', id);
                $('#transitionDialog').dialog('close');
            });
        };

        Controller.prototype.openTransitionsDialog = function () {
            $('#transitionDialog').dialog('open');
        };
    };

    Controller.prototype.setScroll = function() {
        var $settingsWrap = $('.settings-wrap');

        $settingsWrap.slimScroll({
            height: '700px',
            railVisible: true,
            alwaysVisible: true,
            allowPageScroll: true
        });
    };

    Controller.prototype.initEffectPreview = function () {
        var $effect  = $('#overlayEffect'),
            $preview = $('#effectsPreview'),
            $dialog  = $('#effectDialog');

        $preview.find('figure').on('click', function (event) {
            event.preventDefault();

            $effect.val($(this).data('grid-gallery-type'));
            $dialog.dialog('close');

            $('.selectedEffectName').text($.proxy(function () {
                return this.find('span').text();
            }, $(this)));
        });
    };

    Controller.prototype.openThemeDialog = function () {
        $('#themeDialog').dialog('open');
    };

    Controller.prototype.toggleArea = function() {
        var $toggle = $('[name="area[grid]"]'),
            $pagesRow = $('#usePages');

        $toggle.on('change', function() {
            if($(this).find('option:selected').val() == '1') {
                $pagesRow.find('#hidePages').attr('checked', 'check').trigger('change');
                $pagesRow.find('input').attr('disabled', true);
                $(this).notify('Pagination disabled now', {
                    position: 'top left',
                    className: 'info'
                });
            } else {
                $pagesRow.find('input').attr('disabled', false);
            }
        });
    };

    Controller.prototype.toggleShadow = function () {
        var $table = $('table[name="shadow"]'),
            $toggleRow = $('#useShadowRow'),
            value = 0;

        value = parseInt($('[name="use_shadow"]:checked').val(), 10);

        $('#showShadow').on('click', function () {
            $table.find('tr').show();
        });

        $('#hideShadow').on('click', function () {
            $table.find('tr').hide();
            $toggleRow.show();
        });

        if(value) {
            $table.find('tr').show();
        } else {
            $table.find('tr').hide();
            $toggleRow.show();
        }
    };

    Controller.prototype.toggleBorder = function () {
        var $table = $('table[name="border"]'),
            $borderType =$('select[name="thumbnail[border][type]"]'),
            $toggleRow = $borderType.closest('tr'),
            value = 0;

        value = parseInt($toggleRow.val(), 10);

        $borderType.on('change', function () {
            if($(this).find('option:selected').val() != 'none') {
                $table.find('tr').show();
            } else {
                $table.find('tr').hide();
                $toggleRow.show();
            }
        });

        $borderType.on('change', function() {
            $table.find('[name="border-type"]').css('border-style', $(this).find('option:selected').val());
        });
    };

    Controller.prototype.toggleCaptions = function () {
        var $table = $('table[name="captions"] thead'),
            $toggleRow = $('#useCaptions'),
            value = 0;

        value = this.strToBool($('[name="thumbnail[overlay][enabled]"]:checked').val());

        $('#hideCaptions').on('change', function () {
            $table.find('tr').hide();
            $toggleRow.show();
        }).trigger('change');

        $('#showCaptions').on('change', function () {
            $table.find('tr').show();
        }).trigger('change');

        if(value) {
            $table.find('tr').show();
        } else {
            $table.find('tr').hide();
            $toggleRow.show();
        }
    };

    Controller.prototype.areaNotifications = function () {
        var $photoWidth = $('input[name= "area[photo_width]"]'),
            $photoHeight = $('input[name= "area[photo_height]"]'),
            $postFeed = $('select[name="posts[enable]"]'),
            $overlay = $('[name="thumbnail[overlay][enabled]"], [name="icons[enabled]"]'),
            self = this;

        $photoWidth.on('change' , function() {
            if($photoWidth.val() < 240 && parseInt($postFeed.val(), 10)) {
                $photoWidth.notify('Low image width \n post feed content can be too small', {
                    position: 'top left',
                    className: 'info'
                });
            }

            if($photoWidth.val() == 'auto') {
                $photoWidth.notify('Use image original width', {
                    position: 'top left',
                    className: 'info'
                });
            }
        });

        $photoHeight.on('change', function() {
            if($photoHeight.val() < 240 && parseInt($postFeed.val(), 10)) {
                $photoHeight.notify('Low image height \n post feed content can be too small', {
                    position: 'top left',
                    className: 'info'
                });
            }

            if($photoHeight.val() == 'auto') {
                $photoHeight.notify('Use image original height', {
                    position: 'top left',
                    className: 'info'
                });
            }
        });

        $overlay.on('change', function(event) {
            var $overlayChecked = $('[name="thumbnail[overlay][enabled]"]:checked, [name="icons[enabled]"]:checked'),
                showNotification = true;

            $.each($overlayChecked, function(index, value) {
                if(!self.strToBool($(value).val()) || !this.length) {
                    showNotification = false;
                }
            });


            if(showNotification) {
                $overlay.closest('tr').notify(
                    "Caption animation effect is disabled now, turn off icons to use it",
                    {
                        position: 'bottom left',
                        className: 'info'
                    });
            }
        });

    }

    Controller.prototype.togglePostsTable = (function() {
        var $navButtons = $('.form-tabs'),
            $table = $('#gbox_ui-jqgrid-htable');

        $navButtons.on('click', function() {
            if($(this).find('a.active').attr('href') == 'post') {
                $table.show();
            } else {
                $table.hide()
            }
        }).trigger('click');

    });

    Controller.prototype.togglePosts = function () {
        var $changedRow = $('select[name="posts[enable]"]'),
            $toggleRow = $('select[name="quicksand[enabled]"]'),
            value = 0;

        $changedRow.on('change', function () {
            value = parseInt($(this).val(), 10);

            if (value) {
                $toggleRow.attr('disabled', 'disabled');
                $changedRow.notify('You cant use image shuffling option \n when post feed is enabled', {
                    position: 'bottom left',
                    className: 'warn'
                });
                $toggleRow.val('0');
            } else {
                $toggleRow.removeAttr('disabled');
            }
        }).trigger('change');
    };

    Controller.prototype.selectCover = function (e) {
        var target = $(e.currentTarget),
            covers = $('.covers'),
            cover  = $('#coverUrl');

        covers.find('li').removeClass('selected');
        target.parents('li').addClass('selected');

        cover.val(target.parents('li').data('url'));
    };

    Controller.prototype.savePosts = function () {
        jQuery('[name="posts[add]"]').on('click', $.proxy(function() {
            SupsysticGallery.Loader.show('Please, wait until post will be imported.');
            var request = SupsysticGallery.Ajax.Post({
                module: 'galleries',
                action: 'savePosts'
            });

            request.add('galleryId', parseInt(this.getParameterByName('gallery_id'), 10));
            request.add('id', parseInt(jQuery('[name="posts[current]"] option:selected').val()));

            request.send($.proxy(function (response) {
                jQuery("#ui-jqgrid-htable").jqGrid('addRowData', jQuery('[name="posts[current]"] option:selected').val() , {
                    id: jQuery('[name="posts[current]"] option:selected').val(),
                    image: response.photo,
                    title: jQuery('[name="posts[current]"] option:selected').text(),
                    author: response.post_author,
                    comments: response.comment_count,
                    type: response.type,
                    date: response.post_date
                });
                SupsysticGallery.Loader.hide();
                $.jGrowl('Done');
            }, this));
        }, this));

        jQuery('#remove-posts').on('click', $.proxy(function() {
            var request = SupsysticGallery.Ajax.Post({
                module: 'galleries',
                action: 'removePosts'
            });

            var postsId = new Array();
            jQuery('.ui-jqgrid [type="checkbox"]').each(function() {
                if($(this).attr('checked')) {
                    postsId.push($(this).closest('tr').find('[aria-describedby="ui-jqgrid-htable_id"]').text());
                    $(this).parent().parent().remove();
                }
            });

            request.add('galleryId', parseInt(this.getParameterByName('gallery_id'), 10));
            request.add('id', postsId);

            request.send($.proxy(function (response) {
                $.jGrowl('Removed');
            }, this));
        }, this));

        jQuery('#button-select-posts').on('click', function() {
            if($(this).data('value') == 'select') {
                jQuery('[name="post[]"]').each(function() {
                    $(this).attr('checked', true);
                });
                $(this).data('value', 'deselect');
            } else {
                jQuery('[name="post[]"]').each(function() {
                    $(this).attr('checked', false);
                });
                $(this).data('value', 'select');
            }
        });
    }

    Controller.prototype.savePages = function () {
        jQuery('[name="pages[add]"]').on('click', $.proxy(function () {
            SupsysticGallery.Loader.show('Please, wait until page will be imported.');
            var request = SupsysticGallery.Ajax.Post({
                module: 'galleries',
                action: 'savePages'
            });

            request.add('galleryId', parseInt(this.getParameterByName('gallery_id'), 10));
            request.add('id', parseInt(jQuery('[name="pages[current]"] option:selected').val()));

            request.send($.proxy(function (response) {
                jQuery("#ui-jqgrid-htable").jqGrid('addRowData', jQuery('[name="pages[current]"] option:selected').val() , {
                    id: jQuery('[name="pages[current]"] option:selected').val(),
                    image: response.photo,
                    title: jQuery('[name="pages[current]"] option:selected').text(),
                    author: response.page_author,
                    comments: response.comment_count,
                    type: response.type,
                    date: response.page_date
                });
                SupsysticGallery.Loader.hide();
                $.jGrowl('Done');
            }, this));
        }, this));
    }

    $(document).ready(function () {
        var qs = new URI().query(true), controller;

        if (qs.module === 'galleries' && qs.action === 'settings') {
            controller = new Controller();

            controller.initSaveDialog();
            controller.initDeleteDialog();
            controller.initLoadDialog();
            controller.initThemeDialog();
            controller.initTransitionDialog();
            controller.initEffectsDialog();

            controller.initEffectPreview();

            controller.toggleArea();
            controller.toggleShadow();
            controller.toggleBorder();
            controller.toggleCaptions();

            controller.initThemeSelect();
            controller.initTransitionSelect();

            controller.savePosts();
            controller.savePages();

            controller.saveButton();
            controller.togglePosts();
            controller.togglePostsTable();
            controller.areaNotifications();
            controller.setInputColor();
            controller.setScroll();

            // Save as preset dialog
            $('#btnSaveAsPreset').on('click', controller.openSaveDialog);

            // Delete preset dialog
            $('#btnDeletePreset').on('click', controller.openDeleteDialog);

            // Load from preset dialog
            $('#btnLoadFromPreset').on('click', controller.openPresetDialog);

            // Delete gallery
            $('.delete').on('click', controller.remove);

            // Change the tab
            $('.change-tab')
                .on('click', $.proxy(controller.changeTab, controller));

            // Toggle photo height based on the selected grid type.
            $('#grid-type').find('select')
                .on('change', controller.togglePhotoHeightWidth)
                .trigger('change');

            // Toggle colorbox slide-show settings
            $('input[name="box[slideshow]"]')
                .on('change', controller.toggleSlideShow)
                .trigger('change');

            // Open theme dialog
            $('#chooseTheme').on('click', controller.openThemeDialog);

            // Open effects dialog
            $('#chooseEffect').on('click', controller.openEffectsDialog);
            $('#chooseTransition').on('click', controller.openTransitionsDialog);

            // Cover
            $('.covers img').on('click', controller.selectCover);
        }
    });

}(window.SupsysticGallery = window.SupsysticGallery || {}, jQuery));

// Preview

(function ($) {
    var getSelector = (function (fieldName) {
        return '[name="' + fieldName + '"]';
    });


    function ImagePreview(enabled) {
        this.$window = $('#preview.gallery-preview');

        if (enabled) {
            this.init();
            this.$window.show();
        }
    }

    ImagePreview.prototype.setProp = (function (selector, props) {
        this.$window.find(selector).css(props);
    });

    ImagePreview.prototype.setDataset = (function (selector, name, value) {
        this.$window.find(selector).attr(name, value);
    });

    ImagePreview.prototype.initBorder = (function () {
        var fieldNames = {
            type: 'thumbnail[border][type]',
            color: 'thumbnail[border][color]',
            width: 'thumbnail[border][width]',
            radius: 'thumbnail[border][radius]',
            radiusUnit: 'thumbnail[border][radius_unit]'
        };

        $(getSelector(fieldNames.type)).on('change', $.proxy(function (e) {
            this.setProp('figure', { borderStyle: $(e.currentTarget).val() });
        }, this)).trigger('change');

        $('#border-color a.wp-color-result').attrchange({
            trackValues: true,
            callback: function (e) {
                if(e.attributeName == 'style') {
                    $('#preview .grid-gallery-caption').css('border-color', e.newStyle);
                }
            }
        });

        $(getSelector(fieldNames.color)).on('change', $.proxy(function (e) {
            this.setProp('figure', { borderColor: $(e.currentTarget).val() });
        }, this)).trigger('change');

        $(getSelector(fieldNames.width)).bind('change paste keyup', $.proxy(function (e) {
            this.setProp('figure', { borderWidth: $(e.currentTarget).val() });
        }, this)).trigger('change');

        $(getSelector(fieldNames.radius) + ',' + getSelector(fieldNames.radiusUnit))
            .bind('change paste keyup', $.proxy(function () {
                var $value = $(getSelector(fieldNames.radius)),
                    $unit  = $(getSelector(fieldNames.radiusUnit)),
                    unitValue = 'px';

                if (parseInt($unit.val(), 10) == 1) {
                    unitValue = '%';
                }

                this.setProp('figure', { borderRadius: $value.val() + unitValue });
                this.setProp('figcaption', { borderRadius: $value.val() + unitValue });

            }, this))
            .trigger('change');
    });

    ImagePreview.prototype.initIcons = (function () {
        var fields = {
            iconsColor: 'icons[color]',
            hoverIconsColor: 'icons[hover_color]',
            bgColor: 'icons[background]',
            hoverBgColor: 'icons[background_hover]',
            iconsSize : 'icons[size]'
        };

        if($.parseJSON($('#showIcons').val())) {
            console.log($('#preview figure.grid-gallery-caption').attr('data-grid-gallery-type'));
            $('#preview figure.grid-gallery-caption').attr('data-grid-gallery-type', 'icons');
            $('#preview figcaption').show();
        }
        $('#showIcons').on('change', $.proxy(function() {
            if($.parseJSON($('#showIcons').val())){
                this.setDataset('figure', 'data-grid-gallery-type', 'icons');
                $('#preview figcaption').show();
            } else {
                $('#preview figcaption').hide();
            }
        }, this));

        $(getSelector(fields.iconsColor)).bind('change paste keyup', $.proxy(function (e) {
            this.setProp('a.hi-icon', { color: $(e.currentTarget).val() });
        }, this))
            .trigger('change')
            .bind('change', $.proxy(function () {
                this.setProp('figcaption', { opacity: 1 });
            }, this))
            .on('focusout', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this));

        $(getSelector(fields.hoverIconsColor)).bind('change paste keyup', $.proxy(function (e) {
            $('a.hi-icon').on('mouseover', $.proxy(function() {
                this.setProp('a.hi-icon', { color: $(e.currentTarget).val() });
            }, this))
            $('a.hi-icon').on('mouseleave', $.proxy(function() {
                this.setProp('a.hi-icon', { color: $(getSelector(fields.iconsColor)).val() });
            }, this))
        }, this))
            .trigger('change')
            .bind('change', $.proxy(function () {
                this.setProp('figcaption', { opacity: 1 });
            }, this))
            .on('focusout', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this));

        $(getSelector(fields.bgColor)).bind('change paste keyup', $.proxy(function (e) {
            this.setProp('figcaption', { backgroundColor: $(e.currentTarget).val() });
        }, this))
            .trigger('change')
            .bind('change', $.proxy(function () {
                this.setProp('figcaption', { opacity: 1 });
            }, this))
            .on('focusout', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this));

        $(getSelector(fields.hoverBgColor)).bind('change paste keyup', $.proxy(function (e) {
            $('a.hi-icon').on('mouseover', $.proxy(function() {
                this.setProp('figcaption', { backgroundColor: $(e.currentTarget).val() });
            }, this))
            $('a.hi-icon').on('mouseleave', $.proxy(function() {
                this.setProp('figcaption', { backgroundColor: $(getSelector(fields.bgColor)).val() });
            }, this))
        }, this))
            .trigger('change')
            .bind('change', $.proxy(function () {
                this.setProp('figcaption', { opacity: 1 });
            }, this))
            .on('focusout', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this));

        $(getSelector(fields.iconsSize)).bind('change paste keyup', $.proxy(function (e) {
            this.setProp('a.hi-icon', { width: $(e.currentTarget).val()*9, height: $(e.currentTarget).val()*9  });
        }, this))
            .trigger('change')
            .bind('change', $.proxy(function () {
                this.setProp('figcaption', { opacity: 1 });
            }, this))
            .on('focusout', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this));
    });

    ImagePreview.prototype.initShadow = (function () {
        var fieldNames = {
            color: 'thumbnail[shadow][color]',
            blur: 'thumbnail[shadow][blur]',
            x: 'thumbnail[shadow][x]',
            y: 'thumbnail[shadow][y]'
        };

        $('[name="use_shadow"]').on('change', $.proxy(function () {
            if (parseInt($('[name="use_shadow"]:checked').val(), 10) == 1) {
                $(
                    getSelector(fieldNames.color) + ','
                        + getSelector(fieldNames.blur) + ','
                        + getSelector(fieldNames.x) + ','
                        + getSelector(fieldNames.y)
                )
                    .bind('change paste keyup', $.proxy(function (e) {
                        var $color = $(getSelector(fieldNames.color)),
                            $blur = $(getSelector(fieldNames.blur)),
                            $x = $(getSelector(fieldNames.x)),
                            $y = $(getSelector(fieldNames.y));

                        this.setProp('figure', {
                            boxShadow: $x.val() + 'px '
                                           + $y.val() + 'px '
                                           + $blur.val() + 'px '
                                + $color.val()
                        });
                    }, this))
                    .trigger('change');
            } else {
                this.setProp('figure', {
                    boxShadow: 'none'
                });
            }
        }, this)).trigger('change');
    });

    ImagePreview.prototype.initMouseShadow = (function() {
        var shadow = $('figure.grid-gallery-caption').css('box-shadow'),
            self = this,
            wrapper = {
                element: '#preview figure.grid-gallery-caption',
                $node: $('#preview figure.grid-gallery-caption')
            },
            showOver = function() {
                wrapper.$node.on('mouseover', function () {
                    shadow = wrapper.$node.css('box-shadow');
                    self.setProp(wrapper.element , {boxShadow: '5px 5px 5px #888'});
                });
                wrapper.$node.on('mouseleave',function () {
                    self.setProp(wrapper.element , {boxShadow: shadow});
                });
            },
            hideOver = function() {
                console.log(wrapper.$node);
                wrapper.$node.on('mouseover', function () {
                    shadow = wrapper.$node.css('box-shadow');
                    self.setProp(wrapper.element , {boxShadow: 'none'});
                });
                wrapper.$node.on('mouseleave', function () {
                    self.setProp(wrapper.element , {boxShadow: shadow});
                });
            },
            value = parseInt($('#useMouseOverShadow option:selected').val(), 10);

        if(value == 1) {
            showOver();
        }
        if(value == 2) {
            hideOver();
        }

        $('#useMouseOverShadow').on('change', $.proxy(function() {
            value = parseInt($('#useMouseOverShadow option:selected').val(), 10);

            if(value == 1) {
                showOver();
            }

            if(value == 2) {
                hideOver();
            }

            if(!value) {
                wrapper.$node.off('mouseover');
                wrapper.$node.off('mouseleave');
            }

        }, this));
    });

    ImagePreview.prototype.initOverlayShadow = (function() {
        var wrapper = {
            element: '.grid-gallery-caption img',
            $node: $('figure.grid-gallery-caption')
        }, $toggle = $('[name="thumbnail[shadow][overlay]"]');

        $toggle.on('change', $.proxy(function() {
            var value = parseInt($('option:selected', $toggle).val(), 10);

            if(value) {
                this.setProp(wrapper.element , {opacity: '0.2'});
                wrapper.$node.on('mouseover', $.proxy(function () {
                    this.setProp(wrapper.element , {opacity: '1.0'});
                }, this));
                wrapper.$node.on('mouseleave', $.proxy(function () {
                    this.setProp(wrapper.element , {opacity: '0.2'});
                }, this));
            } else {
                this.setProp(wrapper.element , {opacity: '1.0'});
                wrapper.$node.off('mouseover');
                wrapper.$node.off('mouseleave');
            }

        }, this)).trigger('change');
    });

    ImagePreview.prototype.previewCaptionHide = function() {
        $('#preview figcaption').hide();
        this.setDataset('figure', 'data-grid-gallery-type', 'None');
    }

    ImagePreview.prototype.previewCationShow = function(fields) {
        $('#preview figcaption').show();
        this.setDataset('figure', 'data-grid-gallery-type', $('#overlayEffect').val());

        $('#effectsPreview').find('figure').bind('click', $.proxy(function (e) {
            this.setDataset('figure', 'data-grid-gallery-type', $(e.currentTarget).data('grid-gallery-type'));
        }, this)).trigger('change');

        $(getSelector(fields.bg)).bind('change paste keyup', $.proxy(function (e) {
            this.setProp('figcaption', { backgroundColor: $(e.currentTarget).val() });
        }, this))
            .trigger('change')
            .bind('change', $.proxy(function () {
                this.setProp('figcaption', { opacity: 1 });
            }, this))
            .on('focusout', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this));

        $(getSelector(fields.fg)).bind('change paste keyup', $.proxy(function (e) {
            this.setProp('figcaption', { color: $(e.currentTarget).val() });
        }, this))
            .trigger('change')
            .bind('change', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this))
            .on('focusout', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this));

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        var color = hexToRgb($(getSelector(fields.bg)).val());
        this.setProp('figcaption', { backgroundColor: 'rgba(' + color.r +
        ',' + color.g + ',' + color.b + ',' + (1 - $(getSelector(fields.opacity)).val()/10.0) + ')'});

        $(getSelector(fields.opacity)).bind('change paste keyup', $.proxy(function (e) {
            var color = hexToRgb($(getSelector(fields.bg)).val());
            this.setProp('figcaption', { backgroundColor: 'rgba(' + color.r +
            ',' + color.g + ',' + color.b + ',' + (1 - $(e.currentTarget).val()/10.0) + ')'});
        }, this));


        $(getSelector(fields.size) + ',' + getSelector(fields.sizeUnit))
            .bind('change paste keyup', $.proxy(function (e) {
                var $size = $(getSelector(fields.size)),
                    $unit = $(getSelector(fields.sizeUnit)),
                    unitValue = 'px';

                switch (parseInt($unit.val(), 10)) {
                    case 0:
                        unitValue = 'px';
                        break;
                    case 1:
                        unitValue = '%';
                        break;
                    case 2:
                        unitValue = 'em';
                        break;
                }

                this.setProp('figcaption', { fontSize: $size.val() + unitValue });
            }, this))
            .trigger('change')
            .on('focus', $.proxy(function () {
                this.setProp('figcaption', { opacity: 1 });
            }, this))
            .on('focusout', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this));

        $(getSelector(fields.align)).on('change', $.proxy(function (e) {
            var value = '';

            switch (parseInt($(e.currentTarget).val(), 10)) {
                case 0:
                    value = 'left';
                    break;
                case 1:
                    value = 'right';
                    break;
                case 2:
                    value = 'center';
                    break;
                case 3:
                    value = '';
                    break;
            }

            this.setProp('figcaption', { textAlign: value });
        }, this))
            .trigger('change')
            .on('focus', $.proxy(function () {
                this.setProp('figcaption', { opacity: 1 });
            }, this))
            .on('focusout', $.proxy(function () {
                this.setProp('figcaption', { opacity: '' });
            }, this));
    }

    ImagePreview.prototype.initCaption = (function () {

        var fields = {
            effect: 'thumbnail[overlay][effect]',
            bg: 'thumbnail[overlay][background]',
            fg: 'thumbnail[overlay][foreground]',
            opacity: 'thumbnail[overlay][transparency]',
            size: 'thumbnail[overlay][text_size]',
            sizeUnit: 'thumbnail[overlay][text_size_unit]',
            align: 'thumbnail[overlay][text_align]'
        };

        $('[name="thumbnail[overlay][enabled]"]').on('change', $.proxy(function(e) {
            if($('[name="thumbnail[overlay][enabled]"]:checked').val() == 'true') {
                this.previewCationShow(fields);
            } else {
                this.previewCaptionHide();
            }
        }, this));

        if($('[name="thumbnail[overlay][enabled]"]:checked').val() == 'true') {
            this.previewCationShow(fields);
        } else {
            this.previewCaptionHide();
        }

    });

    ImagePreview.prototype.init = (function () {
        //this.$window.draggable();

        this.initBorder();
        this.initShadow();
        this.initMouseShadow();
        this.initOverlayShadow();
        //this.initIcons();
        this.initCaption();
    });

    $(document).ready(function () {
        jQuery('input#cmn-preview').click(function() {
            if($(this).is(':checked')) {
                jQuery('#preview figure').show();
            } else {
                jQuery('#preview figure').hide();
            }
        });
        return new ImagePreview(true);
    });
}(jQuery));