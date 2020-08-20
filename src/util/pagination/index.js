/*
* @Author: Shuhuasong
* @Date:   2020-08-15 15:02:46
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-16 16:16:40
*/
'use strict';

require('./index.css');
var _mm  = require('util/mm.js');
var templatePagination = require('./index.string');


var Pagination  = function(){
    var _this = this;
    this.defaultOption = {
        container    : null,
        pageNum      : 1,
        pageRange    : 3,
        onSelectPage : null
    };
    //deal with event--event agent
    $(document).on('click', '.pg-item', function(){
      var $this = $(this);
      if($this.hasClass('active') || $this.hasClass('disabled')){
        return;
      }
      typeof  _this.option.onSelectPage === 'function' 
            ?  _this.option.onSelectPage($this.data('value')) : null;
    });

}
//render pagination component
Pagination.prototype.render = function(userOption){
    //merge option
  this.option = $.extend({}, this.defaultOption, userOption);
  //check is the container is a validate jQuery object 
  if(!(this.option.container instanceof jQuery)){
    return;
  }
  //check if only 1 page
  if(this.option.pages <= 1){
    return;
  }
  //render pagination content
  this.option.container.html(this.getPaginationHtml());
}
//Get pagination html
Pagination.prototype.getPaginationHtml = function(){
    // |prev page| 1 2 3 4 5 6 |next page| 
    var html = '',
        option = this.option,
        pageArray  = [],
        start   = option.pageNum - option.pageRange > 0
        ? option.pageNum - option.pageRange : 1,
        end     = option.pageNum + option.pageRange < option.pages 
        ? option.pageNum + option.pageRange : option.pages;
    //Prev page data
    pageArray.push({
        name : 'prev',
        value : this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });
    //data button
    for(var i = start; i<= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i===option.pageNum)
        });
    };
    //next page data
    pageArray.push({
        name : 'next',
        value : this.option.nextPage,
        disabled: !this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination, {
        pageArray : pageArray,
        pageNum   : option.pageNum,
        pages     : option.pages
    });
    return html;
};

 module.exports = Pagination;