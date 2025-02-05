use axum::response::{Html, IntoResponse};
use axum::Form;
use axum_csrf::CsrfToken;
use serde::Deserialize;

use crate::views::main::{render_main_grid, render_main_screen, render_screen_item};

#[derive(Deserialize)]
pub struct MainForm {
    pub height: u16,
    pub width: u16,
}

pub async fn main_screen(csrf_token: CsrfToken) -> impl IntoResponse {
    let authenticity_token = csrf_token.authenticity_token().unwrap();

    (
        csrf_token,
        Html(render_main_screen(authenticity_token).into_string()).into_response(),
    )
}

pub async fn main_grid(Form(form): Form<MainForm>) -> Html<String> {
    Html(render_main_grid(form.height, form.width).into_string())
}

pub async fn create_txt(csrf_token: CsrfToken) -> impl IntoResponse {
    (
        csrf_token,
        render_screen_item().into_string()
    )
    
}