export interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

export interface GoogleSignInConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

export interface GoogleButtonOptions {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'rounded' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: string;
  locale?: string;
}

export interface GoogleAuthWindow extends Window {
  google: {
    accounts: {
      id: {
        initialize: (config: GoogleSignInConfig) => void;
        renderButton: (element: HTMLElement, options: GoogleButtonOptions) => void;
        prompt: () => void;
        disableAutoSelect: () => void;
        storeCredential: (credential: GoogleCredentialResponse, callback: () => void) => void;
        cancel: () => void;
        revoke: (hint: string, callback: () => void) => void;
      };
    };
  };
}
