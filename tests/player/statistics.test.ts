import {statistics} from '../../bitmovin/player/statistics';
import {assertItCallsCorrectUrl, assertItReturnsUnderlyingPromise, mockGet, mockHttp, testSetup} from '../assertions';
import {getConfiguration} from '../utils';

const testConfiguration = getConfiguration();

describe('player', () => {
  const statisticsClient = statistics(testConfiguration, mockHttp);
  beforeEach(testSetup);

  describe('statistics', () => {
    describe('impressions', () => {
      describe('impressions default interval', () => {
        assertItCallsCorrectUrl(
          'GET',
          '/v1/player/statistics/impressions',
          statisticsClient.impressions.bind(this, 'asdf', '2017-01-01', '2017-01-02')
        );
        assertItReturnsUnderlyingPromise(
          mockGet,
          statisticsClient.impressions.bind(this, 'asdf', '2017-01-01', '2017-01-02')
        );
      });
      describe('impressions daily interval', () => {
        assertItCallsCorrectUrl(
          'GET',
          '/v1/player/statistics/impressions',
          statisticsClient.impressions.bind(this, 'asdf', '2017-01-01', '2017-01-02', statisticsClient.INTERVAL.DAILY)
        );
        assertItReturnsUnderlyingPromise(
          mockGet,
          statisticsClient.impressions.bind(this, 'asdf', '2017-01-01', '2017-01-02', statisticsClient.INTERVAL.DAILY)
        );
      });
    });
  });
});
