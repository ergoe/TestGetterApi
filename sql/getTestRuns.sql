SELECT  Id AS id
        , RunStartTime AS startTime
        , Environment AS environment
        , Area AS area
        , BuildNum AS buildNum
        , ExecutionHost as executionHost
FROM TestRun 
WHERE 
          area='commerce' AND environment LIKE '%' + @qaEnvironment + '%' 
          AND buildNum LIKE '%' + @buildName+ '%' 
          AND executionHost LIKE '%' + @executionHost + '%' 
          
ORDER BY
          id DESC
          --RunStartTime >= '2016-01-13' AND NOT(Area='community')
          