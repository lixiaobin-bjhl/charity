<!--
  @fileOverview charity-cms-common 详情头部样式
  @author XiaoBin Li(lixiaobin8878@gmail.com) 
-->

<template>
	<div class="top-head_div">
		<p class="title_p">{{title}}</p>
		<span class="iconfont icon-times" @click="click"></span>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String
			}
		},
		methods: {
			click() {
				this.$emit('clickright');
			}
		}
	}
</script>