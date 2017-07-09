package com.urbupdate.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "claims")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "titre", nullable = false)
    private String titre;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "planification", nullable = false)
    private boolean planification;

    @Column(name = "etat_avancement", nullable = false)
    private Integer etat_avancement;

    @Column(name = "epannelage", nullable = false)
    private String epannelage;

    @Temporal(TemporalType.TIMESTAMP)
    @Type(type = "date")
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private Date createdAt;


    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;


    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "claim")
    private Collection<Photo> photos;

    @OneToOne(mappedBy = "claim")
    private Feature feature;


    @OneToMany(mappedBy = "claim")
    @OrderBy("updatedAt DESC")
    private Collection<Adjustment> adjustments;

    public Collection<Adjustment> getAdjustments() {
        return adjustments;
    }

    public void setAdjustments(Collection<Adjustment> adjustments) {
        this.adjustments = adjustments;
    }

    public Feature getFeature() {
        return feature;
    }

    public void setFeature(Feature feature) {
        this.feature = feature;
    }

    public Collection<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(Collection<Photo> photos) {
        this.photos = photos;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getUpdated_at() {
        return updatedAt;
    }

    public void setUpdated_at(Date updated_at) {
        this.updatedAt = updated_at;
    }

    public Date getCreated_at() {
        return createdAt;
    }

    public void setCreated_at(Date created_at) {
        this.createdAt = created_at;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isPlanification() {
        return planification;
    }

    public void setPlanification(boolean planification) {
        this.planification = planification;
    }

    public Integer getEtat_avancement() {
        return etat_avancement;
    }

    public void setEtat_avancement(Integer etat_avancement) {
        this.etat_avancement = etat_avancement;
    }

    public String getEpannelage() {
        return epannelage;
    }

    public void setEpannelage(String epannelage) {
        this.epannelage = epannelage;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof User)) {
            return false;
        }
        Claim other = (Claim) obj;
        if (id == null) {
            if (other.id != null) {
                return false;
            }
        } else if (!id.equals(other.id)) {
            return false;
        }
        return true;
    }

//    @PreUpdate
//    public void setLastUpdate() {
//        this.updated_at = new java.sql.Timestamp(new Date().getTime());
//    }
}
