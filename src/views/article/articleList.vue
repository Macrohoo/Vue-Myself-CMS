<template>
  <div class="articleList">
    <el-table :data="articletData">
      <el-table-column fixed prop="created_at" label="发布时间" width="180" />
      <el-table-column prop="title" label="文章标题" />
      <el-table-column prop="comment_num" label="评论数" width="100" />
      <el-table-column prop="praise_num" label="点赞数" width="100" />
      <el-table-column prop="author_name" label="作者" width="150" />
      <el-table-column prop="read_num" label="浏览数" width="100" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="total"
      hide-on-single-page
      @current-change="currentChange"
      @prev-click="currentChange"
      @next-click="currentChange"
    />
  </div>
</template>

<script>
import { fetchArticleList, fetchDelArticle } from '@/api/apis/article'

export default {
  name: 'ArticleList',
  data() {
    return {
      total: 0,
      currentPage: 1,
      articletData: []
    }
  },
  mounted() {
    this.getList({
      currentPage: 1,
      pageSize: 10
    })
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({
        name: '发表文章',
        query: {
          articleId: row.id
        }
      })
    },
    handleDelete(index, row) {
      fetchDelArticle({
        id: row.id
      })
        .then(response => {
          if(response) {
            this.$message({
              type: 'success',
              message: response.message
            })
          }
          this.getList({
            currentPage: this.currentPage,
            pageSize: 10
          })
        })
        .catch(err => {
          this.$throw(err)
        })
    },
    currentChange(page) {
      // console.log(page);
      this.currentPage = page
      this.getList({
        currentPage: page,
        pageSize: 10
      })
    },
    getList(postdata) {
      fetchArticleList(postdata)
        .then(response => {
          //console.log(response)
          for (let i = 0; i < response.data.rows.length; i++) {
            response.data.rows[i].created_at = this.$getDateDiff(response.data.rows[i].created_at)
            if (response.data.rows[i].title.length > 22) {
              response.data.rows[i].title = response.data.rows[i].title.substring(0, 20) + '...'
            }
          }
          this.total = response.data.count
          this.articletData = response.data.rows
        })
        .catch(err => {
          this.$throw(err)
        })
    }
  }
}
</script>

<style scoped>
.articleList {
    margin-top: 10px;
}
.pagination {
    margin: 30px auto;
    text-align: center;
    width: 50%;
    border: 1px solid rgb(64, 158, 255);
}
</style>
