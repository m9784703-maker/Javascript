DECLARE @ReturnValue INT;

SELECT @ReturnValue = NEXT VALUE FOR dbo.ReceiptNumberSeq;

SELECT @ReturnValue;


CREATE SEQUENCE dbo.ReceiptNumberSeq
AS INT
START WITH 1
INCREMENT BY 1
CACHE 100;


ALTER PROCEDURE dbo._Proc_RV_SysControl
(
    @ReturnValue INT OUTPUT,
    @FECall INT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT @ReturnValue = NEXT VALUE FOR dbo.ReceiptNumberSeq;

    IF @FECall = 1
        SELECT 5, @ReturnValue, 0, 0;

    IF @FECall = 2
        SELECT @ReturnValue;
END
GO


SELECT 
    OBJECT_NAME(m.object_id) AS CallingProcedure,
    m.definition AS ProcedureCode
FROM 
    sys.sql_modules m
INNER JOIN 
    sys.procedures p ON m.object_id = p.object_id
WHERE 
    m.definition LIKE '%_Proc_Tunnel%'
    AND p.name <> '_Proc_Tunnel'; -- Excludes the procedure from finding itself