import type { Exchange } from 'ccxt';

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

export function getProxyUrl(): string | undefined {
  for (const key of PROXY_ENV_KEYS) {
    const value = process.env[key];
    if (value && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
}

export async function applyProxyToExchange(exchange: Exchange, proxyUrl: string | undefined = getProxyUrl()): Promise<void> {
  if (!proxyUrl) {
    return;
  }

  const scheme = proxyUrl.split('://')[0]?.toLowerCase() ?? '';

  if (scheme.startsWith('socks')) {
    exchange.socksProxy = proxyUrl;
    exchange.wsSocksProxy = proxyUrl;
  } else {
    exchange.httpsProxy = proxyUrl;
    exchange.wssProxy = proxyUrl;
  }

  await exchange.loadProxyModules();
}
