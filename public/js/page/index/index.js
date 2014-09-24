$(document).ready(function(){
  var ul = $('#p-ul-wrap');
  var lists = indexData.list;
  ul.append(tpl(lists));
});


function tpl(lists){
    var arr = [];
    for(var i = 0;i<lists.length;i++){
        arr.push('<li>');
        arr.push('<a hidefocus="true" target="_blank" href="'+lists[i].href+'">');
        arr.push('<div class="image" title="'+lists[i].alt+'">');
        arr.push('<img class="lazy" data-src="'+lists[i].img+'" alt="'+lists[i].alt+'" src="'+lists[i].img+'" style="display: inline;">');
        arr.push('</div>');
        arr.push('<div class="title" title="'+lists[i].alt+'">');
        arr.push(lists[i].alt);
        arr.push('</div>');
        arr.push('<div class="price-info ">');
        arr.push('<span class="pink f-14">¥</span>');
        arr.push('<span class="price price-int">'+lists[i].priceInt+'</span><span class="price price-decimal">'+lists[i].priceDecimal+'</span>');
        arr.push('<span class="origin-price strike mr-10">'+lists[i].originPrice+'</span>');
        arr.push('<span class="discount">'+lists[i].discount+'</span>');
        arr.push('</div>');
        arr.push('</a>');
        arr.push('</li>');
    }
    return arr.join('');
}



/*
<li>
    <a hidefocus="true" target="_blank"
    href="http://item.koudai.com/vtem?itemId=vdian256742514&category=home">
        <div class="image" title="2014秋冬款新品 韩版太空棉女童天鹅短款小外套童装">
            <img class="lazy"
            data-src="http://img.geilicdn.com/SBB5hFTyYx5H3CxjRYpCr7IzQ5oYbAl-ze6arvsbzI2o5d=_750x750.jpg"
            alt="2014秋冬款新品 韩版太空棉女童天鹅短款小外套童装"
            src="http://img.geilicdn.com/SBB5hFTyYx5H3CxjRYpCr7IzQ5oYbAl-ze6arvsbzI2o5d=_750x750.jpg"
            style="display: inline;">
            </div>

            <div class="title" title="2014秋冬款新品 韩版太空棉女童天鹅短款小外套童装">
            2014秋冬款新品 韩版太空棉女童天鹅短款小外套童装
            </div>
            <div class="price-info ">
                <span class="pink f-14">¥</span>
                <span class="price price-int">58.</span><span class="price price-decimal">90</span>
                <span class="origin-price strike mr-10">¥80.00</span>
                <span class="discount">7.3折</span>
            </div>
        </a>
    </li>*/
