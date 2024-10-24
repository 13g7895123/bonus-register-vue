const develop = true;
const envInfo = {
    develop: {
        method: 'https',
        apiDomain: 'dev-capi.mercylife.cc',
        lineClientId: '2006270481',
    },
    official: {
        method: 'https',
        apiDomain: 'capi.mercylife.cc',
        lineClientId: '2006388875',
    }
}
const apiDomain = (develop) ? envInfo['develop']['apiDomain'] : envInfo['official']['apiDomain'];
const apiBaseUrl = `${(develop) ? envInfo['develop']['method'] : envInfo['official']['method']}://${apiDomain}`

const apiUrl = `${apiBaseUrl}/api/register`;
export const serverUrl = `${apiUrl}/server`;            // 伺服器資訊
export const stateUrl = `${apiUrl}/line/state/save`;    // 儲存Line狀態碼
const callbackUrl = `${apiUrl}/line/callback`;
export const registerUrl = `${apiUrl}/create`;          // 註冊
export const accountUrl = `${apiUrl}/member/read`;
export const passwordUrl = `${apiUrl}/forget-password/account/update`;
export const transferUrl = `${apiUrl}/transfer/token`;  // 帳號移轉的Token
export const serviceUrl = `https://lin.ee/woF2DRW`;

const domain = 'localhost:5174';
export const baseUrl = `http://${domain}`;

/* Line */
export const lineParams = {
    response_type: 'code',
    client_id: (develop) ? envInfo['develop']['lineClientId'] : envInfo['official']['lineClientId'],
    redirect_uri: callbackUrl,
    state: '',
    bot_prompt: 'aggressive',
};
export const scope = 'profile%20openid%20email';
export const lineLoginBaseUrl = 'https://access.line.me/oauth2/v2.1/authorize';

