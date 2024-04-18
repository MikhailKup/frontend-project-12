export default {
  translation: {
    languages: {
      en: 'eng',
      ru: 'рус',
    },
    loginPage: {
      username: 'Username',
      password: 'Password',
      logIn: 'Log in',
      invalidFeedback: 'Incorrect username or password',
    },
    mainPage: {
      logOut: 'Log out',
      messages: {
        counter: {
          count_one: '{{count}} message',
          count_other: '{{count}} messages',
        },
        input: 'Write a message...',
      },
      channels: 'Channels',
      channelControl: 'Channel control',
      modals: {
        channelName: 'Channel name',
        addChannel: 'Add channel',
        removeChannel: 'Remove channel',
        renameChannel: 'Edit channel',
        cancel: 'Cancel',
        send: 'Send',
        ensuring: 'Are you sure?',
        remove: 'Remove',
        edit: 'Edit',
        notUnique: 'Must be unique',
      },
    },
    signUpPage: {
      signingUp: 'Create new account',
      toSignUp: 'Sign up',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm the password',
    },
    validationFeedback: {
      invalidLength: 'From 3 to 20 symbols',
      invalidPassword: 'At least 6 characters',
      mustMatch: 'Passwords must match',
      userExists: 'This user already exists',
      required: 'Required field',
    },
    toast: {
      channelCreated: 'Channel created!',
      channelRenamed: 'Channel renamed!',
      channelRemoved: 'Channel removed!',
      connectionError: 'Connection error',
    },
    unknownError: 'Something went wrong...',
    errorPage: {
      failure: 'Failure',
      pageNotFound: 'Page not found',
      toTheMainPage: 'To the main page',
    },
  },
};
