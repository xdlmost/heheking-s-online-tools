function makeSideBar(config){
    let str_pages=''
    Object.keys(config).forEach((categtoy_key)=>{
        const {catagroy_title,subPages}=config[categtoy_key];
        let str_list=`<h5 class="sidebartitle">${catagroy_title}</h5>`
        let str_sub_pages=''
        for (subPage of subPages){
            str_sub_pages+=`<li><a href="./${subPage.id}.html">${subPage.archText}</a></li>`
        }
        str_pages+=`${str_list}<ul>${str_sub_pages}</ul>`
    })
    return `<div class="well"><a href="./index.html"><img src="./static/img/logo2.png" width="100%" alt="呵呵大王的工具箱logo"/></a>${str_pages}</div>`
}
exports.makeSideBar= makeSideBar;