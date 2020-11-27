<template>
  <div id="editor"></div>
</template>

<script>
import Editor from "@toast-ui/editor";
import "codemirror/lib/codemirror.css"; // Editor's Dependency Style
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style

export default {
  methods: {
    seteditor() {
      const editor = new Editor({
        el: document.querySelector("#editor"),
        height: "600px",
        initialEditType: "markdown",
        previewStyle: "vertical"
      });
    }
  },
  mounted() {
    this.seteditor();
  }
};
</script>

<style></style>
