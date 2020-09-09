SELECT    Id AS id
        , ClassName AS className
        , AppName AS appName
        , ClassStartTime AS classStartTime
        , TestRun_id AS testRunId
        , Description as description
FROM TestClassExecution 
WHERE 
          TestRun_id=@testRunId 
          