SELECT  TOP 10 
          CaseStartTime
        , CaseResult
        , Id 
FROM TestCaseExecution
WHERE CaseName = @testName AND (CaseResult = 'PASS' OR CaseResult = 'FAILED')
ORDER BY Id DESC