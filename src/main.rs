use clap::Parser;
use window_os::{
    config::{self},
    postgres,
    router::create_router,
};

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    dotenvy::dotenv().ok();

    let config = config::EnvConfig::parse();

    let redis_client = redis::Client::open(config.redis_url.clone())
        .expect("Error while tryiong to open the redis connection");

    let redis_pool = redis_pool::RedisPool::from(redis_client);

    tracing::info!("Redis pool created");

    let pg_pool = postgres::create_pool(&config);

    tracing::info!("Postgres pool created");

    postgres::migrate_up(&pg_pool).await;

    tracing::info!("Migrations completed");

    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{}", &config.port))
        .await
        .unwrap();

    let app = create_router(pg_pool, redis_pool, config);

    tracing::info!("Listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app.await).await.unwrap();
}
