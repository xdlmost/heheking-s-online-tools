var pd = require('./common/pd.js').pd;

var testcase='<?xml version="1.0" encoding="UTF-8"?><XhwNewsML><Version>0.0.1</Version><ApiType>article</ApiType><PushTime>2018-12-25 15:05:00</PushTime><ACTION>1</ACTION><Relevant/><NodeList>    <NodeInfo ID="11109319">      <GAttr>63</GAttr>      <GDisplayOrder>-66480150.1020580000000000000</GDisplayOrder>    <NodeId>11109319</NodeId></NodeInfo>    <NodeInfo ID="11187043">            <GAttr>63</GAttr>      <GDisplayOrder>-66480150.1020580000000000000</GDisplayOrder>    <NodeId>11187043</NodeId></NodeInfo>  </NodeList></XhwNewsML>'


var codecontainer = document.getElementById("codecontainer");

var format_button = document.getElementById("xml_format");
format_button.addEventListener('click',()=>{
	codecontainer.value=pd.xml(codecontainer.value)
})

var minify_button = document.getElementById("xml_minify");
minify_button.addEventListener('click',()=>{
	codecontainer.value=pd.xmlmin(codecontainer.value)
})


var xml_usecase = document.getElementById("xml_usecase");
xml_usecase.addEventListener('click',()=>{
	codecontainer.value=testcase
})
