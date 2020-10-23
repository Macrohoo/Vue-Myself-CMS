import roleUrls from '@/api/urls/role'
import request from '@/utils/request'

//获取权限列表
export function fetchGetRoleList(){
    return request({
        url: roleUrls.getRoleList,
        method: 'get',
        params: {}
    })
}

