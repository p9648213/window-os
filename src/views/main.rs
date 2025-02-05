use maud::{html, Markup, PreEscaped};

const MIN_RECTANGLE_WIDTH: u16 = 64;

pub fn render_main_screen(authenticity_token: String) -> Markup {
    html! {
        (maud::DOCTYPE)
        head {
            meta charset="UTF-8";
            meta name="viewport" content="width=device-width,initial-scale=1";
            link rel="stylesheet" href="/assets/css/lib/tailwind.css";
            link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico";
            script src="/assets/js/lib/htmx.js" defer="defer" {}
            script src="/assets/js/main.js" type="module" defer="defer" {}
        }
        body class="bg-[#00807F] relative" {
            (PreEscaped(r#"
                <script type="module">
                    import {setupRightClickContextMenu} from "/assets/js/main.js";
                    setupRightClickContextMenu();
                </script>
            "#))
            main id="main-screen" class="flex flex-wrap h-[calc(100%-theme('spacing.12'))]" {}
            footer class="right-0 bottom-0 left-0 absolute border-[#404040] bg-[#1c1c1c] border-t h-12" {}
            form 
                hx-trigger="load"
                hx-post="/grid"
                hx-target="#main-screen"
            {
                input id="authenticity_token" type="hidden" name="authenticity_token" value=(authenticity_token);
                input id="main-height" name="height" type="hidden";
                input id="main-width" name="width" type="hidden";
            }
        }
    }
}

pub fn render_main_grid(height: u16, width: u16) -> Markup {
    let rows = height / MIN_RECTANGLE_WIDTH;
    let cols = width / MIN_RECTANGLE_WIDTH;
    let rectangle_width = width as f32 / cols as f32 - 0.01;

    html! {
        @for row in 0..rows {
            @for col in 0..cols {
                div 
                    class="flex justify-center items-center" 
                    style=(format!("width:{}px;", rectangle_width))
                    id=(format!("item-{}-{}", row, col))
                {}
            }
        }
    }
}

pub fn render_screen_item() -> Markup {
    html! {
        img class="w-9 h-9" src="/assets/images/text-editor.svg";
    }
}