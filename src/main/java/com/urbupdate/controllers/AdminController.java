package com.urbupdate.controllers;

import com.urbupdate.model.Geoserver;
import com.urbupdate.model.Layer;
import com.urbupdate.model.Photo;
import com.urbupdate.repositories.GeoserverRepository;
import com.urbupdate.repositories.LayersRepository;
import com.urbupdate.repositories.UserRepository;
import com.urbupdate.storage.StorageFileNotFoundException;
import com.urbupdate.storage.StorageService;
import it.geosolutions.geoserver.rest.GeoServerRESTPublisher;
import it.geosolutions.geoserver.rest.GeoServerRESTReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

@Controller
@PreAuthorize("hasAnyAuthority('Administrateur')")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private GeoserverRepository geoserverRepository;

    @Autowired
    private LayersRepository layersRepository;

    @Autowired
    private UserRepository userRepository;

    private final StorageService storageService;

    @Autowired
    public AdminController(StorageService storageService) {
        this.storageService = storageService;
    }

    @RequestMapping("/dashboard")
    public String dashboard(ModelMap modal) {
        modal.addAttribute("users", userRepository.findAll());
        return "admin/dashboard";
    }

    @RequestMapping(value = "/shapeFiles/upload", method = RequestMethod.POST)
    @ResponseBody
    public void upload(MultipartHttpServletRequest request) throws IOException {
        Map<String, MultipartFile> fileMap = request.getFileMap();
        for (MultipartFile multipartFile : fileMap.values()) {
            storageService.store(multipartFile);
            String fileName = multipartFile.getOriginalFilename().split("\\.")[0];
            String filePath = System.getProperty("user.dir") + "\\upload-dir\\" + multipartFile.getOriginalFilename();
            File shapeFile = new File(filePath);
            boolean published = isPublished(fileName, shapeFile);
            if (published) {
                Layer layer = new Layer();
                layer.setName(fileName);
                layer.setColor("rgba(170, 170, 170,0.8)");
                layer.setStroke("rgb(0, 0, 0)");
                layer.setActive(false);
                layersRepository.save(layer);
            }
        }
    }

    private boolean isPublished(String fileName, File shapeFile) throws FileNotFoundException, MalformedURLException {
        boolean published = false;
        Geoserver geoserver = geoserverRepository.findOne(1);
        GeoServerRESTReader reader = new GeoServerRESTReader(geoserver.getUrl(), "admin", "geoserver");
        GeoServerRESTPublisher publisher = new GeoServerRESTPublisher(geoserver.getUrl(), "admin", "geoserver");
        boolean existsWorkspace = reader.existsWorkspace(geoserver.getWorkspace());

        if (reader.existsFeatureType(geoserver.getWorkspace(), fileName, fileName)) {
            System.out.println("existsFeatureType exists");
            boolean ftRemoved = publisher.unpublishFeatureType(geoserver.getWorkspace(), fileName, fileName);
        }
        if (reader.existsDatastore(geoserver.getWorkspace(), fileName)) {
            System.out.println("existsDatastore exists");
            boolean dsRemoved = publisher.removeDatastore(geoserver.getWorkspace(), fileName, true);
        }


        if (existsWorkspace) {
            published = publisher.publishShp(geoserver.getWorkspace(), fileName, fileName, shapeFile, geoserver.getSrc_name(), "default_point");
        } else {

            boolean created = publisher.createWorkspace(geoserver.getWorkspace());
            geoserver.setFeature_ns("http://" + geoserver.getWorkspace());
            geoserverRepository.save(geoserver);
            if (created) {
                published = publisher.publishShp(geoserver.getWorkspace(), fileName, fileName, shapeFile, geoserver.getSrc_name(), "default_point");
            }
        }
        return published;
    }
}
