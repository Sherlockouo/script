// ==UserScript==
// @name         教务系统自动评价
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       JM Wan && DF Wu
// @match        http://jwc.xhu.edu.cn/xspjgl/xspj_cxXspjIndex.html?*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @grant        none、
// ==/UserScript==

(function() {
    'use strict';
    function pj() {
        $(".radio-pjf").each(function(i, e){
            let t = Math.floor(i / 5)
            if (t % 2 == 0) {
                 if($(this).data("dyf") == 100) {
                    $(this).attr('checked', 'true')
                }
            } else {
                if($(this).data("dyf") == 80) {
                    $(this).attr('checked', 'true')
                }
            }
        })
    }
    function save() {
        $("#btn_xspj_bc").click()
    }
    function num() {
        return $("#tempGrid").children("tbody").children('tr').length - 1
    }
    function ok() {
        $("#btn_ok").click()
    }
    function next(i) {

        let t = $("#tempGrid").children("tbody").children('tr')[i+1].click()
        console.log(i,t)
    }
    function get(i){
        return $("#tempGrid").children("tbody").children('tr')[i+1].children[7].innerText
    }
    setTimeout(()=>{
        // 获取数量
        let sum = num()
        let arr = new Array(12)
        for (let i = 0;i < sum - 1; i++){
            let timer = setInterval(()=>{
                if(get(i+1)=='已评完')
                    clearInterval(timer)
                pj()
                save()
                setTimeout(() => {
                    ok()
                    setTimeout(() => {
                        next(i+1)
                    },500)
                },100)
            },1000)
        }
    }, 1500)
})();
