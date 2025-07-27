# AFK Protection System for Non-Timed Drills

## Overview

The AFK (Away From Keyboard) protection system prevents users from submitting drills with garbage real-time data that could occur when users go AFK during non-timed drills (marathon, classics, adaptive, etc.). This system protects against data pollution and performance issues.

## Problem Statement

Without AFK protection, users could:
- Start a non-timed drill
- Go AFK for extended periods (hours/days)
- Return and complete the drill
- Submit results with massive real-time data arrays containing garbage data

**Example**: A user locks their machine mid-drill and completes it after 48 hours, resulting in 172,800 data points (one per second) of garbage data.

## Solution Components

### 1. Client-Side Protection (Angular)

#### Activity Tracking
- **Global Activity Monitoring**: Tracks keyboard, mouse, and touch events
- **Inactivity Detection**: Detects when user has been inactive for 5 minutes
- **Real-time Data Pausing**: Stops collecting data points during inactivity periods

#### Key Features
```typescript
// Constants
private readonly MAX_INACTIVITY_SECONDS = 300; // 5 minutes
private readonly MAX_DRILL_DURATION_SECONDS = 7200; // 2 hours
private readonly INACTIVITY_CHECK_INTERVAL = 10000; // 10 seconds

// Activity tracking
private lastActivityTime: number = 0;
private isUserInactive: boolean = false;
```

#### Activity Detection Methods
- `updateUserActivity()`: Called on every keystroke and global activity
- `startInactivityMonitoring()`: Monitors inactivity every 10 seconds
- `stopInactivityMonitoring()`: Cleans up monitoring when drill ends

#### Data Collection Control
```typescript
// Only add data points if user is active or within reasonable inactivity period
if (!this.isUserInactive || elapsedSeconds <= this.MAX_INACTIVITY_SECONDS) {
    this.addTimeSeriesDataPoint(elapsedSeconds);
}
```

### 2. Client-Side Validation

#### Pre-Submission Checks
- **Duration Validation**: Ensures drill duration doesn't exceed 2 hours
- **Data Array Size**: Prevents submission of excessively large real-time data arrays
- **Typing Activity Analysis**: Detects suspiciously low typing activity

```typescript
private validateDrillSubmission(): boolean {
    // Check drill duration
    if (drillDuration > this.MAX_DRILL_DURATION_SECONDS) {
        return false;
    }

    // Check real-time data array size
    if (this.drillStatistic.realTimeData.length > this.MAX_DRILL_DURATION_SECONDS) {
        return false;
    }

    // Check typing activity for non-timed drills
    if (this.drillPreferences.drillType !== DrillType.Timed) {
        const charsPerSecond = totalTypedChars / drillDuration;
        if (charsPerSecond < 0.1 && drillDuration > 60) {
            return false;
        }
    }

    return true;
}
```

### 3. Server-Side Validation (C#)

#### Comprehensive Validation
- **Duration Limits**: Maximum 2-hour drill duration
- **Data Array Size**: Maximum 7,200 data points (2 hours worth)
- **Activity Patterns**: Detects suspicious inactivity patterns
- **Data Gap Analysis**: Identifies large gaps in real-time data

```csharp
private ValidationResult ValidateDrillSubmission(DrillSubmissionRequestDTO submission)
{
    const int MAX_DRILL_DURATION_SECONDS = 7200; // 2 hours
    const int MAX_REALTIME_DATA_POINTS = 7200; // 2 hours worth of data points
    const double MIN_CHARS_PER_SECOND = 0.1; // Minimum characters per second

    // Duration check
    if (submission.DrillStatistic.Duration > MAX_DRILL_DURATION_SECONDS)
    {
        return new ValidationResult { IsValid = false, ErrorMessage = "Drill duration exceeds maximum allowed time." };
    }

    // Data array size check
    if (submission.DrillStatistic.RealTimeData?.Count > MAX_REALTIME_DATA_POINTS)
    {
        return new ValidationResult { IsValid = false, ErrorMessage = "Real-time data array is too large." };
    }

    // Activity pattern analysis for non-timed drills
    if (submission.DrillType != DrillType.Timed)
    {
        var charsPerSecond = totalTypedChars / submission.DrillStatistic.Duration;
        if (charsPerSecond < MIN_CHARS_PER_SECOND && submission.DrillStatistic.Duration > 60)
        {
            return new ValidationResult { IsValid = false, ErrorMessage = "Very low typing activity detected." };
        }

        // Check for suspicious gaps in real-time data
        var maxGap = CalculateMaxGap(submission.DrillStatistic.RealTimeData);
        if (maxGap > 600) // 10 minutes
        {
            return new ValidationResult { IsValid = false, ErrorMessage = "Suspicious inactivity periods detected." };
        }
    }

    return new ValidationResult { IsValid = true };
}
```

