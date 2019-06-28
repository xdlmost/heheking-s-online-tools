var pd = require('./common/pd.js').pd;

const testcase='<?xml version="1.0" encoding="UTF-8"?><XhwNewsML><Version>0.0.1</Version><ApiType>article</ApiType><PushTime>2018-12-25 15:05:00</PushTime><ACTION>1</ACTION><Relevant/><NodeList>    <NodeInfo ID="11109319">      <GAttr>63</GAttr>      <GDisplayOrder>-66480150.1020580000000000000</GDisplayOrder>    <NodeId>11109319</NodeId></NodeInfo>    <NodeInfo ID="11187043">            <GAttr>63</GAttr>      <GDisplayOrder>-66480150.1020580000000000000</GDisplayOrder>    <NodeId>11187043</NodeId></NodeInfo>  </NodeList></XhwNewsML>'

monaco.languages.registerDocumentFormattingEditProvider("xml", {
    async provideDocumentFormattingEdits(model) {
      var formatted = await pd.xml(model.getValue());
      console.log(model.getValue())
      console.log(formatted)
      return [
        {
          range: model.getFullModelRange(),
          text: formatted,
        },
      ];
    }
  });

var editor = monaco.editor.create(document.getElementById('codecontainer'), {
    language: 'xml',
    theme: "vs"
});

editor.addAction({
	// An unique identifier of the contributed action.
	id: 'editor.action.minifyDocument',

	// A label of the action that will be presented to the user.
	label: 'Minify Document',

	// An optional array of keybindings for the action.
	keybindings: [

		monaco.KeyMod.chord(monaco.KeyMod.Alt| monaco.KeyMod.Shift| monaco.KeyCode.KEY_M)
	],

	// A precondition for this action.
	precondition: null,

	// A rule to evaluate on top of the precondition in order to dispatch the keybindings.
	keybindingContext: null,

	contextMenuGroupId: 'navigation',

	contextMenuOrder: 1.5,

	run: function(ed) {
        var minifyedxml=pd.xmlmin(ed.getModel().getValue())
        ed.executeEdits('', [{
            range: ed.getModel().getFullModelRange(), 
            text: minifyedxml, 
        }]);
		return null;
	}
});

var format_button = document.getElementById("xml_format");
format_button.addEventListener('click',()=>{
    var ac=editor.getAction('editor.action.formatDocument')
    ac.run()
})

var minify_button = document.getElementById("xml_minify");
minify_button.addEventListener('click',()=>{
    var ac=editor.getAction('editor.action.minifyDocument')
    ac.run()
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
console.log(window.location.pathname)

