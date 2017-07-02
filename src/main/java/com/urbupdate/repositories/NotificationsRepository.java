package com.urbupdate.repositories;

import com.urbupdate.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Khayreddine on 10/05/2017.
 */
public interface NotificationsRepository extends JpaRepository<Notification, Integer> {
}
