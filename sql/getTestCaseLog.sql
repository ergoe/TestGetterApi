SELECT  Id as logId
        , EntryTime AS entryTime
        , Level AS logLevel
        , LogMessage AS logMessage
        , StackTrace AS stackTrace
        , ScreenShotLink AS screenShotLink
        , HtmlSourceLink AS htmlSourceLink
        , TestCaseExecution_id as testCaseExecutionId
FROM TestCaseLog
WHERE     TestCaseExecution_id = @testId
ORDER BY logId DESC 