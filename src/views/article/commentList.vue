<template>
  <div class="commentList">
    <el-table :data="commentData">
      <el-table-column fixed prop="createdAt" label="评论时间" width="200" />
      <el-table-column prop="article_title" label="所属文章" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="author_name" label="评论人" width="150" />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
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
import { fetchCommentList, fetchDelComment } from '@/api/apis/article'

export default {
  name: 'CommentList',
  data() {
    return {
      total: 0,
      currentPage: 1,
      commentData: []
    }
  },
  mounted() {
    this.getList({
      currentPage: 1,
      pageSize: 10
    })
  },
  methods: {
    handleDelete(index, row) {
      fetchDelComment({
        id: row.id
      }).then(response => {
        if (response) {
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
      this.currentPage = page
      this.getList({
        currentPage: page,
        pageSize: 10
      })
    },
    getList(postdata) {
      fetchCommentList(postdata)
        .then(response => {
          for (let i = 0; i < response.data.rows.length; i++) {
            response.data.rows[i].createdAt = this.$yian.utils.getDateDiff(
              response.data.rows[i].created_at
            )
            if (response.data.rows[i].content.length > 20) {
              response.data.rows[i].content =
                response.data.rows[i].content.substring(0, 22) + '...'
            } else if (response.data.rows[i].article_title.length > 20) {
              response.data.rows[i].article_title =
                response.data.rows[i].article_title.substring(0, 22) + '...'
            }
          }
          this.total = response.data.count
          this.commentData = response.data.rows
        })
        .catch(err => {
          this.$throw(err)
        })
    }
  }
}
</script>

<style scoped>
.commentList {
  margin-top: 10px;
}
.pagination {
  margin: 30px auto;
  text-align: center;
  width: 50%;
  border: 1px solid rgb(64, 158, 255);
}
</style>
