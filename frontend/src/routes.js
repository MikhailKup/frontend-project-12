const baseApiPath = '/api/v1';

export default {
  apiPaths: {
    loginPath: () => [baseApiPath, 'login'].join('/'),
    signupPath: () => [baseApiPath, 'signup'].join('/'),
    channelsPath: () => [baseApiPath, 'channels'].join('/'),
    channelPath: (channelId) => [baseApiPath, 'channels', channelId].join('/'),
    messagesPath: () => [baseApiPath, 'messages'].join('/'),
    messagePath: (messageId) => [baseApiPath, 'messages', messageId].join('/'),
  },
  pagesPaths: {
    mainPage: () => '/',
    loginPage: () => '/login',
    signupPage: () => '/signup',
  },
};
