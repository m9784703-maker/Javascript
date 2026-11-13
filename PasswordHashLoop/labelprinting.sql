CREATE NONCLUSTERED INDEX IX_Label_Field_Label_ID_Enabled_Sequence
ON dbo.Label_Field
(
    Label_ID,
    Enabled,
    Sequence
)
INCLUDE
(
    Table_Alias,
    Field_Name
);
GO