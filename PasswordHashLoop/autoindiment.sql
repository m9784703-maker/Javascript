DECLARE @Results TABLE (ControlValue INT);

UPDATE WMS001.dbo.System_Control
SET Control_Value = Control_Value + 1
OUTPUT deleted.Control_Value
INTO @Results(ControlValue)
WHERE Param_ID = @Param;

SELECT @ReturnValue = ControlValue
FROM @Results;


ALTER PROCEDURE dbo._Proc_RV_SysControl
(
    @Param VARCHAR(20) = '',
    @ReturnValue INT = 0 OUTPUT,
    @FECall INT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Results TABLE (ControlValue INT);

    UPDATE WMS001.dbo.System_Control
    SET Control_Value =
        CASE
            WHEN AutoIncrement = 1
                THEN Control_Value + 1
            ELSE Control_Value
        END
    OUTPUT
        CASE
            WHEN inserted.AutoIncrement = 1
                THEN deleted.Control_Value
            ELSE inserted.Control_Value
        END
    INTO @Results(ControlValue)
    WHERE Param_ID = @Param;

    SELECT @ReturnValue = ControlValue
    FROM @Results;

    IF @FECall = 1
        SELECT 5, @ReturnValue, 0, 0;

    IF @FECall = 2
        SELECT @ReturnValue;
END
GO