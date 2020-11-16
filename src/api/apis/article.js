import request from "@/utils/request";
import articleUrls from "../urls/article";

//发表文章
export function fetchAddArticle(data) {
  return request({
    url: articleUrls.addArticle,
    method: "post",
    data
  });
}

//文章回显
export function fetchGetArticle(data) {
  return request({
    url: articleUrls.getArticle,
    method: "post",
    data
  });
}
