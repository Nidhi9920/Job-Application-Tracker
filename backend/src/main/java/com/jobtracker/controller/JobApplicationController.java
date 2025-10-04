package com.jobtracker.controller;

import com.jobtracker.model.JobApplication;
import com.jobtracker.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository jobRepository;

    @GetMapping("/all")
    public List<JobApplication> getAllJobs() {
        return jobRepository.findAll();
    }

    @PostMapping("/add")
    public JobApplication addJob(@RequestBody JobApplication job) {
        return jobRepository.save(job);
    }
}
