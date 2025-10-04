package com.jobtracker.service;

import com.jobtracker.model.JobApplication;
import com.jobtracker.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {
    private final JobApplicationRepository jobApplicationRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    // Create
    public JobApplication saveJobApplication(JobApplication jobApplication) {
        return jobApplicationRepository.save(jobApplication);
    }

    // Read all
    public List<JobApplication> getAllApplications() {
        return jobApplicationRepository.findAll();
    }

    // Read by ID
    public Optional<JobApplication> getApplicationById(Long id) {
        return jobApplicationRepository.findById(id);
    }
    // Read by User
    public List<JobApplication> getApplicationsByUser(Long userId) {
        return jobApplicationRepository.findByUserId(userId);
    }

    // Update
    public JobApplication updateApplication(Long id, JobApplication updatedApp) {
        return jobApplicationRepository.findById(id).map(app -> {
            app.setCompanyName(updatedApp.getCompanyName());
            app.setJobTitle(updatedApp.getJobTitle());
            app.setJobLink(updatedApp.getJobLink());
            app.setStatus(updatedApp.getStatus());
            app.setAppliedDate(updatedApp.getAppliedDate());
            app.setUser(updatedApp.getUser());
            return jobApplicationRepository.save(app);
        }).orElseThrow(() -> new RuntimeException("Job Application not found"));
    }

    // Delete
    public void deleteApplication(Long id) {
        jobApplicationRepository.deleteById(id);
    }
}
