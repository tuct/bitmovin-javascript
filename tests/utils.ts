import {InternalConfiguration} from '../bitmovin/utils/types';

const settings = {
  apiKey: 'test-api-key',
  tenantOrgId: 'test-org-id'
};

const getConfiguration = (): InternalConfiguration => {
  return {
    ...settings,
    protocol: 'https',
    host: 'api.bitmovin.com',
    basePath: '/v1',
    requestTimeout: 300000,
    xApiClient: 'bitmovin-javascript',
    apiBaseUrl: 'https://api.bitmovin.com/v1/',
    httpHeaders: {
      'Content-Type': 'application/json',
      'X-Api-Key': settings.apiKey,
      'X-Tenant-Org-Id': settings.tenantOrgId,
      'X-Api-Client': 'bitmovin-javascript',
      'X-Api-Client-Version': '1.1.20'
    }
  };
};

export {getConfiguration};
