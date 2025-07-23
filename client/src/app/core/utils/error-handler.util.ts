export interface ApiError {
  status: number;
  message?: string;
  error?: any;
}

export class ErrorHandlerUtil {
  /**
   * get user-friendly error message based on HTTP status code
   */
  static getErrorMessage(error: ApiError, context: 'auth' | 'drill' | 'profile' | 'general' = 'general'): string {
    const status = error.status;
    
    switch (status) {
      case 400:
        return context === 'auth' ? 'Invalid data. Please check your information.' : 'Invalid request. Please try again.';
      case 401:
        return context === 'auth' ? 'Invalid email or password.' : 'Please log in to continue.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return 'Please try again later.';
    }
  }

  /**
   * check if error is a network error
   */
  static isNetworkError(error: any): boolean {
    return !error.status || error.status === 0;
  }

  /**
   * get network error message
   */
  static getNetworkErrorMessage(): string {
    return 'Network error. Please check your connection and try again.';
  }

  /**
   * handle error with proper logging and user-friendly message
   */
  static handleError(error: ApiError, context: 'auth' | 'drill' | 'profile' | 'general' = 'general'): string {
    // Log error for debugging
    console.error(`API Error [${context}]:`, error);

    // Handle network errors
    if (this.isNetworkError(error)) {
      return this.getNetworkErrorMessage();
    }

    // Prioritize server error message if available
    if (error.error && typeof error.error === 'string' && error.error.trim() !== '') {
      return error.error;
    }

    // Fall back to generic status-based message
    return this.getErrorMessage(error, context);
  }
} 