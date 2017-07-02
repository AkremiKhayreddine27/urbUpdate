package com.urbupdate.repositories;

import com.urbupdate.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ClaimsRepository extends JpaRepository<Claim, Integer> {

}
