/*
* @Author: Shuhuasong
* @Date:   2020-08-06 20:15:34
* @Last Modified by:   Shuhuasong
* @Last Modified time: 2020-08-06 22:30:38
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

//side navigation
var navSide = {
    option : { //option 1
      name : '',
      navList : [ 
         { name: 'user-center', desc: 'Personal Center',  href: './user-center.html'},
         { name: 'order-list', desc: 'My Order',  href: './order-list.html'},
         { name: 'pass-update', desc: 'Update Password',  href: './pass-update.html'},
         { name: 'about', desc: 'About MMall',   href: './about.html'}
      ]
    },
    init : function(option){ //extend only work on first layer
      //merge the two options  
      $.extend(this.option, option); //option2.  the first option will be change
      this.renderNav();
    },
    //Fill the Side-Nav Menu
    renderNav : function(){
      //calculate the actice data
      for(var i = 0, iLength = this.option.navList.length; i<iLength; i++){
        if(this.option.navList[i].name === this.option.name){
           this.option.navList[i].isActive = true; 
        }
      };
      //fill the list data
      var navHtml = _mm.renderHtml(templateIndex, {
        navList : this.option.navList
      });
      //put html into container
      $('.nav-side').html(navHtml);
    }
};

 module.exports = navSide;