package com.juliodev.myportfolio.dtos;
import com.juliodev.myportfolio.models.Project;
import java.util.List;

public record ProjectDTO(
    Long id,
    String name,
    String description,
    String imageBase64,
    List<String> technologies,
    String stack,
    String link
) {
    
    public static ProjectDTO fromProject(Project project) {
        return new ProjectDTO(
            project.getId(),
            project.getName(), 
            project.getDescription(), 
            project.getImageBase64(), 
            project.getTechnologies(),
            project.getStack(),
            project.getLink()
        );
    }
}
