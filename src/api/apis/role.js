import roleUrls from '@/api/urls/role'
import request from '@/utils/request'

//获取权限列表
export function fetchGetRoleList() {
    return request({
        url: roleUrls.getRoleList,
        method: 'get',
    })
}

//增加角色
export function fetchAddRole(data) {
    return request({
        url: roleUrls.addRole,
        method: 'post',
        data
    })
}

//删除角色
export function fetchDelRole(data) {
    return request({
        url: roleUrls.delRole,
        method: 'post',
        data
    })
}

//分配角色权限
export function fetchRolePermissions(data) {
    return request({
        url: roleUrls.rolePermissions,
        method: 'post',
        data
    })
}

//查询角色的所有权限
export function fetchSearchRolePermissions(data) {
    return request({
        url: roleUrls.searchRolePermissions,
        method: 'post',
        data
    })
}