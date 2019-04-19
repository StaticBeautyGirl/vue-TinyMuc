<template>
  <div class="rich-text">
    <div :id="editorId"></div>
  </div>
</template>

<script>
// import "tinymce/plugins/image";
// import "tinymce/plugins/link";
// import "tinymce/plugins/code";
// import "tinymce/plugins/table";
// import "tinymce/plugins/lists";
// import "tinymce/plugins/contextmenu";
// import "tinymce/plugins/wordcount";
// import "tinymce/plugins/colorpicker";
// import "tinymce/plugins/textcolor";
export default {
  props: {
    html: { type: String, default: "<p></p>" } // HTML 内容
  },
  model: {
    prop: "html",
    event: "text-changed" // 编辑器的内容发生变化后触发, 参数为编辑的 HTML
  },
  // data() {
  //   return {
  //     editor: null
  //   };
  // },
  mounted() {
    const self = this;
    tinymce
      .init({
        selector: `#${this.editorId}`,
        language: "zh_CN",
        language_url: "../../static/langs/zh_CN.js",
        height:300,
        width:762,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu media emoticons",
        toolbar:
          "media bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | emoticons",
        branding: false,
        setup: function(editor) {
          console.log(editor.settings, "editor");
          editor.on("focus", () => {
            console.log(editor.setContent(""));
          });
          // 编辑器内容发生变化后更新 html 的内容
          editor.on("change keyup", () => {
            //打印去除前后空格的editor.getContent()
            // 获取输入的在文本域中的值
            console.log(editor.getContent());
          });
        }
      })
      .then(editors => {
        this.editor = editors[0];
        this.editor.setContent(this.html);
      });
  },
  computed: {
    // 使用时间戳和随机数生成 editorId
    editorId() {
      const time = new Date().getTime();
      const rand = Math.floor(Math.random() * 100000000);
      return `editor-${time}-${rand}`;
    }
  },
  beforeDestroy() {
    // 销毁编辑器
    this.editor.remove();
  },
  watch: {
    // 外部修改 v-model 绑定的 html 的值时更新编辑器的内容
    html(newValue, oldValue) {
      if (newValue != this.editor.getContent()) {
        this.editor.setContent(newValue || "<p></p>");
      }
    }
  }
};
</script>
