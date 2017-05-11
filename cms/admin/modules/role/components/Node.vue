<template>
	<li v-if="node">
		<div class="item" :class="{active: node.$active, expanded:node.$expand}" @click.stop="selectNode(node)">
	        <span :title="node.name">{{node.name}}</span>
	        <i v-if="node.children && node.children.length" class="left-triangle"></i>
	        <span class="operate">
	            <el-tooltip placement="top" :content="!node.id ? '添加一级菜单':'添加子菜单'">
	                <span class="icon icon-btn_add" v-if="hasAuth(11, 'add')" @click.stop="add(node)"></span>
	            </el-tooltip>
	            <el-tooltip v-if="node.id"  placement="top" content="编辑">
	                <span class="icon icon-bt-edit"  v-if="hasAuth(11, 'mod')" @click.stop="edit(node, true)"></span>
	            </el-tooltip>
	            <el-tooltip v-if="node.id" placement="top" content="删除">
	                <span class="icon icon-delete" v-if="hasAuth(11, 'del')" @click.stop="del(node)"></span>
	            </el-tooltip>
	        </span>
        </div>
        <ul v-if="node.$expand">
	    	<node v-for="item in node.children" :node="item" :parent="node"></node>
	    </ul>
    </li>
</template>

<script>
	export default {
		name: 'node',
		props: {
			node: {
				type: Object
			},
			parent: {
				type: Object
			}
		},
		methods: {
			getTopNode () {
				var topNodeItem = this;
				while (!topNodeItem.$parent.nodeData) {
  					topNodeItem = topNodeItem.$parent;
  				}
  				return topNodeItem;
			},
			edit (item) {
				var topNode = this.getTopNode();
				var node = $.extend(true, {}, item);
				node.children = null;
  				topNode.$emit('edit', node);
			},
			del (item) {
				var topNode = this.getTopNode();
  				topNode.$emit('del', item);
			},
			/**
			 * 添加组织架构
			 */
			add (item) {
				var topNode = this.getTopNode();
				var node = $.extend(true, {}, item);
				// 回填的时候，不要显示children, 把children清掉
				node.children = null;
  				topNode.$emit('add', node);
			},
			/**
	         * 选择节点
	         */
	        selectNode (node) {
	        	var topNode = this.getTopNode();
	        	// 将父级下的所有子节点的active取消掉
	        	var ids = [];
	        	function rmeoveActive(nodes) {
	        		nodes.forEach((item)=>{
	        			Vue.set(item, '$active', 0);
	        			ids.push(item.id);
	        			if (item.children && item.children.length) {
	        				rmeoveActive(item.children);
	        			}
	        		});
	        	}
	        	if (this.parent && this.parent.children) {
	        		rmeoveActive(this.parent.children);
	        	}
	        	topNode.$emit('removeactiveids', ids);
		        topNode.$emit('select', node, node.$active ? 0 : 1, node.$expand ? 0 : 1);
	        	Vue.set(node, '$expand', node.$expand ? 0 : 1);
	        	Vue.set(node, '$active', node.$active ? 0 : 1);
	        }
		}
	}
</script>