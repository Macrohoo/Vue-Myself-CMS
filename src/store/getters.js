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
  addRouters: state => state.routerpermission.addRouters
}
export default getters
