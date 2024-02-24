using MongoDB.Bson.Serialization.IdGenerators;

namespace Registration_Service.Exceptions
{
    public class UserDoesnotExistsException:Exception
    {
        public UserDoesnotExistsException() { }
        public UserDoesnotExistsException(string message) : base(message) { }

    }
}
