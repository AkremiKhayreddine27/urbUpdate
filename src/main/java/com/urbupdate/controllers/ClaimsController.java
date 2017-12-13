package com.urbupdate.controllers;

import com.urbupdate.model.*;
import com.urbupdate.repositories.AdjustmentsRepository;
import com.urbupdate.repositories.ClaimsRepository;
import com.urbupdate.repositories.FeaturesRepository;
import com.urbupdate.repositories.PhotosRepository;
import com.urbupdate.services.UserService;
import com.urbupdate.storage.StorageService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@PreAuthorize("isAuthenticated()")
public class ClaimsController {

    @Autowired
    private ClaimsRepository claimsRepository;

    @Autowired
    private FeaturesRepository featuresRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PhotosRepository photosRepository;


    @Autowired
    private AdjustmentsRepository adjustmentsRepository;

    private final StorageService storageService;

    @Autowired
    public ClaimsController(StorageService storageService) {
        this.storageService = storageService;
    }

    @RequestMapping("/claims")
    public String index() {
        return "claims/index";
    }

    @RequestMapping("/claims/{claim}")
    public String show(@PathVariable Integer claim) {
        Claim claim1 = claimsRepository.findOne(claim);
        if (claim1 != null) {
            return "claims/show";
        } else {
            return "redirect:/404";
        }
    }

    @RequestMapping("/claims/{claim}/edit")
    public String edit(@PathVariable Integer claim) {
        Claim claim1 = claimsRepository.findOne(claim);
        if (claim1 != null) {
            return "claims/edit";
        } else {
            return "redirect:/404";
        }
    }

    @RequestMapping(value = "/claims/{id}", method = RequestMethod.PATCH)
    @ResponseBody
    public Claim update(@RequestBody Claim claim, @PathVariable Integer id) {
        Claim dirty = claimsRepository.findOne(id);
        adjust(dirty, claim);
        claimsRepository.save(claim);
        return claim;
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
        if (dirty.getEtatAvancement() != claim.getEtatAvancement()) {
            jsonObjectBefore.put("etat_avancement", dirty.getEtatAvancement());
            jsonObjectAfter.put("etat_avancement", claim.getEtatAvancement());
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

    @RequestMapping(value = "/claims", method = RequestMethod.POST)
    @ResponseBody
    public Claim store(@RequestBody ClaimFeature claimFeature) {
        Claim claim = new Claim();
        Feature feature = new Feature();

        String userName = getPrincipal();
        User user = userService.findByName(userName);

        claim.setTitre(claimFeature.getTitre());
        claim.setDescription(claimFeature.getDescription());
        claim.setType(claimFeature.getType());
        claim.setPlanification(claimFeature.isPlanification());
        claim.setEpannelage(claimFeature.getEpannelage());
        claim.setEtatAvancement(claimFeature.getEtatAvancement());
        claim.setUser(user);
        claim = claimsRepository.save(claim);

        feature.setId(claimFeature.getFeature());
        feature.setLon(claimFeature.getLon());
        feature.setLat(claimFeature.getLat());
        feature.setClaim(claim);
        feature.setStatus("En instance");
        featuresRepository.save(feature);

        return claim;
    }

    @RequestMapping(value = "/claims/{claim}/upload", method = RequestMethod.POST)
    @ResponseBody
    public void upload(MultipartHttpServletRequest request, @PathVariable Integer claim) throws IOException {
        Map<String, MultipartFile> fileMap = request.getFileMap();
        for (MultipartFile multipartFile : fileMap.values()) {
            storageService.store(multipartFile);
            Photo photo = new Photo();
            photo.setName(multipartFile.getOriginalFilename());
            photo.setUrl("/upload/" + multipartFile.getOriginalFilename());
            photo.setExtension("jpg");
            photo.setPath("/upload/" + multipartFile.getOriginalFilename());
            photo.setThumbnail_path("/upload/" + multipartFile.getOriginalFilename());
            photo.setThumbnail_path_url("/upload/" + multipartFile.getOriginalFilename());
            photo.setClaim(claimsRepository.findOne(claim));
            photosRepository.save(photo);
        }
    }


    @RequestMapping(value = "/claims/{claim}/photos/{photo}", method = RequestMethod.DELETE)
    @ResponseBody
    public void delete(@PathVariable Integer photo) {
        photosRepository.delete(photo);
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
