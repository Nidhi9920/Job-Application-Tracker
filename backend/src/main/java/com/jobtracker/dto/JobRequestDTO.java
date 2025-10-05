package com.jobtracker.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class JobRequestDTO {
    private String title;
    private String company;
    private String status;
    private String description;
    private String notes;
    private LocalDate appliedDate;
}
