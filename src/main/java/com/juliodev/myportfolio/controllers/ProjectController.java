package com.juliodev.myportfolio.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.juliodev.myportfolio.models.Project;
import com.juliodev.myportfolio.services.ProjectService;
import org.springframework.http.HttpStatus;
import com.juliodev.myportfolio.dtos.ProjectDTO;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
        Project project = projectService.getProjectById(id);
        if (project != null) {
            return new ResponseEntity<>(ProjectDTO.fromProject(project), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id, @RequestBody ProjectDTO projectDTO) {
        Project project = Project.fromDTO(projectDTO);
        Project updatedProject = projectService.updateProject(id, project);
        if (updatedProject != null) {
            return new ResponseEntity<>(ProjectDTO.fromProject(updatedProject), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        boolean deleted = projectService.deleteProject(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearDatabase() {
        projectService.deleteAllProjects();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
