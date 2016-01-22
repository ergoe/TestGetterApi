SELECT    Top 10
          Id AS id
        , RunStartTime AS startTime
        , Environment AS environment
        , Area AS area
        , BuildNum AS buildNum
        , ExecutionHost as executionHost
FROM TestRun 
WHERE 
          area='commerce' AND environment LIKE '%' + @qaEnvironment + '%' AND buildNum LIKE '%' + @buildName+ '%'
ORDER BY
          id DESC
          --RunStartTime >= '2016-01-13' AND NOT(Area='community')
          