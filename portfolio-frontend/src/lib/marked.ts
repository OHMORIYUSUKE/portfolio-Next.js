import marked from 'marked';

export const markedOption = marked.setOptions({
  gfm: true,
  breaks: true,
  silent: false,
});

//rendererを行う関数を実装する
export const markedRender = function () {
  //rendererの初期化
  const renderer = new marked.Renderer();

  //renderer.headingでh1,h2,h3...要素を取得し、クラスを付与する。
  renderer.heading = function (text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `
    <style>
    h${level} {
        padding: 1rem 2rem;
        border-left: 7px solid #000080;
        background-color: #EEEEEE;
      }
    </style>
    <h${level} class="author" href="#${escapedText}">
    ${text}
    </h${level}>
    `;
  };
  //linkや他の要素も同様
  renderer.link = function (href, title, text) {
    return `
    <a class="contentLink" href=${href} title=${title}>${text}</a>
    `;
  };
  renderer.table = function (header, body) {
    return `
    <style>table {
        border-collapse:  collapse; /* セルの線を重ねる */
        margin-top: 20px;
        margin-bottom: 20px;
    }
    
    tr:nth-child(even) {
        background-color:  #f8f8ff;    /* 背景色指定 */
    }
    
    th,td {
        padding: 5px 30px;          /* 余白指定 */
    }
    table th{/*thに対して*/
        color: #ffff;/*文字色*/
        background: #2196F3;/*背景色*/
      }</style>
    <div class="scroll-table">
    <table class="contentTable">
    <thead class="contentThead">${header}</thead>
    <tbody class="contentTbody">${body}</tbody>
    </table>
    </div>
    `;
  };
  renderer.paragraph = function (text) {
    return `
    <p class="paragraph">${text}</p>
    `;
  };
  renderer.listitem = function (text) {
    return `
    <style>
    ol {
        counter-reset: li; 
        list-style: none; 
      }
      
      li {
        line-height: 1.8;
      }
      
      ol > li::before {
        margin-right: 0.25rem;
        content:counter(li) ".";
        counter-increment: li;
        font-size: 24px;
        font-weight: lighter;
      }
    </style>
    <li>${text}</li>
    `;
  };
  renderer.hr = function () {
    return `
    <style>
    hr{
      height: 1.5px;
      background-color: #000080;
      border: none;
      color: #000080;
    }
    </style>
    <hr>`;
  };
  //最後にまとめてrendererを返す
  return renderer;
};