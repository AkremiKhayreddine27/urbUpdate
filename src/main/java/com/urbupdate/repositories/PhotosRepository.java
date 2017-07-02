package com.urbupdate.repositories;

import com.urbupdate.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PhotosRepository extends JpaRepository<Photo, Integer> {
}
