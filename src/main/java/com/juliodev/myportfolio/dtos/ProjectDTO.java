package com.juliodev.myportfolio.dtos;
import com.juliodev.myportfolio.models.Project;

public record ProjectDTO(
    String name,
    String description,
    String imageBase64,
    String technologies,
    String link
) {
    
    public static ProjectDTO fromProject(Project project) {
        return new ProjectDTO(project.getName(), project.getDescription(), project.getImageBase64(), project.getTechnologies(), project.getLink());
    }
}
