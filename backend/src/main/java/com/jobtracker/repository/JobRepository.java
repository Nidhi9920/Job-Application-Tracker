package com.jobtracker.repository;

import com.jobtracker.model.Job;
import com.jobtracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
//    List<Job> findByUserId(Long userId);
//
//    List<Job> findByUser(User user);

    List<Job> findByUserEmail(String email);
}
