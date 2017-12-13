package com.urbupdate.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFeature is a Querydsl query type for Feature
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFeature extends EntityPathBase<Feature> {

    private static final long serialVersionUID = 1776410660L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFeature feature = new QFeature("feature");

    public final QClaim claim;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lon = createNumber("lon", Double.class);

    public final StringPath status = createString("status");

    public QFeature(String variable) {
        this(Feature.class, forVariable(variable), INITS);
    }

    public QFeature(Path<? extends Feature> path) {
        this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QFeature(PathMetadata metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QFeature(PathMetadata metadata, PathInits inits) {
        this(Feature.class, metadata, inits);
    }

    public QFeature(Class<? extends Feature> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.claim = inits.isInitialized("claim") ? new QClaim(forProperty("claim"), inits.get("claim")) : null;
    }

}

