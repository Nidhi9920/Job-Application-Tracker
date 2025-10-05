//package com.jobtracker.service;
//
//import com.jobtracker.model.Job;
//import com.jobtracker.repository.JobRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class JobApplicationService {
//    private final JobRepository jobRepository;
//
//    public JobApplicationService(JobRepository jobRepository) {
//        this.jobRepository = jobRepository;
//    }
//
//    // Create
//    public Job saveJobApplication(Job jobApplication) {
//        return jobApplicationRepository.save(jobApplication);
//    }
//
//    // Read all
//    public List<Job> getAllApplications() {
//        return jobApplicationRepository.findAll();
//    }
//
//    // Read by ID
//    public Optional<Job> getApplicationById(Long id) {
//        return jobApplicationRepository.findById(id);
//    }
//    // Read by User
//    public List<Job> getApplicationsByUser(Long userId) {
//        return jobApplicationRepository.findByUserId(userId);
//    }
//
//    // Update
//    public Job updateApplication(Long id, Job updatedApp) {
//        return jobApplicationRepository.findById(id).map(app -> {
//            app.setCompanyName(updatedApp.getCompanyName());
//            app.setJobTitle(updatedApp.getJobTitle());
//            app.setJobLink(updatedApp.getJobLink());
//            app.setStatus(updatedApp.getStatus());
//            app.setAppliedDate(updatedApp.getAppliedDate());
//            app.setUser(updatedApp.getUser());
//            return jobApplicationRepository.save(app);
//        }).orElseThrow(() -> new RuntimeException("Job Application not found"));
//    }
//
//    // Delete
//    public void deleteApplication(Long id) {
//        jobApplicationRepository.deleteById(id);
//    }
//}
