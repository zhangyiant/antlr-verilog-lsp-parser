var antlr4 = require('antlr4');
var VerilogLexer = require('./Verilog2001Lexer').Verilog2001Lexer;
var VerilogParser = require('./Verilog2001Parser').Verilog2001Parser;
var VerilogListener = require('./Verilog2001Listener').Verilog2001Listener;
var fs = require('fs');
var fs = re
var input = fs.readFileSync("resources/a.v", {encoding: "utf8"});
var chars = new antlr4.InputStream(input);
var lexer = new VerilogLexer(chars);
var tokens  = new antlr4.CommonTokenStream(lexer);
var parser = new VerilogParser(tokens);
var listener = new VerilogListener();
parser.buildParseTrees = true;
var tree = parser.module_declaration();

class Visitor {
    visitChildren(ctx) {
      if (!ctx) {
        return;
      }
  
      if (ctx.children) {
        return ctx.children.map(child => {
          if (child.children && child.children.length != 0) {
            return child.accept(this);
          } else {
              console.log(child.getText());
            return child.getText();
          }
        });
      }
    }
  }
  
  // tree.accept(new Visitor());

  antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

console.log(tokens.getNumberOfOnChannelTokens());
var i = 0;
while (i < 700) {
  console.log(tokens.get(i).text);
  i++;
}
