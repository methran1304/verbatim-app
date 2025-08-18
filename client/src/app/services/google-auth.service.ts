import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GoogleCredentialResponse, GoogleSignInConfig, GoogleButtonOptions, GoogleAuthWindow } from '../models/interfaces/google-auth.interface';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private readonly GOOGLE_CLIENT_ID = "1066899161193-u88nt69eemlcb9s8taeu3smd9pbi1baa.apps.googleusercontent.com";
  private googleInitInterval: any;
  private credentialSubject = new Subject<GoogleCredentialResponse>();

  constructor() {}

  /**
   * Initialize Google Sign-In
   */
  initializeGoogleSignIn(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if Google library is already loaded
      if (this.isGoogleLibraryLoaded()) {
        this.setupGoogleSignIn();
        resolve();
        return;
      }

      // Wait for Google library to be available
      this.googleInitInterval = setInterval(() => {
        if (this.isGoogleLibraryLoaded()) {
          clearInterval(this.googleInitInterval);
          this.setupGoogleSignIn();
          resolve();
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        if (this.googleInitInterval) {
          clearInterval(this.googleInitInterval);
          reject(new Error('Google Sign-In library failed to load'));
        }
      }, 10000);
    });
  }

  /**
   * Render Google Sign-In button
   */
  renderButton(elementId: string, options?: GoogleButtonOptions): boolean {
    try {
      const googleWindow = window as unknown as GoogleAuthWindow;
      const buttonDiv = document.getElementById(elementId);
      
      if (!buttonDiv) {
        console.error(`Element with id '${elementId}' not found`);
        return false;
      }

      const defaultOptions: GoogleButtonOptions = {
        theme: "outline",
        size: "large",
        ...options
      };

      googleWindow.google.accounts.id.renderButton(buttonDiv, defaultOptions);
      return true;
    } catch (error) {
      console.error('Error rendering Google Sign-In button:', error);
      return false;
    }
  }

  /**
   * Get observable for Google credential responses
   */
  getCredentialResponse(): Observable<GoogleCredentialResponse> {
    return this.credentialSubject.asObservable();
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.googleInitInterval) {
      clearInterval(this.googleInitInterval);
    }
  }

  private isGoogleLibraryLoaded(): boolean {
    const googleWindow = window as unknown as GoogleAuthWindow;
    return !!(googleWindow.google?.accounts?.id);
  }

  private setupGoogleSignIn(): void {
    try {
      const googleWindow = window as unknown as GoogleAuthWindow;
      
      const config: GoogleSignInConfig = {
        client_id: this.GOOGLE_CLIENT_ID,
        callback: (response: GoogleCredentialResponse) => {
          this.credentialSubject.next(response);
        }
      };
      
      googleWindow.google.accounts.id.initialize(config);
    } catch (error) {
      console.error('Error setting up Google Sign-In:', error);
      throw error;
    }
  }
}
