function makeSideBar(config){
    let str_pages=''
    for (listPage of config){
        const {index,subPages}=listPage;
        let str_list=`<a href="./${index.id}.html"><h5>${index.title}</h5></a>`
        let str_sub_pages=''
        for (subPage of subPages){
            str_sub_pages+=`<li><a href="./${subPage.id}.html">${subPage.title}</a></li>`
        }
        str_pages+=`${str_list}<ul>${str_sub_pages}</ul>`
    }
    return `<div class="well">${str_pages}</div>`
}

exports.makeSideBar= makeSideBar;