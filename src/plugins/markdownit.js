import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

let md1 = new MarkdownIt({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code class=' + lang +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
          );
        } catch (__) {}
      }
      return (
        '<pre class="hljs"><code class=' + lang +
        md1.utils.escapeHtml(str) +
        "</code></pre>"
        );
      },
});

let md2 = new MarkdownIt({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="aahljs"><code class=' + lang +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
          );
        } catch (__) {}
      }
      return (
        '<pre class="aahljs"><code class=' + lang +
        md2.utils.escapeHtml(str) +
        "</code></pre>"
        );
      },
});

export {md1,md2}

// mdtohtml(content) {
//   const MarkdownIt = require("markdown-it");
  
//   const result = md.render(content);
//   return result
// }