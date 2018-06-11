import urljoin from 'url-join';

import http, {utils} from '../../utils/http';
import {HttpClient} from '../../utils/types';

export const aws = (configuration, httpClient: HttpClient) => {
  const {get, post, delete_} = httpClient;

  const typeFn = type => {
    const resourceDetails = id => {
      const regions = regionName => {
        return {
          add: region => {
            const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'regions', regionName);
            return post(configuration, url, region);
          },
          delete: () => {
            const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'regions', regionName);
            return delete_(configuration, url);
          },
          details: () => {
            const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'regions', regionName);
            return get(configuration, url);
          }
        };
      };

      regions.list = (limit, offset) => {
        const baseUrl = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'regions');
        const url = utils.buildUrlParams(baseUrl, {limit, offset});
        return get(configuration, url);
      };

      return {
        status: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id, 'status');
          return get(configuration, url);
        },
        details: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id);
          return get(configuration, url);
        },
        delete: () => {
          const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type, id);
          return delete_(configuration, url);
        },
        regions
      };
    };

    const create = infrastructure => {
      const url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
      return post(configuration, url, infrastructure);
    };

    const list = (limit, offset, sort, filter) => {
      let url = urljoin(configuration.apiBaseUrl, 'encoding/infrastructure', type);
      url = utils.buildUrlParams(url, {limit, offset, sort, filter});
      return get(configuration, url);
    };

    const resource = Object.assign(resourceDetails, {create, list});
    return resource;
  };

  return typeFn('aws');
};

export default configuration => {
  return aws(configuration, http);
};
