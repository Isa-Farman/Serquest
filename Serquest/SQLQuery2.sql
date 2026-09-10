-- 1. Alter the database column length
ALTER TABLE dbo.SQBusinessUnit ALTER COLUMN BusinessUnit VARCHAR(20) NOT NULL;
GO

-- 2. Update Update Stored Procedure with larger parameter size
CREATE OR ALTER PROCEDURE sp_SQBusinessUnit_Update
    @Id                 INT,
    @BusinessUnit       VARCHAR(20),
    @BusinessUnitName   VARCHAR(50),
    @AddressLine1       VARCHAR(40),
    @TelephoneNumber    VARCHAR(40),
    @IsActive           BIT,
    @Logo               VARCHAR(200),
    @District           VARCHAR(200)
AS
BEGIN
    UPDATE dbo.SQBusinessUnit
    SET BusinessUnit     = @BusinessUnit,
        BusinessUnitName = @BusinessUnitName,
        AddressLine1     = @AddressLine1,
        TelephoneNumber  = @TelephoneNumber,
        IsActive         = @IsActive,
        Logo             = @Logo,
        District         = @District
    WHERE Id = @Id;
END
GO

-- 3. Update Insert Stored Procedure with larger parameter size
CREATE OR ALTER PROCEDURE sp_SQBusinessUnit_Insert
    @BusinessUnit       VARCHAR(20),
    @BusinessUnitName   VARCHAR(50),
    @AddressLine1       VARCHAR(40),
    @TelephoneNumber    VARCHAR(40),
    @IsActive           BIT,
    @CreatedBy          VARCHAR(40),
    @Logo               VARCHAR(200),
    @District           VARCHAR(200)
AS
BEGIN
    INSERT INTO dbo.SQBusinessUnit
        (BusinessUnit, BusinessUnitName, AddressLine1, TelephoneNumber,
         IsActive, CreatedBy, CreatedOn, Logo, District)
    VALUES
        (@BusinessUnit, @BusinessUnitName, @AddressLine1, @TelephoneNumber,
         @IsActive, @CreatedBy, GETDATE(), @Logo, @District);

    SELECT CAST(SCOPE_IDENTITY() AS INT) AS NewId;
END
GO