## Protection Levels

### Level 1: Real-time Prevention
- **Activity Monitoring**: Tracks user activity continuously
- **Data Pausing**: Stops data collection during inactivity
- **User Notifications**: Warns users about inactivity

### Level 2: Client-Side Validation
- **Pre-submission Checks**: Validates data before sending to server
- **Duration Limits**: Enforces maximum drill duration
- **Activity Analysis**: Detects suspicious patterns

### Level 3: Server-Side Validation
- **Final Validation**: Comprehensive server-side checks
- **Data Integrity**: Ensures data quality and consistency
- **Rejection Handling**: Returns clear error messages for invalid submissions

## Configuration

### Client-Side Constants
```typescript
MAX_INACTIVITY_SECONDS = 300;        // 5 minutes
MAX_DRILL_DURATION_SECONDS = 7200;   // 2 hours
INACTIVITY_CHECK_INTERVAL = 10000;   // 10 seconds
```

### Server-Side Constants
```csharp
MAX_DRILL_DURATION_SECONDS = 7200;   // 2 hours
MAX_REALTIME_DATA_POINTS = 7200;     // 2 hours worth of data
MIN_CHARS_PER_SECOND = 0.1;          // Minimum typing activity
MAX_DATA_GAP_SECONDS = 600;          // 10 minutes
```

## User Experience

### Inactivity Detection
1. **Warning Notification**: User receives warning after 5 minutes of inactivity
2. **Data Pausing**: Real-time data collection pauses during inactivity
3. **Resume Capability**: Data collection resumes when user becomes active again

### Validation Failures
1. **Clear Error Messages**: Users receive specific error messages
2. **Graceful Handling**: Failed submissions don't crash the application
3. **Retry Guidance**: Users are guided to restart the drill

## Benefits

### Performance Protection
- **Memory Usage**: Prevents excessive memory consumption from large data arrays
- **Database Storage**: Reduces storage requirements for garbage data
- **Network Bandwidth**: Minimizes unnecessary data transmission

### Data Quality
- **Accurate Analytics**: Ensures real-time data reflects actual user activity
- **Reliable Statistics**: Prevents skewed performance metrics
- **Clean Datasets**: Maintains data integrity for analysis

### User Experience
- **Fair Play**: Prevents exploitation of the system
- **Clear Feedback**: Users understand why submissions are rejected
- **Graceful Degradation**: System continues to work even with validation failures

## Monitoring and Maintenance

### Metrics to Track
- **Validation Failure Rate**: Monitor how often submissions are rejected
- **Inactivity Detection**: Track frequency of inactivity events
- **Data Array Sizes**: Monitor real-time data array sizes

### Future Enhancements
- **Adaptive Thresholds**: Adjust limits based on user behavior patterns
- **Machine Learning**: Use ML to detect more sophisticated AFK patterns
- **User Preferences**: Allow users to configure inactivity thresholds

## Testing Scenarios

### Valid Scenarios
- Normal typing activity during drill
- Brief pauses (under 5 minutes)
- Reasonable drill durations (under 2 hours)

### Invalid Scenarios
- Extended inactivity (over 5 minutes)
- Excessive drill duration (over 2 hours)
- Very low typing activity
- Large gaps in real-time data

## Conclusion

The AFK protection system provides comprehensive protection against garbage data collection while maintaining a good user experience. It operates at multiple levels to ensure data quality and system performance. 