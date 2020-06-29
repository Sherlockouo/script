// ==UserScript==
// @name         西华大学选课脚本
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       WDF
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  /**
   * 西华大学一键式选课脚本
   * 此脚本只能简单的帮你抢你能选的课
   * 使用此脚本是您自愿使用的造成的损失作者概不负责·
   * @author WDF
   * 有问题请联系我
   * @QQ 2921235963
   */
  let courseName = ["足球", "网球"]

  document.getElementsByClassName("panel panel-info")[0].getElementsByClassName("nav nav-tabs sl_nav_tabs")[0].getElementsByTagName("li")[1].getElementsByTagName("a")[0].click()

  let o = document.getElementById("more")
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      o.getElementsByTagName("a")[0].click()
    }, 1000)
  }

  let cnt = 0

  // 等待加载出课程
  setTimeout(() => {
    console.log('loading...')

    //进入选课界面
    let courseList = document.getElementsByClassName("panel panel-info")
    for (let j = 0; j < courseName.length; j++) {
      cnt = cnt +1
      if (j>0)
        console.log(courseName[j-1] + '选课成功!\n')

      console.log('当前准备选择的课程:' + courseName[j])
      let i
      // 搜索课程
      for (i = 1; i < courseList.length; i++) {
        setTimeout(() => {
        }, 1000)

        let oo = courseList[i].getElementsByClassName("panel-heading kc_head")[0].getElementsByClassName("panel-title")[0]
        let thisText = oo.getElementsByClassName("kcmc")[0].getElementsByTagName("a")[0].innerText

        if (courseName[j] == thisText) {
          courseList[i].getElementsByClassName("panel-heading kc_head")[0].getElementsByClassName("panel-title")[0].click()
          break;
        }
      }
      let flag = false
      const timer = setInterval(() => {
        if (flag)
          clearInterval(timer)
        // 获取当前课程列表
        let list = courseList[i].getElementsByClassName("panel-body table-responsive")[0].getElementsByClassName("table table-hover")[0].getElementsByClassName("body_tr")

        for (let k = 0; k < list.length; k++) {

          let o = list[k].getElementsByClassName("an")[0].getElementsByClassName("btn btn-primary btn-sm")[0]
          if (o == null)
            o = list[k].getElementsByClassName("an")[0].getElementsByClassName("btn btn-danger btn-sm")[0]
          // console.log(k+"---"+o.innerText)
          if (o.innerText == "选课") {
            o.click()
            setTimeout(() => {
              let content = document.getElementsByClassName("modal-content")[0]
              if (content != null) {
                let message = content.getElementsByClassName("modal-body")[0].getElementsByClassName("bootbox-body")[0].getElementsByClassName("alert alert-modal")[0].innerText
                if (message=="一门课程最多可选1个志愿！")
                  clearInterval(timer)
                var ok_btn = content.getElementsByClassName("modal-footer ui-draggable-handle")[0].getElementsByClassName("btn btn-sm btn-default")[0]
                if (ok_btn != null)
                  ok_btn.click()
              }
            }, 750)
          } else {
            flag = true
            clearInterval(timer)
          }
          if (flag)
            break
        }
      }, 1500)

    }
  }, 2000)
  if(cnt==courseName.length)
    console.log('选课成功')

})();