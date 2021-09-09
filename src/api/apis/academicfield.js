import request from '@/utils/request'
import academicFieldUrls from '../urls/academicfield'

// 添加学术领域
export function fetchAddAcademicField(data) {
  return request({
    url: academicFieldUrls.addAcademicField,
    method: 'post',
    data
  })
}

// 查询学术领域
export function fetchGetAcademicField(query) {
  return request({
    url: academicFieldUrls.getAcademicField,
    method: 'get',
    params: query
  })
}
