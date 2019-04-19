<template>
  <div id="app">
    <div class="editor-demo">
      <RichText v-model="html"/>
    </div>
  </div>
</template>
<script>
import RichText from "@/components/RichText.vue"
export default {
  components: { RichText },
  data() {
    return {
      html: "请进行输入...."
    };
  }
};
</script>
<style>
  .editor-demo{
    color:#eee;
  }
</style>

