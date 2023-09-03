using MongoDB.Bson.Serialization.Attributes;
using SafeSender.StorageAPI.Database;
using SafeSender.StorageAPI.Models.Enums;

namespace SafeSender.StorageAPI.Models;

public class FileInternalInfo
{
    public FileInternalInfo()
    {
        var idGenerator = new TokenIdGenerator();
        Token = idGenerator.GenerateId(null, null).ToString()!;
    }
    
    [BsonId(IdGenerator = typeof(TokenIdGenerator))]
    [BsonIgnoreIfDefault]
    public string Token { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public string FileName { get; set; } = default!;
    public string StorageFileIdentifier { get; set; } = default!;
    public StorageType StorageType { get; set; }
    public long OriginalFileSize { get; set; }
}