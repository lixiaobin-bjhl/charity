<template>
    <div class="pagination">
        <el-pagination v-if="visiable"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageDto.pageNum"
            :page-sizes="pageDto.pageSizes"
            :page-size="pageDto.pageSize"
            :layout="layout"
            :total="pageDto.count">
        </el-pagination>
    </div>
</template>

<script>

    function getTotalPages(pageSize, count) {
        var totalPages = pageSize < 1 ? 1 : Math.ceil(count / pageSize);
        // return Math.max(totalPages || 0, 1);
        return totalPages || 0;
    }
    
    export default {
        props: {
            layout: {
                default: 'total, sizes, prev, pager, next, jumper'
            },
            pageDto: {
                type: Object,
                default: function() {
                    return {
                        "count": 0,
                        "curPageCount": 1,
                        "pageNum": 0,
                        "pageSize": 20,
                        "totalPageNum": 1
                    }
                }
            }
        },
        computed: {
            visiable () {
                var pageDto = this.pageDto;
                if (!pageDto) {
                    return false;
                } else {
                    return getTotalPages(pageDto.pageSize, pageDto.count) > 0;
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                this.$emit('sizechange', val);
            },
            handleCurrentChange(val) {
                this.$emit('currentchange', val);
            }
        }
    }
</script>