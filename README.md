# jdc-api

### 简介

京东云无线宝路由器的 node api，基于 ROM 版本: JDCOS-4.0.0.r4027 制作

### 示例

```javascript
import JdcApi from 'jdc-api';

const host = 'example.com';
const password = 'password';
// config 非必填，默认端口: 80
const config = { port: 8080 };
const jdcApi = new JdcApi(host, password, config);

try {
  // 必须先调用 connect 进行密码测试及连接
  await jdcApi.connect();

  // 获取路由信息
  const getRouterInfo = await jdcApi.getRouterInfo();
  // 获取 wan 信息
  const wanInfo = await jdcApi.getWanInfo();
  // 获取 wan6 信息
  const wan6Info = await jdcApi.getWan6Info();
  // 获取 wan6 配置
  const wan6Config = await jdcApi.getWan6Config();
  // 获取当前使用的 mac 地址
  const macAddrByMacClone = await jdcApi.getMacAddrByMacClone();
  // 获取 wan 连接状态
  const wanConnectionStatus = await jdcApi.getWanConnectionStatus();
  // 获取在线设备数量
  const onlineDeviceCount = await jdcApi.getOnlineDeviceCount();
  // 获取 ipv6 配置(与 wan6Config 返回结果一致)
  const ipv6Config = await jdcApi.getIpv6Config();
  // 网络状态流量图表
  const networkFlow = await jdcApi.getNetworkFlow();
  // 获取 2.4g wifi 信息
  const wifi24gInfo = await jdcApi.get24gWifiInfo();
  // 获取 5g wifi 信息
  const wifi5gInfo = await jdcApi.get5gWifiInfo();
  // 获取访客 wifi 信息
  const guestWifiInfo = await jdcApi.getGuestWifiInfo();
  // 获取 wifi6 状态
  const wifi6Status = await jdcApi.getWifi6Status();
  // 获取 wds 配置
  const wdsConfig = await jdcApi.getWdsConfig();
  // 获取 wifi mesh 状态
  const wirelessMeshStatus = await jdcApi.getWirelessMeshStatus();
  // 获取多频合一状态
  const dualFrequencyOptimizationStatus = await jdcApi.getDualFrequencyOptimizationStatus();
  // 获取设备列表
  const deviceList = await jdcApi.getDeviceList();
  // 获取黑白名单设备信息
  const macFilterInfo = await jdcApi.getMacFilterInfo();
  // 获取 lan ip
  const lanIp = await jdcApi.getLanIp();
  // 获取 dhcp 静态 ip
  const dhcpStaticIp = await jdcApi.getDhcpStaticIp();
  // 获取端口转发
  const portForward = await jdcApi.getPortForward();
  // 获取 dmz
  const dmz = await jdcApi.getDmz();
  // 获取 upnp
  const upnp = await jdcApi.getUpnp();
  // 获取 nat 设置
  const natType = await jdcApi.getNatType();
  // 获取自定义 hosts
  const customHosts = await jdcApi.getCustomHosts();
  // 获取所有外部存储
  const allExterStorage = await jdcApi.getAllExterStorage();
  // 获取存储状态
  const storageModeInter = await jdcApi.getStorageModeInter();
  // sd 卡确认工具
  const sdCardToolsCheck = await jdcApi.sdCardToolsCheck();
  // 检查系统更新
  const upgradeVersion = await jdcApi.getUpgradeVersion();

  console.log('getRouterInfo', getRouterInfo);
  console.log('wanInfo', wanInfo);
  console.log('wan6Info', wan6Info);
  console.log('wan6Config', wan6Config);
  console.log('macAddrByMacClone', macAddrByMacClone);
  console.log('wanConnectionStatus', wanConnectionStatus);
  console.log('onlineDeviceCount', onlineDeviceCount);
  console.log('ipv6Config', ipv6Config);
  console.log('networkFlow', networkFlow);
  console.log('wifi24gInfo', wifi24gInfo);
  console.log('wifi5gInfo', wifi5gInfo);
  console.log('guestWifiInfo', guestWifiInfo);
  console.log('wifi6Status', wifi6Status);
  console.log('wdsConfig', wdsConfig);
  console.log('wirelessMeshStatus', wirelessMeshStatus);
  console.log('dualFrequencyOptimizationStatus', dualFrequencyOptimizationStatus);
  console.log('deviceList', deviceList);
  console.log('macFilterInfo', macFilterInfo);
  console.log('lanIp', lanIp);
  console.log('dhcpStaticIp', dhcpStaticIp);
  console.log('portForward', portForward);
  console.log('dmz', dmz);
  console.log('upnp', upnp);
  console.log('natType', natType);
  console.log('customHosts', customHosts);
  console.log('allExterStorage', allExterStorage);
  console.log('storageModeInter', storageModeInter);
  console.log('sdCardToolsCheck', sdCardToolsCheck);
  console.log('upgradeVersion', upgradeVersion);
} catch (e) {
  console.log(e);
}

```

### 声明

本软件包仅供学习交流，如作他用所承受的法律责任一概与作者无关（下载使用即代表你同意上述观点）
