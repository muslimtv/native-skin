//
// Copyright (c) 2016 Ooyala, Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol OOPerformanceEventMatcherProtocol <NSObject>
@property (nonatomic, readonly) NSString *notificationName; /**< required so we can register for the specific notification. */
@property (nonatomic, readonly) NSString *reportName; /**< required so we can pretty print stats. */
-(BOOL) matches:(NSNotification*)notification;
@end
