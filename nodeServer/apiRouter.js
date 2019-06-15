const apiAction = require('./apiAction')

const apiRouter = [{
	pathname: '/api/image/insert',
	action: apiAction.imageInfo.insert
},{
	pathname: '/api/image/delete',
	action: apiAction.imageInfo.delete
},{
	pathname: '/api/image/detail',
	action: apiAction.imageInfo.detail
},{
	pathname: '/api/image/getPageList',
	action: apiAction.imageInfo.getPageList
},{
	pathname: '/api/interface/insert',
	action: apiAction.interfaceInfo.insert
},{
	pathname: '/api/interface/update',
	action: apiAction.interfaceInfo.update
},{
	pathname: '/api/interface/delete',
	action: apiAction.interfaceInfo.delete
},{
	pathname: '/api/interface/detail',
	action: apiAction.interfaceInfo.detail
},{
	pathname: '/api/interface/getPageList',
	action: apiAction.interfaceInfo.getPageList
},{
	pathname: '/api/login/phoneCode',
	action: apiAction.loginInfo.phoneCode
},{
	pathname: '/api/login/phonePassword',
	action: apiAction.loginInfo.phonePassword
},{
	pathname: '/api/phone/sendPhoneCode',
	action: apiAction.phoneInfo.sendPhoneCode
},{
	pathname: '/api/user/detail',
	action: apiAction.userInfo.detail
},{
	pathname: '/api/weipage/insert',
	action: apiAction.weipageInfo.insert
},{
	pathname: '/api/weipage/update',
	action: apiAction.weipageInfo.update
},{
	pathname: '/api/weipage/delete',
	action: apiAction.weipageInfo.delete
},{
	pathname: '/api/weipage/detail',
	action: apiAction.weipageInfo.detail
},{
	pathname: '/api/weipage/getPageList',
	action: apiAction.weipageInfo.getPageList
}]

module.exports = apiRouter