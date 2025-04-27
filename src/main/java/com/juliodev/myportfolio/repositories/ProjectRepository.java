package com.juliodev.myportfolio.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.juliodev.myportfolio.models.Project;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAll();
    void delete(Project project);
}
