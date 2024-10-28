use super::error::{AppError, DtoError};
use crate::utilities::db::{excute, query_optional};
use deadpool_postgres::Pool;
use tokio_postgres::Row;

#[derive(Debug, Clone)]
pub struct User {
    pub id: Option<i32>,
    pub username: Option<String>,
    pub password: Option<String>,
    pub email: Option<String>,
    pub role: Option<String>,
}

impl User {
    pub fn new(
        id: Option<i32>,
        username: Option<String>,
        password: Option<String>,
        email: Option<String>,
    ) -> Self {
        Self {
            id,
            username,
            password,
            email,
            role: None,
        }
    }

    pub async fn get_user_by_id(id: i32, pool: &Pool) -> Result<Option<Row>, AppError> {
        query_optional("SELECT * FROM users WHERE id = $1", &[&id], pool).await
    }

    pub async fn get_user_by_email(email: &str, pool: &Pool) -> Result<Option<Row>, AppError> {
        query_optional("SELECT * FROM users WHERE email = $1", &[&email], pool).await
    }

    pub async fn insert_user(user: User, pool: &Pool) -> Result<u64, AppError> {
        excute(
            "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
            &[&user.username, &user.password, &user.email],
            pool,
        )
        .await
    }

    pub fn from_row<T: FromUser>(row: Row) -> Result<T, DtoError> {
        let user = User::try_from(row);
        T::from_user(user)
    }

    fn try_from(row: Row) -> Self {
        let id: Option<i32> = row.try_get("id").unwrap_or(None);
        let username: Option<String> = row.try_get("username").unwrap_or(None);
        let password: Option<String> = row.try_get("password").unwrap_or(None);
        let email: Option<String> = row.try_get("email").unwrap_or(None);
        let role: Option<String> = row.try_get("role").unwrap_or(None);

        User {
            id,
            username,
            password,
            email,
            role,
        }
    }
}

pub trait FromUser: Sized {
    fn from_user(user: User) -> Result<Self, DtoError>;
}

pub struct UserDTO {
    pub id: i32,
    pub username: String,
    pub password: String,
    pub email: String,
    pub role: String,
}

impl FromUser for UserDTO {
    fn from_user(user: User) -> Result<Self, DtoError> {
        Ok(UserDTO {
            id: user
                .id
                .ok_or(DtoError::new("UserDTO convert error: Id not found"))?,
            password: user
                .password
                .ok_or(DtoError::new("UserDTO convert error: Password not found"))?,
            username: user
                .username
                .ok_or(DtoError::new("UserDTO convert error: Username not found"))?,
            email: user
                .email
                .ok_or(DtoError::new("UserDTO convert error: Email not found"))?,
            role: user
                .role
                .ok_or(DtoError::new("UserDTO convert error: Role not found"))?,
        })
    }
}
