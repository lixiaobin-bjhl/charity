/**
 * @file 列表公共资源
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

export default {
    data () {
        return {
            pageDto: {
                pageNum: 1,
                count: 0,
                pageSize: 20
            }
        };
    },
    methods: {
        /**
         * 分页码发生改弯 
         */
        changePage (pageNum) {
            this.pageDto.pageNum = pageNum;
            this.getList();
        },
        /**
         * 分页size发生变化 
         */
        changeSize (pageSize) {
            this.pageDto.pageSize = pageSize;
            this.getList();
        }
    }
}