package com.urbupdate.repositories;

import com.urbupdate.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeaturesRepository extends JpaRepository<Feature, Integer> {
}
