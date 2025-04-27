package com.juliodev.myportfolio.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.juliodev.myportfolio.models.Project;
import com.juliodev.myportfolio.services.ProjectService;
import org.springframework.http.HttpStatus;
import com.juliodev.myportfolio.dtos.ProjectDTO;
import java.util.List;
import java.util.stream.Collectors; 
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }


    @PostMapping("/create")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        Project project = Project.fromDTO(projectDTO);
        Project createdProject = projectService.createProject(project);
        return new ResponseEntity<>(ProjectDTO.fromProject(createdProject), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        List<ProjectDTO> projectDTOs = projects.stream()
            .map(ProjectDTO::fromProject)
            .collect(Collectors.toList());
        return new ResponseEntity<>(projectDTOs, HttpStatus.OK);
    }   
}
