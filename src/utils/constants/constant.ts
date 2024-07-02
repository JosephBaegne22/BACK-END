
export class Constants {
    public static USER_SESSION_EXPIRE_IN = 1 * 60 * 60; // 1 hour
    public static OTHER_TOKEN_EXPIRE_IN = 5 * 60; // 5 minutes
    public static TOKEN_SECRET = {
        KEY: 'jwt_secret'
     };
     public static SALT_VALUE = 10;
     public static JWT_TOKEN_EXPIRE_IN = 7 * 24 * 60 * 60; // 7 days
}