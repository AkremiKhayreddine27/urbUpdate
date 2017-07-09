package com.urbupdate.controllers.api;

import com.urbupdate.model.*;
import com.urbupdate.repositories.AdjustmentsRepository;
import com.urbupdate.repositories.ClaimsRepository;
import com.urbupdate.repositories.FeaturesRepository;
import com.urbupdate.repositories.UserRepository;
import com.urbupdate.services.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClaimsApiController {

    @Autowired
    private ClaimsRepository claimsRepository;

    @Autowired
    private FeaturesRepository featuresRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdjustmentsRepository adjustmentsRepository;

    @Autowired
    private UserService userService;


    @RequestMapping("/claims")
    public List<Claim> listClaims() {
        return claimsRepository.findAllByOrderByUpdatedAtDesc();
    }

    @RequestMapping(value = "/claims/{claim}", method = RequestMethod.GET)
    public Claim show(@PathVariable Integer claim) {
        return claimsRepository.findOne(claim);
    }

    @RequestMapping(value = "/claims/{claim}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Integer claim) {
        claimsRepository.delete(claim);
    }

    @RequestMapping(value = "/claims/{claim}/edit", method = RequestMethod.GET)
    public Claim edit(@PathVariable Integer claim) {
        return claimsRepository.findOne(claim);
    }

    @RequestMapping(value = "/claims/{claim}/edit", method = RequestMethod.PATCH)
    public void update(@RequestBody Claim claim) {
        claimsRepository.save(claim);
    }

    @RequestMapping(value = "/claims", method = RequestMethod.POST)
    public void store(@RequestBody Claim claim) {
        claimsRepository.save(claim);
    }

    @RequestMapping(value = "/features/{feature}", method = RequestMethod.PATCH)
    public void updateFeature(@PathVariable Integer feature, @RequestBody FeatureStatus featureStatus) {
        Feature feature1 = featuresRepository.findOne(feature);
        feature1.setStatus(featureStatus.getStatus());
        Feature newFeature = feature1;
        adjust(featureStatus.getClaim(), feature1.getClaim());
        featuresRepository.save(feature1);
    }

    @RequestMapping(value = "/features/{id}", method = RequestMethod.GET)
    public Feature getFeature(@PathVariable Integer id) {
        Feature feature = featuresRepository.findOne(id);
        return feature;
    }

    public void adjust(Claim dirty, Claim claim) {
        Adjustment adjustment = new Adjustment();
        adjustment.setClaim(claim);
        String userName = getPrincipal();
        User user = userService.findByName(userName);
        adjustment.setUser(user);
        JSONObject jsonObjectBefore = new JSONObject();
        JSONObject jsonObjectAfter = new JSONObject();
        if (!dirty.getTitre().equals(claim.getTitre())) {
            jsonObjectBefore.put("titre", dirty.getTitre());
            jsonObjectAfter.put("titre", claim.getTitre());
        }
        if (!dirty.getDescription().equals(claim.getDescription())) {
            jsonObjectBefore.put("description", dirty.getDescription());
            jsonObjectAfter.put("description", claim.getDescription());
        }
        if (!dirty.getType().equals(claim.getType())) {
            jsonObjectBefore.put("type", dirty.getType());
            jsonObjectAfter.put("type", claim.getType());
        }
        if (dirty.isPlanification() != claim.isPlanification()) {
            jsonObjectBefore.put("planification", dirty.isPlanification());
            jsonObjectAfter.put("planification", claim.isPlanification());
        }
        if (dirty.getEtat_avancement() != claim.getEtat_avancement()) {
            jsonObjectBefore.put("etat_avancement", dirty.getEtat_avancement());
            jsonObjectAfter.put("etat_avancement", claim.getEtat_avancement());
        }
        if (!dirty.getEpannelage().equals(claim.getEpannelage())) {
            jsonObjectBefore.put("epannelage", dirty.getEpannelage());
            jsonObjectAfter.put("epannelage", claim.getEpannelage());
        }
        if (!dirty.getFeature().getStatus().equals(claim.getFeature().getStatus())) {
            jsonObjectBefore.put("status", dirty.getFeature().getStatus());
            jsonObjectAfter.put("status", claim.getFeature().getStatus());
        }
        adjustment.setOld_version(jsonObjectBefore.toString());
        adjustment.setNew_version(jsonObjectAfter.toString());
        adjustmentsRepository.save(adjustment);
    }

    public String getPrincipal() {
        String userName = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            userName = ((UserDetails) principal).getUsername();
        } else {
            userName = principal.toString();
        }
        return userName;
    }
}
