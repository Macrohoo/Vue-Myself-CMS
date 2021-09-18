const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  uid: state => state.user.uid,
  role: state => state.user.role,
  authorityRouter: state => state.user.authorityRouter,
  permissionButton: state => state.user.permissionButton,
  addRouters: state => state.routerpermission.addRouters,
  routers: state => state.routerpermission.routers,
  roleTree: state => state.routerpermission.roleTree,
  errorLogs: state => state.errorLog.logs,
  groups: state => state.gallery.groups,
  materials: state => state.gallery.materials,
  cascaderGroups: state => state.gallery.cascaderGroups,
  containGroups: state => state.gallery.containGroups,
  containMaterials: state => state.gallery.containMaterials,
  containPagesCount: state => state.gallery.containPagesCount
}
export default getters
