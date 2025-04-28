package com.juliodev.myportfolio.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import com.juliodev.myportfolio.models.Project;
import com.juliodev.myportfolio.services.ProjectService;

@Controller
public class HomeController {

    private final ProjectService projectService;

    public HomeController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<Project> projects = projectService.getAllProjects();
        model.addAttribute("projects", projects);
        return "index";
    }
    
    
}
