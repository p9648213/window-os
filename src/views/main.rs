const MIN_RECTANGLE_WIDTH: u16 = 64;

pub fn render_main_screen(authenticity_token: String) -> String {
    vy::render! {
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <link rel="stylesheet" href="/assets/css/lib/tailwind.css"/>
            <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico"/>
            <script src="/assets/js/lib/htmx.js" defer="defer"></script>
            <script src="/assets/js/main.js" defer="defer"></script>
        </head>
        <html class="h-full min-h-full" lang="en">
            <body class="relative h-full bg-[#131517]">
                <main id="main-screen" class="flex flex-wrap h-[calc(100%-theme('spacing.12'))]"></main>
                <footer class="right-0 bottom-0 left-0 absolute border-[#404040] bg-[#1c1c1c] border-t h-12"></footer>
                <form
                    hx-trigger="load"
                    hx-post="/grid"
                    hx-target="#main-screen"
                >
                    <input type="hidden" name="authenticity_token" value={authenticity_token}/>
                    <input id="main-height" name="height" type="hidden"/>
                    <input id="main-width" name="width" type="hidden"/>
                </form>
            </body>
        </html>
    }
}

pub fn render_main_grid(height: u16, width: u16) -> String {
    let rows = height / MIN_RECTANGLE_WIDTH;
    let cols = width / MIN_RECTANGLE_WIDTH;
    let rectangle_width = width as f32 / cols as f32 - 0.01;

    vy::render! {
        {(0..rows).map(|_| vy::lazy! {
            {(0..cols).map(|_| vy::lazy! {
                <div class="border-slate-500 border" style={format!("width:{}px;", rectangle_width)}></div>
            })}
        })}
    }
}
