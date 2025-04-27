package com.juliodev.myportfolio.models;

import com.juliodev.myportfolio.dtos.ProjectDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String imageBase64;
    private String technologies;
    private String link;

    public static Project fromDTO(ProjectDTO dto) {
        Project project = new Project();
        project.setName(dto.name());
        project.setDescription(dto.description());
        project.setImageBase64(dto.imageBase64());
        project.setTechnologies(dto.technologies());
        project.setLink(dto.link());
        return project;
    }
}
