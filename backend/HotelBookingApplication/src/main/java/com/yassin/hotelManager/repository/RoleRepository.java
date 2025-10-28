package com.yassin.hotelManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yassin.hotelManager.model.Role;

import java.util.Optional;


import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String role);

    boolean existsByName(String role);
}
