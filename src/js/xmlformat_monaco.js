var pd = require('./common/pd.js').pd;
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
import 'monaco-editor/esm/vs/editor/contrib/folding/folding.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js';

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		return './editor.worker.bundle.js';
	}
}
var testcase='<?xml version="1.0" encoding="UTF-8"?><XhwNewsML><Version>0.0.1</Version><ApiType>article</ApiType><PushTime>2018-12-25 15:05:00</PushTime><ACTION>1</ACTION><Relevant/><NodeList>    <NodeInfo ID="11109319">      <GAttr>63</GAttr>      <GDisplayOrder>-66480150.1020580000000000000</GDisplayOrder>    <NodeId>11109319</NodeId></NodeInfo>    <NodeInfo ID="11187043">            <GAttr>63</GAttr>      <GDisplayOrder>-66480150.1020580000000000000</GDisplayOrder>    <NodeId>11187043</NodeId></NodeInfo>  </NodeList></XhwNewsML>'


var editor = monaco.editor.create(document.getElementById('codecontainer'), {
    language: 'xml',
    theme: "vs"
});


var format_button = document.getElementById("xml_format");
format_button.addEventListener('click',()=>{
	var minifyedxml=pd.xml(editor.getModel().getValue())
	editor.executeEdits('', [{
		range: editor.getModel().getFullModelRange(), 
		text: minifyedxml, 
	}]);
})

var minify_button = document.getElementById("xml_minify");
minify_button.addEventListener('click',()=>{
	var minifyedxml=pd.xmlmin(editor.getModel().getValue())
	editor.executeEdits('', [{
		range: editor.getModel().getFullModelRange(), 
		text: minifyedxml, 
	}]);
})

var theme_picker = document.getElementById("theme_picker");
theme_picker.addEventListener('change',(e)=>{
    monaco.editor.setTheme(e.target.value)
})

var xml_usecase = document.getElementById("xml_usecase");
xml_usecase.addEventListener('click',()=>{
    editor.executeEdits('', [{
        range: editor.getModel().getFullModelRange(), 
        text: testcase, 
    }]);
})
