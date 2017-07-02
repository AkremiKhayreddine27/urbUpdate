package com.urbupdate.model;

/**
 * Created by Khayreddine on 30/05/2017.
 */
public class FeatureStatus {

    private String status;

    private Claim claim;

    public Claim getClaim() {
        return claim;
    }

    public void setClaim(Claim claim) {
        this.claim = claim;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
