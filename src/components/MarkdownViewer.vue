<template>
      <div>
        <div class="mb-1 color-666 font-weight-light subheading" v-html="compiledMarkdown"></div>
      </div>
</template>

<script>

export default {
  name: 'MarkdownViewer',
	props: {
        content: {type: String},
  },
  computed: {
    compiledMarkdown: function () {
        console.log( marked(this.content))
      return marked(this.content)
    }
  },
}
</script>
