package com.juliodev.myportfolio.services;

import org.springframework.stereotype.Service;
import com.juliodev.myportfolio.repositories.ProjectRepository;
import com.juliodev.myportfolio.models.Project;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() { 
        return projectRepository.findAll();
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project project) {
        return projectRepository.save(project);
    }   

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
