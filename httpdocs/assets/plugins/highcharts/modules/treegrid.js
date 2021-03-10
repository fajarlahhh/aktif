/*
 Highcharts Gantt JS v7.2.1 (2019-10-31)

 Tree Grid

 (c) 2016-2019 Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(g){"object"===typeof module&&module.exports?(g["default"]=g,module.exports=g):"function"===typeof define&&define.amd?define("highcharts/modules/treegrid",["highcharts"],function(B){g(B);g.Highcharts=B;return g}):g("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(g){function B(n,r,g,x){n.hasOwnProperty(r)||(n[r]=x.apply(null,g))}g=g?g._modules:{};B(g,"parts-gantt/GridAxis.js",[g["parts/Globals.js"],g["parts/Utilities.js"]],function(n,r){var g=r.defined,x=r.erase,z=r.isArray,
v=r.isNumber,y=r.pick,t=n.addEvent,h=n.dateFormat,c=function(b){return r.isObject(b,!0)},d=n.merge,l=n.wrap,p=n.Chart,m=n.Axis,a=n.Tick,q=function(b){var e=b.options,f=e&&c(e.grid)?e.grid:{},a=25/11,d=b.chart.renderer.fontMetrics(e.labels.style.fontSize);e.labels||(e.labels={});e.labels.align=y(e.labels.align,"center");b.categories||(e.showLastLabel=!1);b.horiz&&(e.tickLength=f.cellHeight||d.h*a);b.labelRotation=0;e.labels.rotation=0},A={top:0,right:1,bottom:2,left:3,0:"top",1:"right",2:"bottom",
3:"left"};m.prototype.isOuterAxis=function(){var b=this,e=b.columnIndex,f=b.linkedParent&&b.linkedParent.columns||b.columns,a=e?b.linkedParent:b,d=-1,c=0;b.chart[b.coll].forEach(function(e,f){e.side!==b.side||e.options.isInternal||(c=f,e===a&&(d=f))});return c===d&&(v(e)?f.length===e:!0)};m.prototype.getMaxLabelDimensions=function(b,e){var f={width:0,height:0};e.forEach(function(e){e=b[e];if(c(e)){var a=c(e.label)?e.label:{};e=a.getBBox?a.getBBox().height:0;a.textStr&&!v(a.textPxLength)&&(a.textPxLength=
a.getBBox().width);a=v(a.textPxLength)?Math.round(a.textPxLength):0;f.height=Math.max(e,f.height);f.width=Math.max(a,f.width)}});return f};n.dateFormats.W=function(b){b=new Date(b);b.setHours(0,0,0,0);b.setDate(b.getDate()-(b.getDay()||7));var e=new Date(b.getFullYear(),0,1);return Math.ceil(((b-e)/864E5+1)/7)};n.dateFormats.E=function(b){return h("%a",b,!0).charAt(0)};t(a,"afterGetLabelPosition",function(b){var e=this.label,f=this.axis,a=f.reversed,d=f.chart,l=f.options,m=l&&c(l.grid)?l.grid:{};
l=f.options.labels;var q=l.align,k=A[f.side],w=b.tickmarkOffset,u=f.tickPositions,C=this.pos-w;u=v(u[b.index+1])?u[b.index+1]-w:f.max+w;var p=f.tickSize("tick",!0);w=z(p)?p[0]:0;p=p&&p[1]/2;if(!0===m.enabled){if("top"===k){m=f.top+f.offset;var h=m-w}else"bottom"===k?(h=d.chartHeight-f.bottom+f.offset,m=h+w):(m=f.top+f.len-f.translate(a?u:C),h=f.top+f.len-f.translate(a?C:u));"right"===k?(k=d.chartWidth-f.right+f.offset,a=k+w):"left"===k?(a=f.left+f.offset,k=a-w):(k=Math.round(f.left+f.translate(a?
u:C))-p,a=Math.round(f.left+f.translate(a?C:u))-p);this.slotWidth=a-k;b.pos.x="left"===q?k:"right"===q?a:k+(a-k)/2;b.pos.y=h+(m-h)/2;d=d.renderer.fontMetrics(l.style.fontSize,e.element);e=e.getBBox().height;l.useHTML?b.pos.y+=d.b+-(e/2):(e=Math.round(e/d.h),b.pos.y+=(d.b-(d.h-d.f))/2+-((e-1)*d.h/2));b.pos.x+=f.horiz&&l.x||0}});t(m,"afterTickSize",function(b){var e=this.maxLabelDimensions,f=this.options;!0===(f&&c(f.grid)?f.grid:{}).enabled&&(f=2*Math.abs(this.defaultLeftAxisOptions.labels.x),e=f+
(this.horiz?e.height:e.width),z(b.tickSize)?b.tickSize[0]=e:b.tickSize=[e])});t(m,"afterGetTitlePosition",function(b){var e=this.options;if(!0===(e&&c(e.grid)?e.grid:{}).enabled){var f=this.axisTitle,a=f&&f.getBBox().width,d=this.horiz,l=this.left,k=this.top,m=this.width,p=this.height,w=e.title;e=this.opposite;var u=this.offset,C=this.tickSize()||[0],q=w.x||0,h=w.y||0,n=y(w.margin,d?5:10);f=this.chart.renderer.fontMetrics(w.style&&w.style.fontSize,f).f;C=(d?k+p:l)+C[0]/2*(e?-1:1)*(d?1:-1)+(this.side===
A.bottom?f:0);b.titlePosition.x=d?l-a/2-n+q:C+(e?m:0)+u+q;b.titlePosition.y=d?C-(e?p:0)+(e?f:-f)/2+u+h:k-n+h}});l(m.prototype,"unsquish",function(b){var e=this.options;return!0===(e&&c(e.grid)?e.grid:{}).enabled&&this.categories?this.tickInterval:b.apply(this,Array.prototype.slice.call(arguments,1))});t(m,"afterSetOptions",function(b){var e=this.options;b=b.userOptions;var f=e&&c(e.grid)?e.grid:{};if(!0===f.enabled){var a=d(!0,{className:"highcharts-grid-axis "+(b.className||""),dateTimeLabelFormats:{hour:{list:["%H:%M",
"%H"]},day:{list:["%A, %e. %B","%a, %e. %b","%E"]},week:{list:["Week %W","W%W"]},month:{list:["%B","%b","%o"]}},grid:{borderWidth:1},labels:{padding:2,style:{fontSize:"13px"}},margin:0,title:{text:null,reserveSpace:!1,rotation:0},units:[["millisecond",[1,10,100]],["second",[1,10]],["minute",[1,5,15]],["hour",[1,6]],["day",[1]],["week",[1]],["month",[1]],["year",null]]},b);"xAxis"===this.coll&&(g(b.linkedTo)&&!g(b.tickPixelInterval)&&(a.tickPixelInterval=350),g(b.tickPixelInterval)||!g(b.linkedTo)||
g(b.tickPositioner)||g(b.tickInterval)||(a.tickPositioner=function(b,e){var f=this.linkedParent&&this.linkedParent.tickPositions&&this.linkedParent.tickPositions.info;if(f){var d,c=a.units;for(d=0;d<c.length;d++)if(c[d][0]===f.unitName){var w=d;break}if(c[w][1]){if(c[w+1]){var u=c[w+1][0];var C=(c[w+1][1]||[1])[0]}f=n.timeUnits[u];this.tickInterval=f*C;return this.getTimeTicks({unitRange:f,count:C,unitName:u},b,e,this.options.startOfWeek)}}}));d(!0,this.options,a);this.horiz&&(e.minPadding=y(b.minPadding,
0),e.maxPadding=y(b.maxPadding,0));v(e.grid.borderWidth)&&(e.tickWidth=e.lineWidth=f.borderWidth)}});t(m,"afterSetAxisTranslation",function(){var b=this.options,e=b&&c(b.grid)?b.grid:{},f=this.tickPositions&&this.tickPositions.info,a=this.userOptions.labels||{};this.horiz&&(!0===e.enabled&&this.series.forEach(function(b){b.options.pointRange=0}),f&&(!1===b.dateTimeLabelFormats[f.unitName].range||1<f.count)&&!g(a.align)&&(b.labels.align="left",g(a.x)||(b.labels.x=3)))});t(m,"trimTicks",function(){var b=
this.options,e=b&&c(b.grid)?b.grid:{},f=this.categories,a=this.tickPositions,d=a[0],l=a[a.length-1],k=this.linkedParent&&this.linkedParent.min||this.min,m=this.linkedParent&&this.linkedParent.max||this.max,p=this.tickInterval;!0!==e.enabled||f||!this.horiz&&!this.isLinked||(d<k&&d+p>k&&!b.startOnTick&&(a[0]=k),l>m&&l-p<m&&!b.endOnTick&&(a[a.length-1]=m))});t(m,"afterRender",function(){var b=this.options,e=b&&c(b.grid)?b.grid:{},a=this.chart.renderer;if(!0===e.enabled){this.maxLabelDimensions=this.getMaxLabelDimensions(this.ticks,
this.tickPositions);this.rightWall&&this.rightWall.destroy();if(this.isOuterAxis()&&this.axisLine){var d=b.lineWidth;if(d){var k=this.getLinePath(d);var l=k.indexOf("M")+1;var m=k.indexOf("L")+1;e=k.indexOf("M")+2;var p=k.indexOf("L")+2;var q=(this.tickSize("tick")[0]-1)*(this.side===A.top||this.side===A.left?-1:1);this.horiz?(k[e]+=q,k[p]+=q):(k[l]+=q,k[m]+=q);this.axisLineExtra?this.axisLineExtra.animate({d:k}):(this.axisLineExtra=a.path(k).attr({zIndex:7}).addClass("highcharts-axis-line").add(this.axisGroup),
a.styledMode||this.axisLineExtra.attr({stroke:b.lineColor,"stroke-width":d}));this.axisLine[this.showAxis?"show":"hide"](!0)}}(this.columns||[]).forEach(function(b){b.render()})}});var k={afterGetOffset:function(){(this.columns||[]).forEach(function(b){b.getOffset()})},afterInit:function(){var b=this.chart,e=this.userOptions,a=this.options;a=a&&c(a.grid)?a.grid:{};a.enabled&&(q(this),l(this,"labelFormatter",function(b){var a=this.axis,e=a.tickPositions,d=this.value,u=(a.isLinked?a.linkedParent:a).series[0],
f=d===e[0];e=d===e[e.length-1];u=u&&n.find(u.options.data,function(b){return b[a.isXAxis?"x":"y"]===d});this.isFirst=f;this.isLast=e;this.point=u;return b.call(this)}));if(a.columns)for(var k=this.columns=[],p=this.columnIndex=0;++p<a.columns.length;){var h=d(e,a.columns[a.columns.length-p-1],{linkedTo:0,type:"category"});delete h.grid.columns;h=new m(this.chart,h,!0);h.isColumn=!0;h.columnIndex=p;x(b.axes,h);x(b[this.coll],h);k.push(h)}},afterSetOptions:function(b){b=(b=b.userOptions)&&c(b.grid)?
b.grid:{};var a=b.columns;b.enabled&&a&&d(!0,this.options,a[a.length-1])},afterSetScale:function(){(this.columns||[]).forEach(function(b){b.setScale()})},destroy:function(b){(this.columns||[]).forEach(function(a){a.destroy(b.keepEvents)})},init:function(b){var a=(b=b.userOptions)&&c(b.grid)?b.grid:{};a.enabled&&g(a.borderColor)&&(b.tickColor=b.lineColor=a.borderColor)}};Object.keys(k).forEach(function(b){t(m,b,k[b])});t(p,"afterSetChartSize",function(){this.axes.forEach(function(b){(b.columns||[]).forEach(function(b){b.setAxisSize();
b.setAxisTranslation()})})})});B(g,"parts-gantt/Tree.js",[g["parts/Utilities.js"]],function(n){var g=n.extend,D=n.isNumber,x=n.pick,z=function(n,g){var h=n.reduce(function(c,d){var l=x(d.parent,"");void 0===c[l]&&(c[l]=[]);c[l].push(d);return c},{});Object.keys(h).forEach(function(c,d){var l=h[c];""!==c&&-1===g.indexOf(c)&&(l.forEach(function(c){d[""].push(c)}),delete d[c])});return h},v=function(n,r,h,c,d,l){var p=0,m=0,a=l&&l.after,q=l&&l.before;r={data:c,depth:h-1,id:n,level:h,parent:r};var A,
k;"function"===typeof q&&q(r,l);q=(d[n]||[]).map(function(b){var a=v(b.id,n,h+1,b,d,l),f=b.start;b=!0===b.milestone?f:b.end;A=!D(A)||f<A?f:A;k=!D(k)||b>k?b:k;p=p+1+a.descendants;m=Math.max(a.height+1,m);return a});c&&(c.start=x(c.start,A),c.end=x(c.end,k));g(r,{children:q,descendants:p,height:m});"function"===typeof a&&a(r,l);return r};return{getListOfParents:z,getNode:v,getTree:function(n,g){var h=n.map(function(c){return c.id});n=z(n,h);return v("",null,1,null,n,g)}}});B(g,"mixins/tree-series.js",
[g["parts/Globals.js"],g["parts/Utilities.js"]],function(n,g){var r=g.extend,x=g.isArray,z=g.isNumber,v=g.isObject,y=g.pick,t=n.merge;return{getColor:function(h,c){var d=c.index,l=c.mapOptionsToLevel,p=c.parentColor,m=c.parentColorIndex,a=c.series,q=c.colors,A=c.siblings,k=a.points,b=a.chart.options.chart,e;if(h){k=k[h.i];h=l[h.level]||{};if(l=k&&h.colorByPoint){var f=k.index%(q?q.length:b.colorCount);var g=q&&q[f]}if(!a.chart.styledMode){q=k&&k.options.color;b=h&&h.color;if(e=p)e=(e=h&&h.colorVariation)&&
"brightness"===e.key?n.color(p).brighten(d/A*e.to).get():p;e=y(q,b,g,e,a.color)}var r=y(k&&k.options.colorIndex,h&&h.colorIndex,f,m,c.colorIndex)}return{color:e,colorIndex:r}},getLevelOptions:function(h){var c=null;if(v(h)){c={};var d=z(h.from)?h.from:1;var l=h.levels;var p={};var m=v(h.defaults)?h.defaults:{};x(l)&&(p=l.reduce(function(a,c){if(v(c)&&z(c.level)){var l=t({},c);var k="boolean"===typeof l.levelIsConstant?l.levelIsConstant:m.levelIsConstant;delete l.levelIsConstant;delete l.level;c=c.level+
(k?0:d-1);v(a[c])?r(a[c],l):a[c]=l}return a},{}));l=z(h.to)?h.to:1;for(h=0;h<=l;h++)c[h]=t({},m,v(p[h])?p[h]:{})}return c},setTreeValues:function l(c,d){var p=d.before,m=d.idRoot,a=d.mapIdToNode[m],q=d.points[c.i],n=q&&q.options||{},k=0,b=[];r(c,{levelDynamic:c.level-(("boolean"===typeof d.levelIsConstant?d.levelIsConstant:1)?0:a.level),name:y(q&&q.name,""),visible:m===c.id||("boolean"===typeof d.visible?d.visible:!1)});"function"===typeof p&&(c=p(c,d));c.children.forEach(function(a,f){var e=r({},
d);r(e,{index:f,siblings:c.children.length,visible:c.visible});a=l(a,e);b.push(a);a.visible&&(k+=a.val)});c.visible=0<k||c.visible;p=y(n.value,k);r(c,{children:b,childrenTotal:k,isLeaf:c.visible&&!k,val:p});return c},updateRootId:function(c){if(v(c)){var d=v(c.options)?c.options:{};d=y(c.rootNode,d.rootId,"");v(c.userOptions)&&(c.userOptions.rootId=d);c.rootNode=d}return d}}});B(g,"modules/broken-axis.src.js",[g["parts/Globals.js"],g["parts/Utilities.js"]],function(n,g){var r=g.extend,x=g.isArray,
z=g.pick;g=n.addEvent;var v=n.find,y=n.fireEvent,t=n.Axis,h=n.Series,c=function(d,c){return v(c,function(c){return c.from<d&&d<c.to})};r(t.prototype,{isInBreak:function(d,c){var l=d.repeat||Infinity,m=d.from,a=d.to-d.from;c=c>=m?(c-m)%l:l-(m-c)%l;return d.inclusive?c<=a:c<a&&0!==c},isInAnyBreak:function(d,c){var l=this.options.breaks,m=l&&l.length,a;if(m){for(;m--;)if(this.isInBreak(l[m],d)){var h=!0;a||(a=z(l[m].showPoints,!this.isXAxis))}var g=h&&c?h&&!a:h}return g}});g(t,"afterInit",function(){"function"===
typeof this.setBreaks&&this.setBreaks(this.options.breaks,!1)});g(t,"afterSetTickPositions",function(){if(this.isBroken){var d=this.tickPositions,c=this.tickPositions.info,h=[],m;for(m=0;m<d.length;m++)this.isInAnyBreak(d[m])||h.push(d[m]);this.tickPositions=h;this.tickPositions.info=c}});g(t,"afterSetOptions",function(){this.isBroken&&(this.options.ordinal=!1)});t.prototype.setBreaks=function(d,l){function h(d){var c=d,b;for(b=0;b<a.breakArray.length;b++){var e=a.breakArray[b];if(e.to<=d)c-=e.len;
else if(e.from>=d)break;else if(a.isInBreak(e,d)){c-=d-e.from;break}}return c}function m(d){var c;for(c=0;c<a.breakArray.length;c++){var b=a.breakArray[c];if(b.from>=d)break;else b.to<d?d+=b.len:a.isInBreak(b,d)&&(d+=b.len)}return d}var a=this,g=x(d)&&!!d.length;a.isDirty=a.isBroken!==g;a.isBroken=g;a.options.breaks=a.userOptions.breaks=d;a.forceRedraw=!0;g||a.val2lin!==h||(delete a.val2lin,delete a.lin2val);g&&(a.userOptions.ordinal=!1,a.val2lin=h,a.lin2val=m,a.setExtremes=function(a,d,b,e,f){if(this.isBroken){for(var l,
k=this.options.breaks;l=c(a,k);)a=l.to;for(;l=c(d,k);)d=l.from;d<a&&(d=a)}t.prototype.setExtremes.call(this,a,d,b,e,f)},a.setAxisTranslation=function(d){t.prototype.setAxisTranslation.call(this,d);this.unitLength=null;if(this.isBroken){d=a.options.breaks;var c=[],b=[],e=0,f,l=a.userMin||a.min,h=a.userMax||a.max,m=z(a.pointRangePadding,0),g;d.forEach(function(b){f=b.repeat||Infinity;a.isInBreak(b,l)&&(l+=b.to%f-l%f);a.isInBreak(b,h)&&(h-=h%f-b.from%f)});d.forEach(function(b){p=b.from;for(f=b.repeat||
Infinity;p-f>l;)p-=f;for(;p<l;)p+=f;for(g=p;g<h;g+=f)c.push({value:g,move:"in"}),c.push({value:g+(b.to-b.from),move:"out",size:b.breakSize})});c.sort(function(b,a){return b.value===a.value?("in"===b.move?0:1)-("in"===a.move?0:1):b.value-a.value});var n=0;var p=l;c.forEach(function(a){n+="in"===a.move?1:-1;1===n&&"in"===a.move&&(p=a.value);0===n&&(b.push({from:p,to:a.value,len:a.value-p-(a.size||0)}),e+=a.value-p-(a.size||0))});a.breakArray=b;a.unitLength=h-l-e+m;y(a,"afterBreaks");a.staticScale?a.transA=
a.staticScale:a.unitLength&&(a.transA*=(h-a.min+m)/a.unitLength);m&&(a.minPixelPadding=a.transA*a.minPointOffset);a.min=l;a.max=h}});z(l,!0)&&this.chart.redraw()};g(h,"afterGeneratePoints",function(){var d=this.xAxis,c=this.yAxis,h=this.points,m=h.length,a=this.options.connectNulls;if(d&&c&&(d.options.breaks||c.options.breaks))for(;m--;){var g=h[m];var n=null===g.y&&!1===a;n||!d.isInAnyBreak(g.x,!0)&&!c.isInAnyBreak(g.y,!0)||(h.splice(m,1),this.data[m]&&this.data[m].destroyElements())}});g(h,"afterRender",
function(){this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,z(this.pointArrayMap,["y"]))});n.Series.prototype.drawBreaks=function(d,c){var h=this,l=h.points,a,g,n,k;d&&c.forEach(function(b){a=d.breakArray||[];g=d.isXAxis?d.min:z(h.options.threshold,d.min);l.forEach(function(c){k=z(c["stack"+b.toUpperCase()],c[b]);a.forEach(function(a){n=!1;if(g<a.from&&k>a.to||g>a.from&&k<a.from)n="pointBreak";else if(g<a.from&&k>a.from&&k<a.to||g>a.from&&k>a.to&&k<a.from)n="pointInBreak";n&&y(d,n,{point:c,
brk:a})})})})};n.Series.prototype.gappedPath=function(){var d=this.currentDataGrouping,c=d&&d.gapSize;d=this.options.gapSize;var h=this.points.slice(),g=h.length-1,a=this.yAxis;if(d&&0<g)for("value"!==this.options.gapUnit&&(d*=this.basePointRange),c&&c>d&&c>=this.basePointRange&&(d=c);g--;)h[g+1].x-h[g].x>d&&(c=(h[g].x+h[g+1].x)/2,h.splice(g+1,0,{isNull:!0,x:c}),this.options.stacking&&(c=a.stacks[this.stackKey][c]=new n.StackItem(a,a.options.stackLabels,!1,c,this.stack),c.total=0));return this.getGraphPath(h)}});
B(g,"parts-gantt/TreeGrid.js",[g["parts/Globals.js"],g["parts/Utilities.js"],g["parts-gantt/Tree.js"],g["mixins/tree-series.js"]],function(g,r,B,x){var n=r.defined,v=r.extend,y=r.isNumber,t=r.isString,h=r.pick,c=g.addEvent,d=function(a){return Array.prototype.slice.call(a,1)},l=g.find,p=g.fireEvent,m=x.getLevelOptions,a=g.merge,q=function(a){return r.isObject(a,!0)},A=g.wrap;x=g.Axis;var k=g.Tick,b=function(a,b){var c;for(c in b)if(Object.hasOwnProperty.call(b,c)){var d=b[c];A(a,c,d)}},e=function(a,
b){var c=a.collapseStart;a=a.collapseEnd;a>=b&&(c-=.5);return{from:c,to:a,showPoints:!1}},f=function(a){return Object.keys(a.mapOfPosToGridNode).reduce(function(b,c){c=+c;a.min<=c&&a.max>=c&&!a.isInAnyBreak(c)&&b.push(c);return b},[])},D=function(a,b){var c=a.options.breaks||[],d=e(b,a.max);return c.some(function(a){return a.from===d.from&&a.to===d.to})},E=function(a,b){var c=a.options.breaks||[];a=e(b,a.max);c.push(a);return c},F=function(a,b){var c=a.options.breaks||[],d=e(b,a.max);return c.reduce(function(a,
b){b.to===d.to&&b.from===d.from||a.push(b);return a},[])},H=function(a,b){var c=a.labelIcon,d=!c,e=b.renderer,g=b.xy,f=b.options,u=f.width,l=f.height,k=g.x-u/2-f.padding;g=g.y-l/2;var m=b.collapsed?90:180,n=b.show&&y(g);d&&(a.labelIcon=c=e.path(e.symbols[f.type](f.x,f.y,u,l)).addClass("highcharts-label-icon").add(b.group));n||c.attr({y:-9999});e.styledMode||c.attr({"stroke-width":1,fill:h(b.color,"#666666")}).css({cursor:"pointer",stroke:f.lineColor,strokeWidth:f.lineWidth});c[d?"attr":"animate"]({translateX:k,
translateY:g,rotation:m})},I=function(a,b,c){var d=[],e=[],g={},f={},h=-1,u="boolean"===typeof b?b:!1;a=B.getTree(a,{after:function(a){a=f[a.pos];var b=0,c=0;a.children.forEach(function(a){c+=a.descendants+1;b=Math.max(a.height+1,b)});a.descendants=c;a.height=b;a.collapsed&&e.push(a)},before:function(a){var b=q(a.data)?a.data:{},c=t(b.name)?b.name:"",e=g[a.parent];e=q(e)?f[e.pos]:null;var k=function(a){return a.name===c},m;u&&q(e)&&(m=l(e.children,k))?(k=m.pos,m.nodes.push(a)):k=h++;f[k]||(f[k]=m=
{depth:e?e.depth+1:0,name:c,nodes:[a],children:[],pos:k},-1!==k&&d.push(c),q(e)&&e.children.push(m));t(a.id)&&(g[a.id]=a);!0===b.collapsed&&(m.collapsed=!0);a.pos=k}});f=function(a,b){var c=function(a,d,e){var g=d+(-1===d?0:b-1),f=(g-d)/2,h=d+f;a.nodes.forEach(function(a){var b=a.data;q(b)&&(b.y=d+b.seriesIndex,delete b.seriesIndex);a.pos=h});e[h]=a;a.pos=h;a.tickmarkOffset=f+.5;a.collapseStart=g+.5;a.children.forEach(function(a){c(a,g+1,e);g=a.collapseEnd-.5});a.collapseEnd=g+.5;return e};return c(a["-1"],
-1,{})}(f,c);return{categories:d,mapOfIdToNode:g,mapOfPosToGridNode:f,collapsedNodes:e,tree:a}},G=function(b){b.target.axes.filter(function(a){return"treegrid"===a.options.type}).forEach(function(c){var d=c.options||{},e=d.labels,f,h=d.uniqueNames,k=0;if(!c.mapOfPosToGridNode||c.series.some(function(a){return!a.hasRendered||a.isDirtyData||a.isDirty})){d=c.series.reduce(function(a,b){b.visible&&(b.options.data.forEach(function(b){q(b)&&(b.seriesIndex=k,a.push(b))}),!0===h&&k++);return a},[]);var l=
I(d,h,!0===h?k:1);c.categories=l.categories;c.mapOfPosToGridNode=l.mapOfPosToGridNode;c.hasNames=!0;c.tree=l.tree;c.series.forEach(function(b){var c=b.options.data.map(function(b){return q(b)?a(b):b});b.visible&&b.setData(c,!1)});c.mapOptionsToLevel=m({defaults:e,from:1,levels:e.levels,to:c.tree.height});"beforeRender"===b.type&&(f=g.addEvent(c,"foundExtremes",function(){l.collapsedNodes.forEach(function(a){a=E(c,a);c.setBreaks(a,!1)});f()}))}})};b(x.prototype,{init:function(b,d,e){var g="treegrid"===
e.type;g&&(c(d,"beforeRender",G),c(d,"beforeRedraw",G),e=a({grid:{enabled:!0},labels:{align:"left",levels:[{level:void 0},{level:1,style:{fontWeight:"bold"}}],symbol:{type:"triangle",x:-5,y:-5,height:10,width:10,padding:5}},uniqueNames:!1},e,{reversed:!0,grid:{columns:void 0}}));b.apply(this,[d,e]);g&&(this.hasNames=!0,this.options.showLastLabel=!0)},getMaxLabelDimensions:function(a){var b=this.options,c=b&&b.labels;b=c&&y(c.indentation)?b.labels.indentation:0;c=a.apply(this,d(arguments));if("treegrid"===
this.options.type&&this.mapOfPosToGridNode){var e=this.mapOfPosToGridNode[-1].height;c.width+=b*(e-1)}return c},generateTick:function(a,b){var c=q(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},e=this.ticks,g=e[b],f;if("treegrid"===this.options.type){var h=this.mapOfPosToGridNode[b];(c=c[h.depth])&&(f={labels:c});g?(g.parameters.category=h.name,g.options=f,g.addLabel()):e[b]=new k(this,b,null,void 0,{category:h.name,tickmarkOffset:h.tickmarkOffset,options:f})}else a.apply(this,d(arguments))},setTickInterval:function(a){var b=
this.options;"treegrid"===b.type?(this.min=h(this.userMin,b.min,this.dataMin),this.max=h(this.userMax,b.max,this.dataMax),p(this,"foundExtremes"),this.setAxisTranslation(!0),this.tickmarkOffset=.5,this.tickInterval=1,this.tickPositions=this.mapOfPosToGridNode?f(this):[]):a.apply(this,d(arguments))}});b(k.prototype,{getLabelPosition:function(a,b,c,d,e,g,f,k,l){var m=h(this.options&&this.options.labels,g);g=this.pos;var n=this.axis,p="treegrid"===n.options.type;a=a.apply(this,[b,c,d,e,m,f,k,l]);p&&
(b=m&&q(m.symbol)?m.symbol:{},m=m&&y(m.indentation)?m.indentation:0,g=(g=(n=n.mapOfPosToGridNode)&&n[g])&&g.depth||1,a.x+=b.width+2*b.padding+(g-1)*m);return a},renderLabel:function(a){var b=this,c=b.pos,e=b.axis,f=b.label,k=e.mapOfPosToGridNode,l=e.options,m=h(b.options&&b.options.labels,l&&l.labels),p=m&&q(m.symbol)?m.symbol:{},r=(k=k&&k[c])&&k.depth;l="treegrid"===l.type;var w=!(!f||!f.element),t=-1<e.tickPositions.indexOf(c);c=e.chart.styledMode;l&&k&&w&&f.addClass("highcharts-treegrid-node-level-"+
r);a.apply(b,d(arguments));l&&k&&w&&0<k.descendants&&(e=D(e,k),H(b,{color:!c&&f.styles.color,collapsed:e,group:f.parentGroup,options:p,renderer:f.renderer,show:t,xy:f.xy}),p="highcharts-treegrid-node-"+(e?"expanded":"collapsed"),f.addClass("highcharts-treegrid-node-"+(e?"collapsed":"expanded")).removeClass(p),c||f.css({cursor:"pointer"}),[f,b.labelIcon].forEach(function(a){a.attachedTreeGridEvents||(g.addEvent(a.element,"mouseover",function(){f.addClass("highcharts-treegrid-node-active");f.renderer.styledMode||
f.css({textDecoration:"underline"})}),g.addEvent(a.element,"mouseout",function(){var a=n(m.style)?m.style:{};f.removeClass("highcharts-treegrid-node-active");f.renderer.styledMode||f.css({textDecoration:a.textDecoration})}),g.addEvent(a.element,"click",function(){b.toggleCollapse()}),a.attachedTreeGridEvents=!0)}))}});v(k.prototype,{collapse:function(a){var b=this.axis,c=E(b,b.mapOfPosToGridNode[this.pos]);b.setBreaks(c,h(a,!0))},expand:function(a){var b=this.axis,c=F(b,b.mapOfPosToGridNode[this.pos]);
b.setBreaks(c,h(a,!0))},toggleCollapse:function(a){var b=this.axis;var c=b.mapOfPosToGridNode[this.pos];c=D(b,c)?F(b,c):E(b,c);b.setBreaks(c,h(a,!0))}});x.prototype.utils={getNode:B.getNode}});B(g,"masters/modules/treegrid.src.js",[],function(){})});
//# sourceMappingURL=treegrid.js.map