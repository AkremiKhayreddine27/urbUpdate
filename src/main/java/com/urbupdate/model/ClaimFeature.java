package com.urbupdate.model;


public class ClaimFeature {
    private String titre;
    private String description;
    private String type;
    private boolean planification;
    private Integer etat_avancement;
    private String epannelage;

    private Integer feature;
    private double lon;
    private double lat;


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

    public Integer getFeature() {
        return feature;
    }

    public void setFeature(Integer feature) {
        this.feature = feature;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }
}
