let currentSection = "";

function text(){
    let newSection;

    if (player.x < bgWidth/5){
        newSection = "Home";
    } else if (player.x < bgWidth/5 * 2){
        newSection = "Projects";
    } else if (player.x < bgWidth/5 * 3){
        newSection = "Blog";
    } else if (player.x < bgWidth/5 * 4){
        newSection = "About";
    } else {
        newSection = "Contact";
    }

    if (newSection !== currentSection) {
        currentSection = newSection;
        section_text.innerText = newSection;

        switch(newSection) {
            case "Home":
                animateText(text_box, "Hi, my name is Marius and I'm a creator with lots of ideas...");
                section_views();
                break;
            case "Projects":
                animateText(text_box, "Check out some of my projects!");
                section_views();
                all_project_view.style.display = "flex";
                all_project_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                coding_project_view.style.display = "flex";
                coding_project_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                music_project_view.style.display = "flex";
                music_project_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                design_project_view.style.display = "flex";
                design_project_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                threeD_project_view.style.display = "flex";
                threeD_project_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                break;
            case "Blog":
                animateText(text_box, "Check out my writting!");
                section_views();

                blog_view.style.display = "flex";
                blog_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                    break;
            case "About":
                animateText(text_box, "Here's some info about me");
                section_views();
                professional_about_view.style.display = "flex";
                professional_about_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                coding_about_view.style.display = "flex";
                coding_about_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                music_about_view.style.display = "flex";
                music_about_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                teaching_about_view.style.display = "flex";
                teaching_about_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                hobbies_about_view.style.display = "flex";
                hobbies_about_view.style.animation = "appear 1s, pulse-glow 2s ease-in-out infinite 1s";
                break;
            case "Contact":
                animateText(text_box, 'Talk to me at <a href="mailto:marius@mariusschueller.com">marius@mariusschueller.com</a>');
                section_views();
                break;
        }
    }
}

function section_views(){
    all_views.forEach(view => {
        if (view.style.display === "flex") {
            view.style.animation = "disappear 1s forwards";
        }
    });
}
