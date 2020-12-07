<template>
  <div class="commentList">
    <el-table :data="commentData" style="width: 100%" max-height="550">
      <el-table-column fixed prop="createdAt" label="评论时间" width="200">
      </el-table-column>
      <el-table-column prop="article_title" label="所属文章"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column prop="author_name" label="评论人" width="150">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      hide-on-single-page
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
      @prev-click="currentChange"
      @next-click="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { fetchCommentList, fetchDelComment } from "@/api/apis/article";

export default {
  name: "commentList",
  data() {
    return {
      total: 0,
      currentPage: 1,
      commentData: []
    };
  },
  methods: {
    handleDelete(index, row) {
      fetchDelComment({
        id: row.id
      }).then(response => {
          this.$message({
            message: response.message,
            type: "success"
          });
          this.getList({
            currentPage: this.currentPage,
            pageSize: 10
          });
        })
        .catch(err => {
          this.$throw(err)
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    currentChange(page) {
      this.currentPage = page;
      this.getList({
        currentPage: page,
        pageSize: 10
      });
    },
    getList(postdata) {
      fetchCommentList(postdata)
        .then(response => {
          for (let i = 0; i < response.rows.length; i++) {
            response.rows[i].createdAt = this.$getDateDiff(
              response.rows[i].created_at
            );
            if (response.rows[i].content.length > 20) {
              response.rows[i].content =
                response.rows[i].content.substring(0, 22) + "...";
            } else if (response.rows[i].article_title.length > 20) {
              response.rows[i].article_title =
                response.rows[i].article_title.substring(0, 22) + "...";
            }
          }
          this.total = response.count;
          this.commentData = response.rows;
        })
        .catch(err => {
          this.$throw(err)
          this.$message({
            message: "评论列表获取失败!",
            type: "error"
          });
        });
    }
  },
  mounted() {
    this.getList({
      currentPage: 1,
      pageSize: 10
    });
  }
};
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
