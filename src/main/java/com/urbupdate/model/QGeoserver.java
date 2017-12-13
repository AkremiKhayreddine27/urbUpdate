package com.urbupdate.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QGeoserver is a Querydsl query type for Geoserver
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QGeoserver extends EntityPathBase<Geoserver> {

    private static final long serialVersionUID = -282062974L;

    public static final QGeoserver geoserver = new QGeoserver("geoserver");

    public final StringPath feature_ns = createString("feature_ns");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath layers_primary_key = createString("layers_primary_key");

    public final StringPath src_name = createString("src_name");

    public final StringPath url = createString("url");

    public final StringPath workspace = createString("workspace");

    public QGeoserver(String variable) {
        super(Geoserver.class, forVariable(variable));
    }

    public QGeoserver(Path<? extends Geoserver> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGeoserver(PathMetadata metadata) {
        super(Geoserver.class, metadata);
    }

}

