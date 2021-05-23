import request from '@/utils/request';
import articleLabelUrls from '../urls/articlelabel';

// 添加学术领域
export function fetchAddArticleLabel(data) {
  return request({
    url: articleLabelUrls.addArticleLabel,
    method: 'post',
    data,
  });
}

// 查询学术领域
export function fetchGetArticleLabel(query) {
  return request({
    url: articleLabelUrls.getArticleLabel,
    method: 'get',
    params: query,
  });
}
