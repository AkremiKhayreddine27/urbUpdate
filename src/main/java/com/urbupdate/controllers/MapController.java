package com.urbupdate.controllers;

import com.urbupdate.model.Feature;
import com.urbupdate.model.Geoserver;
import com.urbupdate.model.Layer;
import com.urbupdate.repositories.FeaturesRepository;
import com.urbupdate.repositories.GeoserverRepository;
import com.urbupdate.repositories.LayersRepository;
import it.geosolutions.geoserver.rest.GeoServerRESTPublisher;
import it.geosolutions.geoserver.rest.GeoServerRESTReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.FileNotFoundException;
import java.net.MalformedURLException;
import java.util.List;

@Controller
public class MapController {

    @Autowired
    private LayersRepository layersRepository;

    @Autowired
    private GeoserverRepository geoserverRepository;

    @Autowired
    private FeaturesRepository featuresRepository;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping("/map")
    public String index() {
        return "map";
    }

    @RequestMapping("/time")
    public String time() {
        return "time";
    }

    @RequestMapping("/getAllCouches")
    @ResponseBody
    public List<Layer> getAllLayers() {
        return layersRepository.findAll();
    }

    @RequestMapping(value = "/admin/geoserver", method = RequestMethod.GET)
    @ResponseBody
    public Geoserver getConfig() {
        return geoserverRepository.findOne(1);
    }

    @RequestMapping(value = "/admin/geoserver", method = RequestMethod.POST)
    @ResponseBody
    public Geoserver configure(@RequestBody Geoserver geoserver) {
        return geoserverRepository.save(geoserver);
    }


    @RequestMapping(value = "/admin/config", method = RequestMethod.GET)
    public String config() throws MalformedURLException, FileNotFoundException {
        Geoserver geoserver = geoserverRepository.findOne(1);
        GeoServerRESTReader reader = new GeoServerRESTReader(geoserver.getUrl(), "admin", "geoserver");
        GeoServerRESTPublisher publisher = new GeoServerRESTPublisher(geoserver.getUrl(), "admin", "geoserver");
        boolean existsWorkspace = reader.existsWorkspace(geoserver.getWorkspace());
        if (existsWorkspace) {
            File shapeFile = new File("D:\\Workspace\\sabrine\\fouchana.zip");
            boolean published = publisher.publishShp(geoserver.getWorkspace(), "Fouchana", "Fouchana", shapeFile, geoserver.getSrc_name(), "default_point");
            return "index";
        } else {
            boolean created = publisher.createWorkspace(geoserver.getWorkspace());
            if (created) {
                File shapeFile = new File("D:\\Workspace\\sabrine\\fouchana.zip");
                boolean published = publisher.publishShp(geoserver.getWorkspace(), "Fouchana", "Fouchana", shapeFile, geoserver.getSrc_name(), "default_point");
            }
            return "login";
        }
    }

    @RequestMapping("/features")
    @ResponseBody
    public List<Feature> getFeatures() {
        return featuresRepository.findAll();
    }
}
