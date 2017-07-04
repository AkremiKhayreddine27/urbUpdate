package com.urbupdate.repositories;

import com.urbupdate.model.Adjustment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by Khayreddine on 29/06/2017.
 */
public interface AdjustmentsRepository extends JpaRepository<Adjustment, Integer> {
    public List<Adjustment> findAllByOrderByCreatedAt();
}
