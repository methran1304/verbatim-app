export class LoadingDelayUtil {
  /**
   * Ensures a minimum loading time for better UX
   * @param promise The promise to wait for
   * @param minimumTimeMs Minimum time in milliseconds (default: 1000ms)
   * @returns Promise that resolves after the original promise + minimum time
   */
  static async withMinimumDelay<T>(
    promise: Promise<T>, 
    minimumTimeMs: number = 1000
  ): Promise<T> {
    const startTime = Date.now();
    
    try {
      const result = await promise;
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumTimeMs - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      return result;
    } catch (error) {
      // If there's an error, still ensure minimum delay for consistency
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumTimeMs - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      throw error;
    }
  }

  /**
   * Creates a loading state manager for observables
   * @param observable The observable to subscribe to
   * @param loadingSetter Function to set loading state
   * @param minimumTimeMs Minimum time in milliseconds (default: 1000ms)
   * @returns Observable that ensures minimum loading time
   */
  static withLoadingState<T>(
    observable: any,
    loadingSetter: (loading: boolean) => void,
    minimumTimeMs: number = 1000
  ): any {
    const startTime = Date.now();
    loadingSetter(true);

    return new Promise<T>((resolve, reject) => {
      observable.subscribe({
        next: (result: T) => {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minimumTimeMs - elapsedTime);
          
          setTimeout(() => {
            loadingSetter(false);
            resolve(result);
          }, remainingTime);
        },
        error: (error: any) => {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minimumTimeMs - elapsedTime);
          
          setTimeout(() => {
            loadingSetter(false);
            reject(error);
          }, remainingTime);
        }
      });
    });
  }
} 