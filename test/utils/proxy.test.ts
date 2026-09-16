import assert from 'assert';
import { getProxyUrl, applyProxyToExchange } from '../../src/utils/proxy';

const PROXY_ENV_KEYS = [
  'BOT_HTTPS_PROXY',
  'BOT_HTTP_PROXY',
  'BOT_ALL_PROXY',
  'BOT_SOCKS_PROXY',
  'HTTPS_PROXY',
  'https_proxy',
  'HTTP_PROXY',
  'http_proxy',
  'ALL_PROXY',
  'all_proxy'
];

function clearProxyEnv(): void {
  for (const key of PROXY_ENV_KEYS) {
    delete process.env[key];
  }
}

function createFakeExchange(): any {
  return { loadProxyModules: async () => {} };
}

describe('#proxy', () => {
  beforeEach(clearProxyEnv);
  after(clearProxyEnv);

  it('returns undefined when no proxy env is set', () => {
    assert.equal(getProxyUrl(), undefined);
  });

  it('prefers BOT_HTTPS_PROXY over generic env vars', () => {
    process.env.HTTPS_PROXY = 'http://generic:8080';
    process.env.BOT_HTTPS_PROXY = 'http://bot:8888';
    assert.equal(getProxyUrl(), 'http://bot:8888');
  });

  it('trims whitespace and ignores empty values', () => {
    process.env.BOT_HTTPS_PROXY = '   ';
    process.env.HTTPS_PROXY = '  http://proxy:3128  ';
    assert.equal(getProxyUrl(), 'http://proxy:3128');
  });

  it('maps http/https proxy to httpsProxy and wssProxy', async () => {
    const exchange = createFakeExchange();
    await applyProxyToExchange(exchange, 'http://127.0.0.1:8888');
    assert.equal(exchange.httpsProxy, 'http://127.0.0.1:8888');
    assert.equal(exchange.wssProxy, 'http://127.0.0.1:8888');
    assert.equal(exchange.socksProxy, undefined);
  });

  it('maps socks proxy to socksProxy and wsSocksProxy', async () => {
    const exchange = createFakeExchange();
    await applyProxyToExchange(exchange, 'socks5://127.0.0.1:1080');
    assert.equal(exchange.socksProxy, 'socks5://127.0.0.1:1080');
    assert.equal(exchange.wsSocksProxy, 'socks5://127.0.0.1:1080');
    assert.equal(exchange.httpsProxy, undefined);
  });

  it('does nothing when no proxy is configured', async () => {
    const exchange = createFakeExchange();
    await applyProxyToExchange(exchange, undefined);
    assert.equal(exchange.httpsProxy, undefined);
    assert.equal(exchange.socksProxy, undefined);
  });
});
