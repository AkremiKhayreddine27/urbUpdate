package com.urbupdate.configurations;

import com.urbupdate.model.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RestConfig extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Claim.class);
        config.exposeIdsFor(Adjustment.class);
        config.exposeIdsFor(Feature.class);
        config.exposeIdsFor(Geoserver.class);
        config.exposeIdsFor(Layer.class);
        config.exposeIdsFor(Photo.class);
        config.exposeIdsFor(Notification.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Role.class);
    }
}
