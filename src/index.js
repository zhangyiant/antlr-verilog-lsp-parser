var antlr4 = require('antlr4');
var VerilogLexer = require('./Verilog2001Lexer').Verilog2001Lexer;
var VerilogParser = require('./Verilog2001Parser').Verilog2001Parser;
var VerilogListener = require('./Verilog2001Listener').Verilog2001Listener;
var fs = require('fs');



// class Visitor {
//     visitChildren(ctx) {
//       if (!ctx) {
//         return;
//       }
  
//       if (ctx.children) {
//         return ctx.children.map(child => {
//           if (child.children && child.children.length != 0) {
//             return child.accept(this);
//           } else {
//               console.log(child.getText());
//             return child.getText();
//           }
//         });
//       }
//     }
//   }
  
  // tree.accept(new Visitor());

  // antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

function parse(document) {
  var chars = new antlr4.InputStream(document);
  var lexer = new VerilogLexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new VerilogParser(tokens);
  var listener = new VerilogListener();
  parser.buildParseTrees = true;
  var tree = parser.module_declaration();
  var module_indentifier = tree.module_identifier();
  if (module_indentifier) {
    return { "module_name": module_indentifier.getText()}
  }
  return {};
}


module.exports.parse = parse;

if (require.main === module) {
    var input = fs.readFileSync("resources/a.v", {encoding: "utf8"});
    var result = parse(input);
  console.log(result);
}