/**
 * @file 全局mixin
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

export default {
	install (Vue) {
		Vue.mixin({
            data () {
                return {
                    pageNum: 1,
                    pageSize: 20
                };
            },
			mounted () {
				setTimeout(()=> {
					// this.initAuthority && this.initAuthority();
				});
			},
			computed: {
				
			},
			methods: {
				
			},
			watch: {
				orgInfo: {
					handler (newValue) {
						if (newValue) {
			                setTimeout(()=> {
			                	this.initAuthority && this.initAuthority();
			                });
			            }
			        },
					deep: true
		        }
			}
		});
	}
}