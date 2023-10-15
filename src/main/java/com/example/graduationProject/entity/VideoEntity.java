package com.example.graduationProject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@Entity(name="Video")
@Table(name="Video")
@AllArgsConstructor
@NoArgsConstructor
public class VideoEntity {

    @Id
    private Long id;

    private String SLname;
    private String imageURL;
    private String videoURL;
}
