package com.juliodev.myportfolio.services;

import org.springframework.stereotype.Service;
import com.juliodev.myportfolio.repositories.ProjectRepository;
import com.juliodev.myportfolio.models.Project;
import java.util.List;
import java.util.Optional;

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
        Optional<Project> existingProject = projectRepository.findById(id);
        if (existingProject.isPresent()) {
            Project projectToUpdate = existingProject.get();
            projectToUpdate.setName(project.getName());
            projectToUpdate.setDescription(project.getDescription());
            projectToUpdate.setImageBase64(project.getImageBase64());
            projectToUpdate.setTechnologies(project.getTechnologies());
            projectToUpdate.setStack(project.getStack());
            projectToUpdate.setLink(project.getLink());
            return projectRepository.save(projectToUpdate);
        }
        return null;
    }   

    public boolean deleteProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void deleteAllProjects() {
        projectRepository.deleteAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }
}
