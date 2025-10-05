package com.jobtracker.controller;

import com.jobtracker.dto.JobDTO;
import com.jobtracker.dto.JobRequestDTO;
import com.jobtracker.model.Job;
import com.jobtracker.model.User;
import com.jobtracker.repository.JobRepository;
import com.jobtracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    // Helper to get current logged-in user email
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof org.springframework.security.core.userdetails.User) {
            return ((org.springframework.security.core.userdetails.User) principal).getUsername();
        }
        return principal.toString();
    }

    // Convert Job to JobDTO
    private JobDTO toDTO(Job job) {
        return new JobDTO(
                job.getId(),
                job.getTitle(),
                job.getCompany(),
                job.getStatus(),
                job.getDescription(),
                job.getNotes(),
                job.getAppliedDate()
        );
    }

    // Get all jobs for user
    @GetMapping("/all")
    public List<JobDTO> getAllJobs() {
        String email = getCurrentUserEmail();
        return jobRepository.findByUserEmail(email)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(job -> ResponseEntity.ok(toDTO(job)))
                .orElse(ResponseEntity.notFound().build());
    }

    //  Add new job
    @PostMapping("/add")
    public JobDTO addJob(@RequestBody JobRequestDTO jobRequestDTO) {
        String email = getCurrentUserEmail();
        User user = userRepository.findByEmail(email);

        Job job = new Job();
        job.setTitle(jobRequestDTO.getTitle());
        job.setCompany(jobRequestDTO.getCompany());
        job.setStatus(jobRequestDTO.getStatus());
        job.setDescription(jobRequestDTO.getDescription());
        job.setNotes(jobRequestDTO.getNotes());
        job.setAppliedDate(jobRequestDTO.getAppliedDate());
        job.setUser(user); // set the user entity
        return toDTO(jobRepository.save(job));
    }

    // Update job
    @PutMapping("/{id}")
    public ResponseEntity<JobDTO> updateJob(@PathVariable Long id,
                                            @RequestBody JobRequestDTO jobRequestDTO) {
        return jobRepository.findById(id)
                .map(job -> {
                    job.setTitle(jobRequestDTO.getTitle());
                    job.setCompany(jobRequestDTO.getCompany());
                    job.setStatus(jobRequestDTO.getStatus());
                    job.setDescription(jobRequestDTO.getDescription());
                    job.setNotes(jobRequestDTO.getNotes());
                    job.setAppliedDate(jobRequestDTO.getAppliedDate());
                    return ResponseEntity.ok(toDTO(jobRepository.save(job)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    //  Delete job
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(job -> {
                    jobRepository.delete(job);
                    return ResponseEntity.ok("Job deleted successfully");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
