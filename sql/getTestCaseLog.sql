SELECT   TestCaseLog.Id as logId
        , EntryTime AS entryTime
        , Level AS logLevel
        , LogMessage AS logMessage
        , StackTrace AS stackTrace
        , ScreenShotLink AS screenShotLink
        , HtmlSourceLink AS htmlSourceLink
        , TestCaseExecution_id as testCaseExecutionId
        , TestRun.Environment as environment
FROM TestCaseLog
INNER JOIN TestCaseExecution ON  TestCaseExecution.Id = TestCaseLog.TestCaseExecution_id
INNER JOIN TestClassExecution ON TestClassExecution.Id = TestCaseExecution.TestClassExecution_id
INNER JOIN TestRun ON TestRun.Id = TestClassExecution.TestRun_id

WHERE     TestCaseExecution_id = @testId
ORDER BY logId DESC