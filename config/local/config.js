const path = require('path');
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var listDirinDir = function(dir) {
    var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) results.push(file)
    })
    return results
}
const localConfig={
    domain:'www.heheking.com',
}

const makeCinfig=(dir)=>{
    let entry={};
    let catagroy_pages={
        formatter:{
            catagroy_title:'格式化工具',
            subPages:[]
        },
        formatter_monaco:{
            catagroy_title:'格式化工具-monaco',
            subPages:[]
        },
    };
    let single_pages=[];
    const listdir=listDirinDir(dir);
    listdir.forEach((dir_name)=>{
        let item_config=require(path.resolve(`${dir_name}/config.js`)).config;
        let item_content=fs.readFileSync(path.resolve(`${dir_name}/content.html`));
        const {script,catagroy,template,...rest}=item_config;
        let pageconfig={...rest}
        pageconfig.chunks=[]
        script.forEach((scriptStr)=>{
            let reg=/\/(\w+)\./;
            let id =reg.exec(scriptStr)[1];
            if (id in entry){
                if (entry[id]!=scriptStr){
                    throw "script-contract";
                }
            }
            entry[id]=scriptStr;
            pageconfig.chunks.push(id);
        })

        pageconfig.template=path.resolve('./src/template/',template)
        pageconfig.inject=true;
        pageconfig.minify=true;
        pageconfig.id=path.basename(dir_name);
        pageconfig.filename=`${pageconfig.id}.html`;
        pageconfig.content.content=item_content;

        if (catagroy in catagroy_pages){
            catagroy_pages[catagroy].subPages.push(pageconfig);
        }else{
            single_pages.push(pageconfig);
        }
    });

    Object.keys(catagroy_pages).forEach((pagesin_key)=>{
        catagroy_pages[pagesin_key].subPages.sort((a,b)=>{
            return a.index-b.index;
        })
    })
    const topbar=(require(path.resolve('./src/components/topbar.js')).maketopBar)(localConfig);
    const footer=(require(path.resolve('./src/components/footer.js')).makefooter)(localConfig);
    const sidebar=(require(path.resolve('./src/components/make_sidebar.js')).makeSideBar)(catagroy_pages);
    const contentappend={topbar,footer,sidebar}
    let plugins=[]
    Object.keys(catagroy_pages).forEach((pagesin_key)=>{
        catagroy_pages[pagesin_key].subPages.forEach((item)=>{
            plugins.push(
                new HtmlWebpackPlugin({
                    ...item,
                    content:{
                        ...item.content,
                        ...contentappend
                    }
                })
            )
        })
    })

    single_pages.forEach((item)=>{
        plugins.push(
            new HtmlWebpackPlugin({
                ...item,
                content:{
                    ...item.content,
                    ...contentappend
                }
            })
        )
    })
    return {entry,plugins}
}

exports.config=function(content_dir){
    return makeCinfig(content_dir);
}(path.resolve('./src/content'))