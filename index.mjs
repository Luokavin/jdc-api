import http from 'http';
import https from 'https';

export default class JdcApi {
  _useHttps = false;
  _host = undefined;
  _port = 80;
  _password = undefined;
  _loginTimeout = 600;
  _connected = false;
  _session = undefined;
  _lastRequestTime = undefined;

  constructor(host, password, options = null) {
    this._host = host;
    this._password = password;

    if (options !== null) {
      if (options.port !== null && options.port !== undefined) {
        if (typeof options.port !== 'number') {
          throw new Error(`options.port expecting a integer, the input is ${ options.port }`);
        }

        if (options.port % 1 !== 0) {
          throw new Error(`options.port expecting a integer, the input is ${ options.port }`);
        }

        if (0 > options.port || options.port > 65535) {
          throw new Error(`options.port exceeds the port range, the input is ${ options.port }`);
        }

        this._port = options.port;
      }
    }
  }

  _request(params) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        'jsonrpc': '2.0',
        'id': 1,
        'method': 'call',
        params
      });

      const options = {
        hostname: this._host,
        port: this._port,
        path: '/jdcapi',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const Request = this._useHttps ? https : http;
      const request = Request.request(options, response => {
        const { statusCode } = response;

        if (statusCode !== 200) {
          response.resume();
          reject(statusCode);
        }

        response.setEncoding('utf8');

        let rawData = '';

        response.on('data', chunk => rawData += chunk);
        response.on('end', () => {
          try {
            resolve(JSON.parse(rawData));
          } catch (e) {
            reject(e);
          }
        });
      });

      request.on('error', reject);
      request.write(data);
      request.end();
    });
  }

  async _requestApi(keys) {
    await this._verificationConnected();

    const response = await this._request([this._session, ...keys]);

    this._verificationResponse(response, keys.join('-'));

    return response.result[1];
  }

  async _verificationConnected() {
    if (!this._connected) {
      throw new Error('not connected, need to call instance.connect() first');
    }

    if (this._lastRequestTime + this._loginTimeout * 1000 <= new Date().getTime()) {
      await this.connect();
    }
  }

  _verificationResponse(response, errorPrefix) {
    if (
      !response ||
      !Array.isArray(response.result) ||
      !response.result.length ||
      response.result[0] !== 0
    ) {
      throw new Error(`${ errorPrefix }, the response is ${ JSON.stringify(response) }`);
    }
  }

  async connect() {
    const response = await this._request([
      '00000000000000000000000000000000',
      'session',
      'login',
      {
        'username': 'root',
        'password': this._password,
        'timeout': this._loginTimeout
      }
    ]);

    this._verificationResponse(response, 'connection failed');
    this._connected = true;
    this._session = response.result[1].ubus_rpc_session;
    this._lastRequestTime = new Date().getTime();
  }

  getRouterInfo() {
    return this._requestApi(['jdcapi.static', 'web_get_router_info', {}]);
  }

  getWanInfo() {
    return this._requestApi(['jdcapi.static', 'get_wan_info', {}]);
  }

  getWan6Info() {
    return this._requestApi(['jdcapi.static', 'get_wan6_info', {}]);
  }

  getWan6Config() {
    return this._requestApi(['jdcapi.static', 'web_get_ipv6_config', {}]);
  }

  getMacAddrByMacClone() {
    return this._requestApi(['jdcapi.static', 'mac_clone_get_macaddr', {}]);
  }

  getWanConnectionStatus() {
    return this._requestApi(['jdcapi.static', 'get_wan_connection_status', {}]);
  }

  getOnlineDeviceCount() {
    return this._requestApi(['jdcapi.static', 'web_get_online_device_count', {}]);
  }

  getIpv6Config() {
    return this._requestApi(['jdcapi.static', 'web_get_ipv6_config', {}]);
  }

  getNetworkFlow() {
    return this._requestApi(['jdcapi.static', 'web_get_network_flow', {}]);
  }

  get24gWifiInfo() {
    return this._requestApi(['jdcapi.static', 'get_wifi_info', { type: 0 }]);
  }

  get5gWifiInfo() {
    return this._requestApi(['jdcapi.static', 'get_wifi_info', { type: 2 }]);
  }

  getGuestWifiInfo() {
    return this._requestApi(['jdcapi.static', 'get_wifi_info', { type: 1 }]);
  }

  getWifi6Status() {
    return this._requestApi(['jdcapi.static', 'web_get_wifi6_80211ax', {}]);
  }

  getWdsConfig() {
    return this._requestApi(['jdcapi.static', 'web_get_wds_config', {}]);
  }

  getWirelessMeshStatus() {
    return this._requestApi(['jdcapi.static', 'web_get_wireless_mesh_enable', {}]);
  }

  getDualFrequencyOptimizationStatus() {
    return this._requestApi(['jdcapi.static', 'web_get_dual_frequency_optimization', {}]);
  }

  getDeviceList() {
    return this._requestApi(['jdcapi.static', 'web_get_device_list', {}]);
  }

  getMacFilterInfo() {
    return this._requestApi(['jdcapi.static', 'get_macfilter_info', {}]);
  }

  getLanIp() {
    return this._requestApi(['jdcapi.static', 'get_lan_ip', {}]);
  }

  getDhcpStaticIp() {
    return this._requestApi(['jdcapi.static', 'web_get_dhcp_static_ip', {}]);
  }

  getPortForward() {
    return this._requestApi(['jdcapi.static', 'get_port_forward', {}]);
  }

  getDmz() {
    return this._requestApi(['jdcapi.static', 'get_dmz', {}]);
  }

  getUpnp() {
    return this._requestApi(['jdcapi.static', 'get_upnp', {}]);
  }

  getNatType() {
    return this._requestApi(['jdcapi.static', 'get_nat_type', {}]);
  }

  getCustomHosts() {
    return this._requestApi(['jdcapi.static', 'web_get_custom_hosts', {}]);
  }

  getAllExterStorage() {
    return this._requestApi(['jdcapi.static', 'web_storage_exter_get_all', {}]);
  }

  getStorageModeInter() {
    return this._requestApi(['jdcapi.static', 'web_storage_inter_get_mode', {}]);
  }

  sdCardToolsCheck() {
    return this._requestApi(['SDCardTools', 'check', {}]);
  }

  getUpgradeVersion() {
    return this._requestApi(['jdcapi.static', 'web_get_upgrade_version', {}]);
  }
}
