package com.mar.ems_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mar.ems_back.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long>{

}
